import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent, Button } from '../shared';
import { LessonService } from '../../services/lesson.service';
import { useAuth } from '../../contexts/AuthContext';
import type { Lesson } from '../../types';
import { logger } from '../../lib/logger';

export const CurrentLessonCard: React.FC = () => {
  const { user } = useAuth();
  const [lesson, setLesson] = useState<Lesson | null>(null);
  const [loading, setLoading] = useState(true);
  const [completing, setCompleting] = useState(false);

  useEffect(() => {
    loadCurrentLesson();
  }, [user]);

  const loadCurrentLesson = async () => {
    if (!user) return;

    try {
      const currentLesson = await LessonService.getCurrentLesson(user.uid);
      setLesson(currentLesson);
    } catch (error) {
      logger.error('Failed to load current lesson', error as Error);
    } finally {
      setLoading(false);
    }
  };

  const handleComplete = async () => {
    if (!lesson) return;

    setCompleting(true);
    try {
      await LessonService.completeLesson(lesson.id!);
      await loadCurrentLesson();
      alert('Lesson marked as complete! Great job! 🎉');
    } catch (error) {
      logger.error('Failed to complete lesson', error as Error);
      alert('Failed to mark lesson as complete. Please try again.');
    } finally {
      setCompleting(false);
    }
  };

  if (loading) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="animate-pulse space-y-3">
            <div className="h-4 bg-muted rounded w-1/2"></div>
            <div className="h-3 bg-muted rounded w-3/4"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!lesson) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Current Lesson</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            No lesson assigned yet. Your teacher will assign lessons soon!
          </p>
        </CardContent>
      </Card>
    );
  }

  const isCompleted = lesson.status === 'completed' || lesson.status === 'reviewed';

  return (
    <Card className={isCompleted ? 'border-primary bg-primary/5' : ''}>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Current Lesson</span>
          {isCompleted && (
            <span className="text-sm text-primary font-normal">✓ Completed</span>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Old Revision */}
        {lesson.oldRevision && (
          <div>
            <h4 className="text-sm font-medium mb-1">Old Revision</h4>
            <p className="text-sm text-muted-foreground">
              {lesson.oldRevision.fromSurah === lesson.oldRevision.toSurah ? (
                <>
                  Surah {lesson.oldRevision.fromSurah}, Ayah {lesson.oldRevision.fromAyah} -{' '}
                  {lesson.oldRevision.toAyah}
                </>
              ) : (
                <>
                  Surah {lesson.oldRevision.fromSurah}:{lesson.oldRevision.fromAyah} to Surah{' '}
                  {lesson.oldRevision.toSurah}:{lesson.oldRevision.toAyah}
                </>
              )}
            </p>
          </div>
        )}

        {/* New Material */}
        {lesson.newLesson && (
          <div>
            <h4 className="text-sm font-medium mb-1">New Material</h4>
            <p className="text-sm text-muted-foreground">
              {lesson.newLesson.fromSurah === lesson.newLesson.toSurah ? (
                <>
                  Surah {lesson.newLesson.fromSurah}, Ayah {lesson.newLesson.fromAyah} -{' '}
                  {lesson.newLesson.toAyah}
                </>
              ) : (
                <>
                  Surah {lesson.newLesson.fromSurah}:{lesson.newLesson.fromAyah} to Surah{' '}
                  {lesson.newLesson.toSurah}:{lesson.newLesson.toAyah}
                </>
              )}
            </p>
          </div>
        )}

        {/* Due Date */}
        <div>
          <h4 className="text-sm font-medium mb-1">Due Date</h4>
          <p className="text-sm text-muted-foreground">
            {new Date(lesson.date).toLocaleDateString('en-US', {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}
          </p>
        </div>

        {/* Grade (if reviewed) */}
        {lesson.status === 'reviewed' && lesson.teacherReview?.finalGrade && (
          <div>
            <h4 className="text-sm font-medium mb-1">Grade</h4>
            <div className="flex items-center gap-2">
              <span className="text-2xl font-bold text-primary">{lesson.teacherReview.finalGrade}</span>
            </div>
            {lesson.teacherReview?.comments && (
              <p className="text-sm text-muted-foreground mt-2">
                {lesson.teacherReview.comments}
              </p>
            )}
          </div>
        )}

        {/* Complete Button */}
        {!isCompleted && (
          <Button
            onClick={handleComplete}
            disabled={completing}
            className="w-full"
          >
            {completing ? 'Saving...' : 'Mark as Complete'}
          </Button>
        )}
      </CardContent>
    </Card>
  );
};
