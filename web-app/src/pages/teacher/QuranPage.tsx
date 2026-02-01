import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { QuranReader } from '../../components/shared/QuranReader';
import { Button, Card, CardContent } from '../../components/shared';

export const QuranPage: React.FC = () => {
  const [selectedRange, setSelectedRange] = useState<{
    fromSurah: number;
    fromAyah: number;
    toSurah: number;
    toAyah: number;
  } | null>(null);

  const handleSelectRange = (fromSurah: number, fromAyah: number, toSurah: number, toAyah: number) => {
    setSelectedRange({ fromSurah, fromAyah, toSurah, toAyah });
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <Link to="/teacher/dashboard">
            <Button variant="outline" size="sm">
              ← Back to Dashboard
            </Button>
          </Link>
        </div>

        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground">Quran Reader</h1>
          <p className="text-muted-foreground mt-2">
            Browse the Quran and select ranges for lesson assignments
          </p>
        </div>

        {/* Selected Range Display */}
        {selectedRange && (
          <Card className="mb-6 border-primary">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Selected Range:</p>
                  <p className="text-lg font-bold">
                    Surah {selectedRange.fromSurah}:{selectedRange.fromAyah} →
                    Surah {selectedRange.toSurah}:{selectedRange.toAyah}
                  </p>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" onClick={() => {
                    // TODO: Navigate to assign lesson page with this range
                    alert('Navigate to lesson assignment with this range');
                  }}>
                    Assign as Lesson
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => setSelectedRange(null)}
                  >
                    Clear
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Quran Reader */}
        <QuranReader mode="teacher" onSelectRange={handleSelectRange} />
      </div>
    </div>
  );
};
