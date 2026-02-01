import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from 'firebase/auth';
import {
  doc,
  setDoc,
  getDoc,
  serverTimestamp,
} from 'firebase/firestore';
import { auth, db } from '../lib/firebase';
import type { User, UserRole, Student, Teacher, Parent } from '../types';

export class AuthService {
  /**
   * Sign up a new user with email, password, and role
   */
  static async signUp(
    email: string,
    password: string,
    displayName: string,
    role: UserRole
  ): Promise<User> {
    try {
      // Create Firebase auth user
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const firebaseUser = userCredential.user;

      // Update display name
      await updateProfile(firebaseUser, { displayName });

      // Create user document in Firestore
      const userData: User = {
        uid: firebaseUser.uid,
        email: email,
        displayName,
        role,
        createdAt: new Date(),
        updatedAt: new Date(),
        settings: {
          notifications: true,
          emailNotifications: true,
          theme: 'light',
          colorScheme: 'green',
          language: 'en',
        },
      };

      await setDoc(doc(db, 'users', firebaseUser.uid), {
        ...userData,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });

      // Create role-specific document
      await this.createRoleDocument(firebaseUser.uid, role);

      return userData;
    } catch (error) {
      const firebaseError = error as { code?: string };
      throw new Error(this.getErrorMessage(firebaseError.code || ''));
    }
  }

  /**
   * Sign in an existing user
   */
  static async signIn(email: string, password: string): Promise<User> {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const firebaseUser = userCredential.user;

      // Get user data from Firestore
      const userDoc = await getDoc(doc(db, 'users', firebaseUser.uid));

      if (!userDoc.exists()) {
        throw new Error('User data not found');
      }

      const userData = userDoc.data() as User;

      return {
        ...userData,
        createdAt: userData.createdAt || new Date(),
        updatedAt: userData.updatedAt || new Date(),
      };
    } catch (error) {
      const firebaseError = error as { code?: string };
      throw new Error(this.getErrorMessage(firebaseError.code || ''));
    }
  }

  /**
   * Sign out the current user
   */
  static async signOut(): Promise<void> {
    try {
      await signOut(auth);
    } catch {
      throw new Error('Failed to sign out');
    }
  }

  /**
   * Get current user data
   */
  static async getCurrentUser(): Promise<User | null> {
    const firebaseUser = auth.currentUser;

    if (!firebaseUser) {
      return null;
    }

    const userDoc = await getDoc(doc(db, 'users', firebaseUser.uid));

    if (!userDoc.exists()) {
      return null;
    }

    const userData = userDoc.data() as User;

    return {
      ...userData,
      createdAt: userData.createdAt || new Date(),
      updatedAt: userData.updatedAt || new Date(),
    };
  }

  /**
   * Create role-specific document in Firestore
   */
  private static async createRoleDocument(
    uid: string,
    role: UserRole
  ): Promise<void> {
    switch (role) {
      case 'student':
        const studentData: Student = {
          uid,
          teacherId: '', // Will be assigned later
          parentIds: [],
          profile: {
            startDate: new Date(),
          },
          memorization: {
            totalAyahs: 0,
            completedSurahs: [],
            completedHizbs: [],
            completedJuz: [],
            currentJuz: 1,
            currentProgress: 0,
          },
          statistics: {
            totalTimeSpent: 0,
            totalMistakes: 0,
            averageGrade: 0,
            currentStreak: 0,
            longestStreak: 0,
          },
          preferences: {
            preferredReciter: 'ar.alafasy', // Mishary Alafasy default
            quizDifficulty: 'medium',
            gradingSystem: 'letter',
            reminderTimes: ['08:00', '16:00'],
          },
        };

        await setDoc(doc(db, 'students', uid), {
          ...studentData,
          profile: {
            ...studentData.profile,
            startDate: serverTimestamp(),
          },
        });
        break;

      case 'teacher':
        const teacherData: Teacher = {
          uid,
          studentIds: [],
          profile: {},
          settings: {
            defaultAssignmentType: 'daily',
            autoGrading: false,
          },
        };

        await setDoc(doc(db, 'teachers', uid), teacherData);
        break;

      case 'parent':
        const parentData: Parent = {
          uid,
          childrenIds: [],
          profile: {},
          notificationPreferences: {
            dailyReview: true,
            weeklyReport: true,
            achievements: true,
            missedWork: true,
          },
        };

        await setDoc(doc(db, 'parents', uid), parentData);
        break;
    }
  }

  /**
   * Get user-friendly error messages
   */
  private static getErrorMessage(errorCode: string): string {
    const errorMessages: Record<string, string> = {
      'auth/email-already-in-use': 'This email is already registered',
      'auth/invalid-email': 'Invalid email address',
      'auth/operation-not-allowed': 'Operation not allowed',
      'auth/weak-password': 'Password should be at least 6 characters',
      'auth/user-disabled': 'This account has been disabled',
      'auth/user-not-found': 'No account found with this email',
      'auth/wrong-password': 'Incorrect password',
      'auth/invalid-credential': 'Invalid email or password',
      'auth/too-many-requests': 'Too many attempts. Please try again later',
    };

    return errorMessages[errorCode] || 'An error occurred. Please try again';
  }
}
