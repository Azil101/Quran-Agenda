import {
  doc,
  setDoc,
  getDoc,
  updateDoc,
  arrayUnion,
  serverTimestamp,
  Timestamp
} from 'firebase/firestore';
import { db } from '../lib/firebase';
import { logger } from '../lib/logger';

/**
 * RelationshipService
 * Manages student-teacher-parent relationships via invite codes
 */
export class RelationshipService {
  private static readonly INVITES_COLLECTION = 'invites';
  private static readonly STUDENTS_COLLECTION = 'students';
  private static readonly TEACHERS_COLLECTION = 'teachers';
  private static readonly PARENTS_COLLECTION = 'parents';

  /**
   * Generate a unique 8-character invite code
   */
  private static generateInviteCode(): string {
    const characters = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'; // Removed confusing characters
    let code = '';
    for (let i = 0; i < 8; i++) {
      code += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return code;
  }

  /**
   * Teacher creates an invite code for a student
   */
  static async createStudentInvite(teacherId: string, teacherName: string): Promise<string> {
    try {
      const code = this.generateInviteCode();
      const inviteRef = doc(db, this.INVITES_COLLECTION, code);

      await setDoc(inviteRef, {
        code,
        type: 'student',
        createdBy: teacherId,
        createdByName: teacherName,
        createdAt: serverTimestamp(),
        expiresAt: Timestamp.fromDate(new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)), // 7 days
        used: false,
        usedBy: null,
        usedAt: null
      });

      logger.info(`Teacher ${teacherId} created student invite code: ${code}`);
      return code;
    } catch (error) {
      logger.error('Failed to create student invite', error as Error);
      throw new Error('Failed to create invite code. Please try again.');
    }
  }

  /**
   * Parent creates an invite code for their child (student)
   */
  static async createChildInvite(parentId: string, parentName: string): Promise<string> {
    try {
      const code = this.generateInviteCode();
      const inviteRef = doc(db, this.INVITES_COLLECTION, code);

      await setDoc(inviteRef, {
        code,
        type: 'child',
        createdBy: parentId,
        createdByName: parentName,
        createdAt: serverTimestamp(),
        expiresAt: Timestamp.fromDate(new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)), // 30 days
        used: false,
        usedBy: null,
        usedAt: null
      });

      logger.info(`Parent ${parentId} created child invite code: ${code}`);
      return code;
    } catch (error) {
      logger.error('Failed to create child invite', error as Error);
      throw new Error('Failed to create invite code. Please try again.');
    }
  }

  /**
   * Student uses an invite code to join a teacher
   */
  static async useStudentInvite(studentId: string, studentName: string, code: string): Promise<void> {
    try {
      const inviteRef = doc(db, this.INVITES_COLLECTION, code.toUpperCase());
      const inviteSnap = await getDoc(inviteRef);

      if (!inviteSnap.exists()) {
        throw new Error('Invalid invite code. Please check and try again.');
      }

      const invite = inviteSnap.data();

      if (invite.used) {
        throw new Error('This invite code has already been used.');
      }

      if (invite.type !== 'student') {
        throw new Error('This is not a student invite code.');
      }

      const now = Timestamp.now();
      if (invite.expiresAt < now) {
        throw new Error('This invite code has expired.');
      }

      // Link student to teacher
      const teacherRef = doc(db, this.TEACHERS_COLLECTION, invite.createdBy);
      const studentRef = doc(db, this.STUDENTS_COLLECTION, studentId);

      await Promise.all([
        updateDoc(teacherRef, {
          studentIds: arrayUnion(studentId),
          students: arrayUnion({
            id: studentId,
            name: studentName,
            addedAt: serverTimestamp()
          })
        }),
        updateDoc(studentRef, {
          teacherId: invite.createdBy,
          teacherName: invite.createdByName,
          joinedAt: serverTimestamp()
        }),
        updateDoc(inviteRef, {
          used: true,
          usedBy: studentId,
          usedAt: serverTimestamp()
        })
      ]);

      logger.info(`Student ${studentId} joined teacher ${invite.createdBy} via code ${code}`);
    } catch (error) {
      logger.error('Failed to use student invite', error as Error);
      throw error;
    }
  }

  /**
   * Parent uses an invite code to link to their child
   */
  static async useChildInvite(parentId: string, parentName: string, code: string): Promise<void> {
    try {
      const inviteRef = doc(db, this.INVITES_COLLECTION, code.toUpperCase());
      const inviteSnap = await getDoc(inviteRef);

      if (!inviteSnap.exists()) {
        throw new Error('Invalid invite code. Please check and try again.');
      }

      const invite = inviteSnap.data();

      if (invite.used) {
        throw new Error('This invite code has already been used.');
      }

      if (invite.type !== 'child') {
        throw new Error('This is not a parent invite code.');
      }

      const now = Timestamp.now();
      if (invite.expiresAt < now) {
        throw new Error('This invite code has expired.');
      }

      // Link parent to child
      const parentRef = doc(db, this.PARENTS_COLLECTION, parentId);
      const studentId = invite.createdBy; // Child created the code, so createdBy is the student
      const studentRef = doc(db, this.STUDENTS_COLLECTION, studentId);

      await Promise.all([
        updateDoc(parentRef, {
          childIds: arrayUnion(studentId),
          children: arrayUnion({
            id: studentId,
            name: invite.createdByName,
            addedAt: serverTimestamp()
          })
        }),
        updateDoc(studentRef, {
          parentIds: arrayUnion(parentId),
          parents: arrayUnion({
            id: parentId,
            name: parentName,
            addedAt: serverTimestamp()
          })
        }),
        updateDoc(inviteRef, {
          used: true,
          usedBy: parentId,
          usedAt: serverTimestamp()
        })
      ]);

      logger.info(`Parent ${parentId} linked to child ${studentId} via code ${code}`);
    } catch (error) {
      logger.error('Failed to use child invite', error as Error);
      throw error;
    }
  }

  /**
   * Get all students for a teacher
   */
  static async getTeacherStudents(teacherId: string): Promise<any[]> {
    try {
      const teacherRef = doc(db, this.TEACHERS_COLLECTION, teacherId);
      const teacherSnap = await getDoc(teacherRef);

      if (!teacherSnap.exists()) {
        return [];
      }

      const teacherData = teacherSnap.data();
      return teacherData.students || [];
    } catch (error) {
      logger.error('Failed to get teacher students', error as Error);
      throw new Error('Failed to load students.');
    }
  }

  /**
   * Get all children for a parent
   */
  static async getParentChildren(parentId: string): Promise<any[]> {
    try {
      const parentRef = doc(db, this.PARENTS_COLLECTION, parentId);
      const parentSnap = await getDoc(parentRef);

      if (!parentSnap.exists()) {
        return [];
      }

      const parentData = parentSnap.data();
      return parentData.children || [];
    } catch (error) {
      logger.error('Failed to get parent children', error as Error);
      throw new Error('Failed to load children.');
    }
  }

  /**
   * Get teacher info for a student
   */
  static async getStudentTeacher(studentId: string): Promise<any | null> {
    try {
      const studentRef = doc(db, this.STUDENTS_COLLECTION, studentId);
      const studentSnap = await getDoc(studentRef);

      if (!studentSnap.exists()) {
        return null;
      }

      const studentData = studentSnap.data();
      if (!studentData.teacherId) {
        return null;
      }

      return {
        id: studentData.teacherId,
        name: studentData.teacherName
      };
    } catch (error) {
      logger.error('Failed to get student teacher', error as Error);
      return null;
    }
  }
}
