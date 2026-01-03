// User Types
export type UserRole = 'student' | 'teacher' | 'parent';

export interface User {
  uid: string;
  email: string;
  displayName: string;
  role: UserRole;
  profilePicture?: string;
  createdAt: Date;
  updatedAt: Date;
  settings: UserSettings;
}

export interface UserSettings {
  notifications: boolean;
  emailNotifications: boolean;
  theme: 'light' | 'dark';
  colorScheme: 'green' | 'default';
  language: 'en' | 'ar';
}

// Student Types
export interface Student {
  uid: string;
  teacherId: string;
  parentIds: string[];
  profile: StudentProfile;
  memorization: MemorizationStats;
  statistics: StudentStatistics;
  preferences: StudentPreferences;
}

export interface StudentProfile {
  grade?: string;
  school?: string;
  startDate: Date;
}

export interface MemorizationStats {
  totalAyahs: number;
  completedSurahs: number[];
  completedHizbs: number[];
  completedJuz: number[];
  currentJuz: number;
  currentProgress: number; // percentage
}

export interface StudentStatistics {
  totalTimeSpent: number; // minutes
  totalMistakes: number;
  averageGrade: number;
  currentStreak: number;
  longestStreak: number;
}

export interface StudentPreferences {
  preferredReciter: string;
  quizDifficulty: 'easy' | 'medium' | 'hard';
  gradingSystem: 'letter' | 'stars';
  reminderTimes: string[];
}

// Teacher Types
export interface Teacher {
  uid: string;
  studentIds: string[];
  profile: TeacherProfile;
  settings: TeacherSettings;
}

export interface TeacherProfile {
  school?: string;
  specialization?: string;
  experience?: number;
}

export interface TeacherSettings {
  defaultAssignmentType: 'daily' | 'weekly' | 'custom';
  autoGrading: boolean;
}

// Parent Types
export interface Parent {
  uid: string;
  childrenIds: string[];
  profile: ParentProfile;
  notificationPreferences: ParentNotificationPreferences;
}

export interface ParentProfile {
  phone?: string;
}

export interface ParentNotificationPreferences {
  dailyReview: boolean;
  weeklyReport: boolean;
  achievements: boolean;
  missedWork: boolean;
}

// Lesson Types
export type GradeValue = 'A' | 'B' | 'C' | 'INC' | number;

export interface Lesson {
  id: string;
  studentId: string;
  teacherId: string;
  date: Date;
  type: 'daily' | 'test' | 'review';
  oldRevision?: LessonSection;
  newLesson?: LessonSection;
  status: 'assigned' | 'in_progress' | 'completed' | 'reviewed';
  teacherReview?: TeacherReview;
  parentReview?: ParentReview;
}

export interface LessonSection {
  fromSurah: number;
  fromAyah: number;
  toSurah: number;
  toAyah: number;
  completed: boolean;
  grade?: GradeValue;
  mistakes?: number;
  timeSpent?: number;
  notes?: string;
}

export interface TeacherReview {
  reviewedAt: Date;
  comments: string;
  finalGrade: GradeValue;
}

export interface ParentReview {
  reviewedAt: Date;
  signedBy: string;
  signature: string; // digital signature (base64 or URL)
  comments?: string;
}

// Daily Tracker Types
export interface DailyTracker {
  id: string;
  studentId: string;
  date: Date;
  prayers: Prayers;
  quranTime: number; // minutes
  lessonIds: string[];
  homework: HomeworkItem[];
  evaluation: Evaluation;
  parentSignature?: ParentSignature;
  completed: boolean;
}

export interface Prayers {
  fajr: boolean;
  dhuhr: boolean;
  asr: boolean;
  maghrib: boolean;
  isha: boolean;
}

export interface HomeworkItem {
  id: string;
  subject: string;
  completed: boolean;
}

export interface Evaluation {
  selfGrade?: GradeValue;
  teacherGrade?: GradeValue;
  notes?: string;
}

export interface ParentSignature {
  signedAt: Date;
  parentId: string;
  signature: string;
}

// Quiz Types
export type QuizMode = 'multiple_choice' | 'text' | 'audio';

export interface Quiz {
  id: string;
  studentId: string;
  juzNumber: number;
  type: 'auto' | 'manual' | 'teacher_assigned';
  mode: QuizMode;
  questions: QuizQuestion[];
  score: number;
  totalQuestions: number;
  mistakes: number;
  timeSpent: number;
  completedAt?: Date;
  feedback?: string;
}

export interface QuizQuestion {
  id: string;
  text: string;
  type: 'multiple_choice' | 'fill_blank' | 'audio_recite';
  options?: string[];
  correctAnswer: string;
  studentAnswer?: string;
  correct?: boolean;
  surahRef?: SurahReference;
}

export interface SurahReference {
  surah: number;
  ayah: number;
}

// Homework Types
export interface Homework {
  id: string;
  studentId: string;
  subject: string;
  description: string;
  dueDate: Date;
  priority: 'low' | 'medium' | 'high';
  completed: boolean;
  completedAt?: Date;
  notes?: string;
}

// Day Off Types
export interface DayOff {
  id: string;
  studentId: string;
  date: Date;
  reason: 'juz_completion' | 'teacher_approved' | 'parent_approved';
  metadata?: DayOffMetadata;
  active: boolean;
}

export interface DayOffMetadata {
  juzNumber?: number;
  approvedBy?: string;
}

// Quran Data Types
export interface Surah {
  id: number;
  name: string;
  transliteration: string;
  translation: string;
  type: 'meccan' | 'medinan';
  totalAyahs: number;
  number: number;
}

export interface Ayah {
  number: number;
  text: string;
  numberInSurah: number;
  juz: number;
  manzil: number;
  page: number;
  ruku: number;
  hizbQuarter: number;
  sajda?: boolean;
}

export interface Reciter {
  id: number;
  name: string;
  arabicName: string;
  style?: string;
}

// API Response Types
export interface QuranAPIResponse<T> {
  data: T;
  status: number;
}

// Component Props Types
export interface DashboardCardProps {
  title: string;
  value: string | number;
  icon?: React.ReactNode;
  subtitle?: string;
  trend?: {
    value: number;
    isPositive: boolean;
  };
}

export interface ProgressBarProps {
  value: number;
  max: number;
  label?: string;
  showPercentage?: boolean;
}

export interface GradeDisplayProps {
  grade: GradeValue;
  system: 'letter' | 'stars';
  size?: 'sm' | 'md' | 'lg';
}
