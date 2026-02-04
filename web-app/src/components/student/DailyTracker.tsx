import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent, Button } from '../shared';
import { DailyTrackerService } from '../../services/dailyTracker.service';
import { useAuth } from '../../contexts/AuthContext';
import { logger } from '../../lib/logger';

export const DailyTracker: React.FC = () => {
  const { user } = useAuth();
  const [quranTime, setQuranTime] = useState<number>(0);
  const [prayers, setPrayers] = useState({
    fajr: false,
    dhuhr: false,
    asr: false,
    maghrib: false,
    isha: false
  });
  const [loading, setLoading] = useState(false);
  const [saved, setSaved] = useState(false);
  const [stats, setStats] = useState({
    streak: 0,
    totalMinutes: 0,
    averageMinutes: 0,
    prayersCompleted: 0,
    totalPrayers: 0
  });

  // Load today's tracker and stats on mount
  useEffect(() => {
    loadTodayTracker();
    loadStats();
  }, [user]);

  const loadTodayTracker = async () => {
    if (!user) return;

    try {
      const today = new Date();
      const tracker = await DailyTrackerService.getDailyTracker(user.uid, today);

      if (tracker) {
        setQuranTime(tracker.quranTime);
        setPrayers(tracker.prayers);
      }
    } catch (error) {
      logger.error('Failed to load today tracker', error as Error);
    }
  };

  const loadStats = async () => {
    if (!user) return;

    try {
      const trackerStats = await DailyTrackerService.getTrackerStats(user.uid, 30);
      setStats(trackerStats);
    } catch (error) {
      logger.error('Failed to load tracker stats', error as Error);
    }
  };

  const handleSave = async () => {
    if (!user) return;

    setLoading(true);
    setSaved(false);

    try {
      const today = new Date();
      await DailyTrackerService.saveDailyTracker(user.uid, today, quranTime, prayers);
      setSaved(true);

      // Reload stats
      await loadStats();

      setTimeout(() => setSaved(false), 3000);
    } catch (error) {
      logger.error('Failed to save tracker', error as Error);
      alert('Failed to save. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const togglePrayer = (prayer: keyof typeof prayers) => {
    setPrayers(prev => ({
      ...prev,
      [prayer]: !prev[prayer]
    }));
  };

  const formatTime = (minutes: number): string => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    if (hours === 0) return `${mins}m`;
    return `${hours}h ${mins}m`;
  };

  return (
    <div className="space-y-6">
      {/* Stats Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground">Current Streak</p>
            <p className="text-2xl font-bold text-primary">{stats.streak} days</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground">This Month</p>
            <p className="text-2xl font-bold">{formatTime(stats.totalMinutes)}</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground">Daily Average</p>
            <p className="text-2xl font-bold">{formatTime(stats.averageMinutes)}</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground">Prayer Rate</p>
            <p className="text-2xl font-bold">
              {stats.totalPrayers > 0
                ? Math.round((stats.prayersCompleted / stats.totalPrayers) * 100)
                : 0}%
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Today's Tracker */}
      <Card>
        <CardHeader>
          <CardTitle>Today's Progress</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Time Input */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Quran Time Today
            </label>
            <div className="flex items-center gap-4">
              <input
                type="range"
                min="0"
                max="240"
                step="5"
                value={quranTime}
                onChange={(e) => setQuranTime(Number(e.target.value))}
                className="flex-1 h-2 bg-muted rounded-lg appearance-none cursor-pointer"
              />
              <div className="w-20 text-right">
                <span className="text-2xl font-bold text-primary">
                  {formatTime(quranTime)}
                </span>
              </div>
            </div>
            <div className="flex justify-between text-xs text-muted-foreground mt-1">
              <span>0m</span>
              <span>2h</span>
              <span>4h</span>
            </div>
          </div>

          {/* Prayer Checkboxes */}
          <div>
            <label className="block text-sm font-medium mb-3">
              Prayers Completed
            </label>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
              {[
                { key: 'fajr', label: 'Fajr', icon: '🌅' },
                { key: 'dhuhr', label: 'Dhuhr', icon: '☀️' },
                { key: 'asr', label: 'Asr', icon: '🌤️' },
                { key: 'maghrib', label: 'Maghrib', icon: '🌇' },
                { key: 'isha', label: 'Isha', icon: '🌙' }
              ].map(({ key, label, icon }) => (
                <button
                  key={key}
                  onClick={() => togglePrayer(key as keyof typeof prayers)}
                  className={`
                    p-4 rounded-lg border-2 transition-all text-center
                    ${prayers[key as keyof typeof prayers]
                      ? 'border-primary bg-primary/10 shadow-sm'
                      : 'border-border hover:border-primary/50'
                    }
                  `}
                >
                  <div className="text-2xl mb-1">{icon}</div>
                  <div className="text-sm font-medium">{label}</div>
                  {prayers[key as keyof typeof prayers] && (
                    <div className="text-xs text-primary mt-1">✓</div>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Save Button */}
          <div className="flex items-center gap-4">
            <Button
              onClick={handleSave}
              disabled={loading}
              className="flex-1"
            >
              {loading ? 'Saving...' : saved ? '✓ Saved!' : 'Save Progress'}
            </Button>
            {saved && (
              <span className="text-sm text-primary font-medium">
                Great job! Keep it up! 🌟
              </span>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
