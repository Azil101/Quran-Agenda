import {
  collection,
  doc,
  setDoc,
  getDoc,
  getDocs,
  query,
  where,
  orderBy,
  serverTimestamp,
  Timestamp
} from 'firebase/firestore';
import { db } from '../lib/firebase';
import { logger } from '../lib/logger';
import type { DailyTracker, Prayers } from '../types';

/**
 * DailyTrackerService
 * Manages daily Quran time and prayer tracking for students
 */
export class DailyTrackerService {
  private static readonly COLLECTION = 'dailyTracker';

  /**
   * Generate tracker ID from userId and date (YYYY-MM-DD format)
   */
  private static generateTrackerId(userId: string, date: Date): string {
    const dateStr = date.toISOString().split('T')[0]; // YYYY-MM-DD
    return `${userId}_${dateStr}`;
  }

  /**
   * Create or update daily tracker entry
   */
  static async saveDailyTracker(
    userId: string,
    date: Date,
    timeMinutes: number,
    prayers: Prayers
  ): Promise<void> {
    try {
      const trackerId = this.generateTrackerId(userId, date);
      const trackerRef = doc(db, this.COLLECTION, trackerId);

      const trackerData: Partial<DailyTracker> = {
        userId,
        date: Timestamp.fromDate(date),
        timeSpentMinutes: timeMinutes,
        prayers,
        updatedAt: serverTimestamp()
      };

      // Check if entry exists
      const existingDoc = await getDoc(trackerRef);

      if (existingDoc.exists()) {
        // Update existing entry
        await setDoc(trackerRef, trackerData, { merge: true });
        logger.info(`Updated daily tracker for user ${userId} on ${date.toISOString().split('T')[0]}`);
      } else {
        // Create new entry
        await setDoc(trackerRef, {
          ...trackerData,
          createdAt: serverTimestamp()
        });
        logger.info(`Created daily tracker for user ${userId} on ${date.toISOString().split('T')[0]}`);
      }
    } catch (error) {
      logger.error('Failed to save daily tracker', error as Error);
      throw new Error('Failed to save your daily progress. Please try again.');
    }
  }

  /**
   * Get daily tracker for a specific date
   */
  static async getDailyTracker(userId: string, date: Date): Promise<DailyTracker | null> {
    try {
      const trackerId = this.generateTrackerId(userId, date);
      const trackerRef = doc(db, this.COLLECTION, trackerId);
      const trackerSnap = await getDoc(trackerRef);

      if (!trackerSnap.exists()) {
        return null;
      }

      return {
        id: trackerSnap.id,
        ...trackerSnap.data()
      } as DailyTracker;
    } catch (error) {
      logger.error('Failed to get daily tracker', error as Error);
      return null;
    }
  }

  /**
   * Get daily trackers for a date range
   */
  static async getDailyTrackersInRange(
    userId: string,
    startDate: Date,
    endDate: Date
  ): Promise<DailyTracker[]> {
    try {
      const q = query(
        collection(db, this.COLLECTION),
        where('userId', '==', userId),
        where('date', '>=', Timestamp.fromDate(startDate)),
        where('date', '<=', Timestamp.fromDate(endDate)),
        orderBy('date', 'desc')
      );

      const querySnap = await getDocs(q);
      const trackers: DailyTracker[] = [];

      querySnap.forEach((doc) => {
        trackers.push({
          id: doc.id,
          ...doc.data()
        } as DailyTracker);
      });

      return trackers;
    } catch (error) {
      logger.error('Failed to get daily trackers in range', error as Error);
      return [];
    }
  }

  /**
   * Get tracker statistics for a user
   */
  static async getTrackerStats(userId: string, days: number = 30): Promise<{
    totalMinutes: number;
    averageMinutes: number;
    daysTracked: number;
    prayersCompleted: number;
    totalPrayers: number;
    streak: number;
  }> {
    try {
      const endDate = new Date();
      const startDate = new Date();
      startDate.setDate(startDate.getDate() - days);

      const trackers = await this.getDailyTrackersInRange(userId, startDate, endDate);

      let totalMinutes = 0;
      let prayersCompleted = 0;
      let totalPrayers = 0;
      let currentStreak = 0;

      // Calculate totals
      trackers.forEach((tracker) => {
        totalMinutes += tracker.timeSpentMinutes;

        // Count prayers
        const prayers = tracker.prayers;
        const prayerCount = Object.values(prayers).filter(Boolean).length;
        prayersCompleted += prayerCount;
        totalPrayers += 5; // 5 prayers per day
      });

      // Calculate current streak (consecutive days)
      const today = new Date().toISOString().split('T')[0];
      let checkDate = new Date();

      while (true) {
        const dateStr = checkDate.toISOString().split('T')[0];
        const tracker = trackers.find(t =>
          t.date.toDate().toISOString().split('T')[0] === dateStr
        );

        if (tracker && tracker.timeSpentMinutes > 0) {
          currentStreak++;
          checkDate.setDate(checkDate.getDate() - 1);
        } else {
          break;
        }
      }

      return {
        totalMinutes,
        averageMinutes: trackers.length > 0 ? Math.round(totalMinutes / trackers.length) : 0,
        daysTracked: trackers.length,
        prayersCompleted,
        totalPrayers,
        streak: currentStreak
      };
    } catch (error) {
      logger.error('Failed to get tracker stats', error as Error);
      return {
        totalMinutes: 0,
        averageMinutes: 0,
        daysTracked: 0,
        prayersCompleted: 0,
        totalPrayers: 0,
        streak: 0
      };
    }
  }

  /**
   * Check if student has tracked today
   */
  static async hasTrackedToday(userId: string): Promise<boolean> {
    const today = new Date();
    const tracker = await this.getDailyTracker(userId, today);
    return tracker !== null && tracker.timeSpentMinutes > 0;
  }
}
