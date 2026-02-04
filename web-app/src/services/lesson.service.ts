import {
  collection,
  doc,
  setDoc,
  getDoc,
  getDocs,
  updateDoc,
  query,
  where,
  orderBy,
  serverTimestamp
} from 'firebase/firestore';
import { db } from '../lib/firebase';
import { logger } from '../lib/logger';
import type { Lesson, LessonSection } from '../types';

/**
 * LessonService
 * Manages lesson assignments from teachers to students
 */
export class LessonService {
  private static readonly COLLECTION = 'lessons';

  /**
   * Teacher assigns a lesson to a student
   */
  static async assignLesson(
    teacherId: string,
    studentId: string,
    oldRevision: LessonSection,
    newLesson: LessonSection,
    date: Date,
    _notes?: string
  ): Promise<string> {
    try {
      const lessonRef = doc(collection(db, this.COLLECTION));
      const lessonId = lessonRef.id;

      const lesson: Partial<Lesson> = {
        teacherId,
        studentId,
        date,
        type: 'daily',
        oldRevision,
        newLesson,
        status: 'assigned'
      };

      await setDoc(lessonRef, lesson);

      logger.info(`Teacher ${teacherId} assigned lesson ${lessonId} to student ${studentId}`);
      return lessonId;
    } catch (error) {
      logger.error('Failed to assign lesson', error as Error);
      throw new Error('Failed to assign lesson. Please try again.');
    }
  }

  /**
   * Get a specific lesson
   */
  static async getLesson(lessonId: string): Promise<Lesson | null> {
    try {
      const lessonRef = doc(db, this.COLLECTION, lessonId);
      const lessonSnap = await getDoc(lessonRef);

      if (!lessonSnap.exists()) {
        return null;
      }

      return {
        id: lessonSnap.id,
        ...lessonSnap.data()
      } as Lesson;
    } catch (error) {
      logger.error('Failed to get lesson', error as Error);
      return null;
    }
  }

  /**
   * Get all lessons for a student
   */
  static async getStudentLessons(studentId: string, limit: number = 50): Promise<Lesson[]> {
    try {
      const q = query(
        collection(db, this.COLLECTION),
        where('studentId', '==', studentId),
        orderBy('assignedAt', 'desc')
      );

      const querySnap = await getDocs(q);
      const lessons: Lesson[] = [];

      querySnap.forEach((doc) => {
        lessons.push({
          id: doc.id,
          ...doc.data()
        } as Lesson);
      });

      return lessons.slice(0, limit);
    } catch (error) {
      logger.error('Failed to get student lessons', error as Error);
      return [];
    }
  }

  /**
   * Get current (most recent) lesson for a student
   */
  static async getCurrentLesson(studentId: string): Promise<Lesson | null> {
    try {
      const lessons = await this.getStudentLessons(studentId, 1);
      return lessons.length > 0 ? lessons[0] : null;
    } catch (error) {
      logger.error('Failed to get current lesson', error as Error);
      return null;
    }
  }

  /**
   * Get all lessons assigned by a teacher
   */
  static async getTeacherLessons(teacherId: string, limit: number = 100): Promise<Lesson[]> {
    try {
      const q = query(
        collection(db, this.COLLECTION),
        where('teacherId', '==', teacherId),
        orderBy('date', 'desc')
      );

      const querySnap = await getDocs(q);
      const lessons: Lesson[] = [];

      querySnap.forEach((doc) => {
        lessons.push({
          id: doc.id,
          ...doc.data()
        } as Lesson);
      });

      return lessons.slice(0, limit);
    } catch (error) {
      logger.error('Failed to get teacher lessons', error as Error);
      return [];
    }
  }

  /**
   * Student marks lesson as completed
   */
  static async completeLesson(lessonId: string): Promise<void> {
    try {
      const lessonRef = doc(db, this.COLLECTION, lessonId);

      await updateDoc(lessonRef, {
        status: 'completed',
        completedAt: serverTimestamp()
      });

      logger.info(`Lesson ${lessonId} marked as completed`);
    } catch (error) {
      logger.error('Failed to complete lesson', error as Error);
      throw new Error('Failed to mark lesson as completed.');
    }
  }

  /**
   * Teacher grades a completed lesson
   */
  static async gradeLesson(
    lessonId: string,
    finalGrade: 'A' | 'B' | 'C' | 'INC',
    comments: string
  ): Promise<void> {
    try {
      const lessonRef = doc(db, this.COLLECTION, lessonId);

      await updateDoc(lessonRef, {
        status: 'reviewed',
        teacherReview: {
          reviewedAt: new Date(),
          comments,
          finalGrade
        }
      });

      logger.info(`Lesson ${lessonId} graded as ${finalGrade}`);
    } catch (error) {
      logger.error('Failed to grade lesson', error as Error);
      throw new Error('Failed to grade lesson.');
    }
  }

  /**
   * Parent reviews a graded lesson
   */
  static async parentReview(
    lessonId: string,
    comments: string,
    signature: string
  ): Promise<void> {
    try {
      const lessonRef = doc(db, this.COLLECTION, lessonId);

      await updateDoc(lessonRef, {
        parentReview: {
          comments,
          signature,
          reviewedAt: serverTimestamp()
        }
      });

      logger.info(`Parent reviewed lesson ${lessonId}`);
    } catch (error) {
      logger.error('Failed to add parent review', error as Error);
      throw new Error('Failed to submit review.');
    }
  }

  /**
   * Get lesson statistics for a student
   */
  static async getStudentLessonStats(studentId: string): Promise<{
    total: number;
    assigned: number;
    completed: number;
    reviewed: number;
    averageGrade: string | null;
  }> {
    try {
      const lessons = await this.getStudentLessons(studentId, 1000);

      const stats = {
        total: lessons.length,
        assigned: lessons.filter(l => l.status === 'assigned').length,
        completed: lessons.filter(l => l.status === 'completed').length,
        reviewed: lessons.filter(l => l.status === 'reviewed').length,
        averageGrade: null as string | null
      };

      // Calculate average grade (for reviewed lessons)
      const reviewedLessons = lessons.filter(l => l.teacherReview?.finalGrade);
      if (reviewedLessons.length > 0) {
        const gradeMap: Record<string, number> = { 'A': 4, 'B': 3, 'C': 2, 'INC': 0 };
        const totalGradePoints = reviewedLessons.reduce((sum, lesson) => {
          return sum + (gradeMap[lesson.teacherReview?.finalGrade || 'INC'] || 0);
        }, 0);
        const avgPoints = totalGradePoints / reviewedLessons.length;

        // Convert back to letter grade
        if (avgPoints >= 3.5) stats.averageGrade = 'A';
        else if (avgPoints >= 2.5) stats.averageGrade = 'B';
        else if (avgPoints >= 1.5) stats.averageGrade = 'C';
        else stats.averageGrade = 'INC';
      }

      return stats;
    } catch (error) {
      logger.error('Failed to get lesson stats', error as Error);
      return {
        total: 0,
        assigned: 0,
        completed: 0,
        reviewed: 0,
        averageGrade: null
      };
    }
  }
}
