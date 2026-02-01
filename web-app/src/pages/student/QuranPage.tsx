import React from 'react';
import { Link } from 'react-router-dom';
import { QuranReader } from '../../components/shared/QuranReader';
import { Button } from '../../components/shared';

export const QuranPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <Link to="/student/dashboard">
            <Button variant="outline" size="sm">
              ← Back to Dashboard
            </Button>
          </Link>
        </div>

        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground">Quran Reader</h1>
          <p className="text-muted-foreground mt-2">
            Read, revise, and memorize the Holy Quran
          </p>
        </div>

        {/* Quran Reader */}
        <QuranReader mode="student" />
      </div>
    </div>
  );
};
