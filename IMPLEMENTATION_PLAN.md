# Quran Academy Tracker - Comprehensive Implementation Plan

**Document Version**: 2.0
**Created**: 2026-02-02
**Product Manager Agent Analysis**

---

## Executive Summary

This document provides a detailed, phased implementation plan for the Quran Academy Tracker application. After analyzing the existing codebase and original requirements, this plan breaks down the work into 5 realistic phases with clear deliverables, technical specifications, and success criteria.

---

## Current State Assessment

### What's Already Built

| Component | Status | Details |
|-----------|--------|---------|
| Project Setup | COMPLETE | React 18 + TypeScript + Vite + Tailwind CSS |
| Authentication | COMPLETE | Firebase Auth with email/password, role selection |
| Role-Based Routing | COMPLETE | Protected routes for student/teacher/parent |
| Shared UI Components | COMPLETE | Button, Card, Input, Select components |
| Quran Reader | COMPLETE | Surah selection, Uthmani text, translation toggle |
| Type Definitions | COMPLETE | All major entity types defined |
| Auth Service | COMPLETE | Sign in, sign up, sign out, role documents |
| Quran API Service | COMPLETE | Fetch surahs, verses, search |
| Basic Dashboards | PARTIAL | Shell layouts exist, no functional data |

### What Needs to Be Built

| Feature | Priority | Complexity |
|---------|----------|------------|
| Daily Tracker (Time + Prayers) | HIGH | Medium |
| Lesson Assignment System | HIGH | High |
| Student-Teacher-Parent Links | HIGH | Medium |
| Memorization Tracking | HIGH | Medium |
| Homework Tracker | MEDIUM | Low |
| Grading System | MEDIUM | Medium |
| Quiz System | MEDIUM | High |
| Parent Review/Signature | MEDIUM | Medium |
| Audio Recitation | MEDIUM | Medium |
| Notifications | LOW | High |
| Day-Off Rewards | LOW | Low |
| Progress Analytics | LOW | Medium |

---

## Phase 1: Core Foundation (MVP)
**Duration**: 2 weeks (40-50 hours)
**Goal**: Make the app minimally usable for a student-teacher pair

### 1.1 Features to Implement

#### A. Firebase Services Layer
Create service classes for all Firestore collections:

```typescript
// services/student.service.ts
// services/teacher.service.ts
// services/parent.service.ts
// services/lesson.service.ts
// services/dailyTracker.service.ts
```

#### B. User Relationship Management
- Teacher can add students via email/invite code
- Parent can link to child via email/invite code
- Student profile shows assigned teacher and linked parents

#### C. Daily Tracker - Basic Version
- Time entry (manual input, hours/minutes)
- 5 prayer checkboxes (Fajr, Dhuhr, Asr, Maghrib, Isha)
- Date selector (defaults to today)
- Save/update daily record to Firestore

#### D. Lesson Assignment - Basic Version
- Teacher assigns daily lesson (old revision + new lesson)
- Surah/Ayah range selector (reuse Quran Reader selection)
- Student views assigned lesson on dashboard
- Student marks lesson as "started" or "completed"

### 1.2 Database Schema (Firestore)

```
Collections:
├── users/{uid}                    // Base user info (EXISTING)
├── students/{uid}                 // Student profile (EXISTING - needs CRUD)
├── teachers/{uid}                 // Teacher profile (EXISTING - needs CRUD)
├── parents/{uid}                  // Parent profile (EXISTING - needs CRUD)
├── lessons/{lessonId}             // NEW - Lesson assignments
│   ├── studentId
│   ├── teacherId
│   ├── date
│   ├── oldRevision: { fromSurah, toSurah, fromAyah, toAyah, completed, grade }
│   ├── newLesson: { fromSurah, toSurah, fromAyah, toAyah, completed, grade }
│   └── status: 'assigned' | 'in_progress' | 'completed'
├── dailyTracker/{trackerId}       // NEW - Daily records
│   ├── studentId
│   ├── date
│   ├── quranTime (minutes)
│   ├── prayers: { fajr, dhuhr, asr, maghrib, isha }
│   └── completed
└── invites/{inviteCode}           // NEW - Invitation codes
    ├── createdBy
    ├── type: 'teacher' | 'parent'
    ├── targetStudentId
    └── expiresAt
```

### 1.3 New Components

```
src/
├── components/
│   ├── daily/
│   │   ├── DailyTracker.tsx           // Main daily tracker widget
│   │   ├── PrayerCheckboxes.tsx       // 5 prayer checkboxes
│   │   ├── TimeInput.tsx              // Hours/minutes input
│   │   └── DateSelector.tsx           // Date picker
│   ├── lessons/
│   │   ├── LessonCard.tsx             // Display assigned lesson
│   │   ├── LessonAssignForm.tsx       // Teacher assigns lesson
│   │   └── AyahRangeSelector.tsx      // Surah:Ayah range picker
│   └── relationships/
│       ├── InviteCodeGenerator.tsx    // Generate invite links
│       ├── JoinWithCode.tsx           // Enter invite code
│       └── RelationshipList.tsx       // Show linked users
├── pages/
│   └── student/
│       ├── DailyTrackerPage.tsx       // Full tracker page
│       └── LessonDetailPage.tsx       // View assigned lesson
└── services/
    ├── lesson.service.ts              // Lesson CRUD
    ├── dailyTracker.service.ts        // Daily tracker CRUD
    └── relationship.service.ts        // Link users
```

### 1.4 Success Criteria

- [ ] Teacher can sign up and create account
- [ ] Student can sign up and link to teacher via code
- [ ] Teacher can assign daily lesson to student
- [ ] Student sees assigned lesson on dashboard
- [ ] Student can mark lesson as completed
- [ ] Student can log daily Quran time
- [ ] Student can check off prayers completed
- [ ] Data persists to Firestore

### 1.5 Estimated Effort

| Task | Hours |
|------|-------|
| Firebase services (5 services) | 8 |
| Relationship management | 6 |
| Daily tracker UI + logic | 8 |
| Lesson assignment UI + logic | 10 |
| Student dashboard integration | 6 |
| Testing and fixes | 8 |
| **Total** | **46 hours** |

---

## Phase 2: Teacher Portal & Grading
**Duration**: 2 weeks (35-40 hours)
**Goal**: Teacher can fully manage students and grade their work

### 2.1 Features to Implement

#### A. Teacher Dashboard - Functional
- List all assigned students with status
- Quick overview (completed today / pending)
- Click student to view details

#### B. Student Management
- View individual student profile
- See student's lesson history
- See student's memorization progress
- Contact parent (show linked parent info)

#### C. Grading System
- Teacher grades student's completed lesson
- Dual grading: Letter (A/B/C/INC) OR Stars (1-5)
- Add comments/notes on performance
- Mark number of mistakes
- Record time taken

#### D. Lesson History
- View past lessons for any student
- Filter by date range
- Edit past grades if needed

### 2.2 New Components

```
src/
├── components/
│   ├── grading/
│   │   ├── GradeSelector.tsx          // A/B/C/INC or 1-5 stars
│   │   ├── GradeDisplay.tsx           // Show grade visually
│   │   ├── MistakeCounter.tsx         // +/- mistake count
│   │   └── GradeCommentsInput.tsx     // Teacher comments
│   └── teacher/
│       ├── StudentList.tsx            // List of students
│       ├── StudentCard.tsx            // Quick student overview
│       └── LessonHistoryTable.tsx     // Past lessons table
└── pages/
    └── teacher/
        ├── StudentDetailPage.tsx      // Individual student view
        ├── GradingPage.tsx            // Grade a lesson
        └── AssignLessonPage.tsx       // Full assign form
```

### 2.3 Database Additions

```
lessons/{lessonId}:
  + teacherReview: {
      reviewedAt: Timestamp,
      comments: string,
      finalGrade: 'A' | 'B' | 'C' | 'INC' | 1-5,
      mistakes: number,
      timeRecorded: number
    }
```

### 2.4 Success Criteria

- [ ] Teacher sees all students on dashboard
- [ ] Teacher can click student and see full profile
- [ ] Teacher can view student's lesson history
- [ ] Teacher can grade completed lessons (letter or stars)
- [ ] Teacher can add comments and mistake count
- [ ] Grades appear on student's dashboard
- [ ] Student can switch between letter/star grading preference

### 2.5 Estimated Effort

| Task | Hours |
|------|-------|
| Teacher dashboard UI | 8 |
| Student detail page | 6 |
| Grading system UI + logic | 10 |
| Lesson history table | 6 |
| Integration and testing | 8 |
| **Total** | **38 hours** |

---

## Phase 3: Parent Portal & Signatures
**Duration**: 1.5 weeks (25-30 hours)
**Goal**: Parents can review and sign off on children's work

### 3.1 Features to Implement

#### A. Parent Dashboard - Functional
- List all linked children
- Each child shows: today's status, streak, pending reviews
- Click to view child's detail

#### B. Daily Review System
- Parent sees completed work for the day
- Views teacher's grade and comments
- Can add parent comments

#### C. Digital Signature
- Canvas-based signature pad
- Parent draws signature
- Stores as base64 or uploads to Firebase Storage
- Shows "Signed by [Parent Name] on [Date]"

#### D. Notifications Setup (Foundation)
- Set up Firebase Cloud Messaging
- Request notification permissions
- Store FCM tokens in user profile

### 3.2 New Components

```
src/
├── components/
│   ├── parent/
│   │   ├── ChildCard.tsx              // Child overview card
│   │   ├── PendingReviewList.tsx      // Reviews needing signature
│   │   └── ChildProgressSummary.tsx   // Weekly summary
│   └── signature/
│       ├── SignaturePad.tsx           // Canvas drawing pad
│       ├── SignatureDisplay.tsx       // Show saved signature
│       └── ReviewSignForm.tsx         // Review + sign workflow
└── pages/
    └── parent/
        ├── ChildDetailPage.tsx        // View child's progress
        └── ReviewPage.tsx             // Review and sign
```

### 3.3 Database Additions

```
dailyTracker/{trackerId}:
  + parentSignature: {
      signedAt: Timestamp,
      parentId: string,
      signature: string (base64 or Storage URL),
      comments: string (optional)
    }

users/{uid}:
  + fcmTokens: string[] // For notifications
```

### 3.4 Success Criteria

- [ ] Parent can sign up and link to child via code
- [ ] Parent sees all children on dashboard
- [ ] Parent can view child's daily work
- [ ] Parent can draw digital signature
- [ ] Signature is saved and displayed
- [ ] Teacher and student can see parent signed
- [ ] FCM tokens are stored for notifications (Phase 5)

### 3.5 Estimated Effort

| Task | Hours |
|------|-------|
| Parent dashboard UI | 6 |
| Child detail page | 4 |
| Signature pad component | 8 |
| Review workflow | 6 |
| FCM setup | 4 |
| Testing | 4 |
| **Total** | **32 hours** |

---

## Phase 4: Memorization & Homework
**Duration**: 2 weeks (35-40 hours)
**Goal**: Complete tracking of memorization progress and homework

### 4.1 Features to Implement

#### A. Memorization Tracker
- Track total ayahs memorized
- Track completed surahs (checkbox for each)
- Track completed hizbs (60 total)
- Track completed juz (30 total)
- Visual progress displays (grids, bars)

#### B. Juz Progress Grid
- 30-square grid showing juz progress
- Each juz shows: not started, in progress, completed
- Click juz to see surahs within
- Celebration animation on juz completion

#### C. Homework Tracker
- Add homework items (subject, description, due date)
- Priority levels (low, medium, high)
- Mark as completed
- View history of past homework
- Integration with daily tracker

#### D. Day-Off Rewards
- Auto-award day off when juz is completed
- Calendar shows earned day-offs
- Teacher can approve manual day-offs
- Notifications disabled on day-off

### 4.2 New Components

```
src/
├── components/
│   ├── memorization/
│   │   ├── JuzGrid.tsx                // 30-juz visual grid
│   │   ├── SurahProgressList.tsx      // 114 surah checklist
│   │   ├── HizbProgressBar.tsx        // Hizb progress
│   │   ├── AyahCounter.tsx            // Total ayahs display
│   │   └── MemorizationStats.tsx      // Combined stats card
│   ├── homework/
│   │   ├── HomeworkList.tsx           // List of homework items
│   │   ├── HomeworkForm.tsx           // Add/edit homework
│   │   ├── HomeworkCard.tsx           // Individual item
│   │   └── DueDateBadge.tsx           // Due date indicator
│   └── dayoff/
│       ├── DayOffCalendar.tsx         // Calendar view
│       └── DayOffBadge.tsx            // Earned badge
└── pages/
    └── student/
        ├── MemorizationPage.tsx       // Full progress view
        ├── HomeworkPage.tsx           // Homework management
        └── DayOffPage.tsx             // View earned days
```

### 4.3 Database Additions

```
students/{uid}:
  memorization: {
    totalAyahs: number,
    completedSurahs: number[],         // [1, 2, 3, 78, 114]
    completedHizbs: number[],          // [1, 2, 3, 4]
    completedJuz: number[],            // [30, 29, 28]
    currentJuz: number,
    currentProgress: number            // percentage
  }

homework/{homeworkId}:                 // NEW collection
  studentId: string,
  subject: string,
  description: string,
  dueDate: Timestamp,
  priority: 'low' | 'medium' | 'high',
  completed: boolean,
  completedAt: Timestamp | null,
  createdAt: Timestamp

dayOffs/{dayOffId}:                    // NEW collection
  studentId: string,
  date: Timestamp,
  reason: 'juz_completion' | 'teacher_approved' | 'parent_approved',
  metadata: { juzNumber?: number, approvedBy?: string },
  active: boolean
```

### 4.4 Success Criteria

- [ ] Student can view memorization progress (ayahs, surahs, hizbs, juz)
- [ ] 30-juz grid shows visual progress
- [ ] Completing a juz triggers celebration + day-off award
- [ ] Student can add homework items with due dates
- [ ] Homework shows on daily tracker
- [ ] Student can mark homework complete
- [ ] Teacher/parent can see memorization stats
- [ ] Day-off calendar shows earned rewards

### 4.5 Estimated Effort

| Task | Hours |
|------|-------|
| Juz grid component | 8 |
| Memorization tracking logic | 6 |
| Homework CRUD | 8 |
| Homework UI | 6 |
| Day-off system | 6 |
| Integration | 6 |
| **Total** | **40 hours** |

---

## Phase 5: Quiz System & Polish
**Duration**: 2-3 weeks (50-60 hours)
**Goal**: Complete quiz functionality and production-ready polish

### 5.1 Features to Implement

#### A. Quiz System - Auto-Generated
- Quiz generated when juz is completed
- Multiple choice questions
- Questions based on "what comes next" pattern
- Shows ayah, asks for following ayah
- 10-20 questions per quiz

#### B. Quiz System - Teacher Assigned
- Teacher can create custom quiz
- Select question type (multiple choice, fill blank)
- Select ayah range
- Set passing grade

#### C. Quiz Taking Experience
- Progress bar showing questions completed
- Timer (optional)
- Audio playback for questions
- Immediate feedback (correct/wrong)
- Final score with breakdown

#### D. Audio Integration
- Add audio player to Quran reader
- Reciter selection (5 popular reciters)
- Playback controls (play, pause, speed, repeat)
- Auto-scroll with audio (optional)

#### E. Notifications System
- Push notifications via FCM
- Daily reminder at configured time
- "Parent signed your work" notification
- "Teacher graded your lesson" notification
- "New lesson assigned" notification

#### F. Production Polish
- Loading states for all async operations
- Error handling with user-friendly messages
- Offline detection and warning
- Performance optimization (code splitting)
- Accessibility improvements (ARIA labels, keyboard nav)

### 5.2 New Components

```
src/
├── components/
│   ├── quiz/
│   │   ├── QuizCard.tsx               // Display quiz question
│   │   ├── QuizProgress.tsx           // Progress bar
│   │   ├── QuizOptions.tsx            // Multiple choice options
│   │   ├── QuizResult.tsx             // Final score display
│   │   ├── QuizTimer.tsx              // Optional timer
│   │   └── QuizCreateForm.tsx         // Teacher creates quiz
│   ├── audio/
│   │   ├── AudioPlayer.tsx            // Main player component
│   │   ├── ReciterSelector.tsx        // Choose reciter
│   │   └── PlaybackControls.tsx       // Play, pause, speed
│   └── notifications/
│       ├── NotificationBell.tsx       // Bell icon with badge
│       ├── NotificationList.tsx       // Dropdown list
│       └── NotificationSettings.tsx   // Preferences
└── pages/
    └── student/
        ├── QuizPage.tsx               // Take a quiz
        └── QuizHistoryPage.tsx        // Past quizzes
```

### 5.3 Database Additions

```
quizzes/{quizId}:                      // NEW collection
  id: string,
  studentId: string,
  teacherId: string | null,            // null = auto-generated
  juzNumber: number,
  type: 'auto' | 'teacher_assigned',
  questions: [{
    id: string,
    prompt: string,
    options: string[],
    correctAnswer: number,
    studentAnswer: number | null,
    surahRef: { surah: number, ayah: number }
  }],
  score: number | null,
  totalQuestions: number,
  startedAt: Timestamp | null,
  completedAt: Timestamp | null,
  timeSpent: number | null

notifications/{notificationId}:        // NEW collection
  userId: string,
  type: 'lesson_assigned' | 'lesson_graded' | 'parent_signed' | 'reminder',
  title: string,
  body: string,
  read: boolean,
  createdAt: Timestamp,
  metadata: { lessonId?: string, ... }
```

### 5.4 Success Criteria

- [ ] Quiz auto-generates when juz completed
- [ ] Student can take multiple-choice quiz
- [ ] Quiz shows immediate feedback
- [ ] Final score saved and displayed
- [ ] Teacher can create custom quiz
- [ ] Audio plays for Quran verses
- [ ] Reciter can be changed
- [ ] Push notifications work
- [ ] All loading states implemented
- [ ] No console errors in production
- [ ] Lighthouse score > 80

### 5.5 Estimated Effort

| Task | Hours |
|------|-------|
| Quiz auto-generation logic | 10 |
| Quiz UI components | 12 |
| Teacher quiz creation | 8 |
| Audio player integration | 10 |
| Notifications system | 10 |
| Polish and optimization | 10 |
| **Total** | **60 hours** |

---

## Technical Architecture

### Component Hierarchy

```
App
├── AuthProvider
│   ├── PublicRoutes
│   │   ├── Login
│   │   └── Signup
│   └── ProtectedRoutes
│       ├── StudentRoutes
│       │   ├── StudentDashboard
│       │   ├── DailyTrackerPage
│       │   ├── QuranPage
│       │   ├── MemorizationPage
│       │   ├── HomeworkPage
│       │   └── QuizPage
│       ├── TeacherRoutes
│       │   ├── TeacherDashboard
│       │   ├── StudentDetailPage
│       │   ├── AssignLessonPage
│       │   ├── GradingPage
│       │   └── QuranPage
│       └── ParentRoutes
│           ├── ParentDashboard
│           ├── ChildDetailPage
│           └── ReviewPage
```

### State Management Strategy

```typescript
// Zustand stores
stores/
├── useAuthStore.ts        // Current user, auth state
├── useLessonStore.ts      // Current lesson, lesson history
├── useTrackerStore.ts     // Daily tracker state
├── useQuranStore.ts       // Current surah, verses, settings
└── useQuizStore.ts        // Quiz progress, answers

// React Query for server state
- Fetch lessons: useQuery(['lessons', studentId])
- Fetch daily tracker: useQuery(['tracker', studentId, date])
- Fetch memorization: useQuery(['memorization', studentId])
```

### Service Layer Pattern

```typescript
// All Firestore operations go through services
services/
├── auth.service.ts        // EXISTING
├── quran.service.ts       // EXISTING
├── student.service.ts     // NEW
├── teacher.service.ts     // NEW
├── parent.service.ts      // NEW
├── lesson.service.ts      // NEW
├── dailyTracker.service.ts // NEW
├── homework.service.ts    // NEW
├── quiz.service.ts        // NEW
├── dayOff.service.ts      // NEW
└── notification.service.ts // NEW
```

---

## Firestore Security Rules

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {

    // Users can read/write their own profile
    match /users/{userId} {
      allow read, write: if request.auth.uid == userId;
    }

    // Students
    match /students/{studentId} {
      allow read: if request.auth.uid == studentId
                  || isTeacherOf(studentId)
                  || isParentOf(studentId);
      allow write: if request.auth.uid == studentId;
    }

    // Lessons
    match /lessons/{lessonId} {
      allow read: if request.auth.uid == resource.data.studentId
                  || request.auth.uid == resource.data.teacherId
                  || isParentOf(resource.data.studentId);
      allow create: if request.auth.uid == request.resource.data.teacherId;
      allow update: if request.auth.uid == resource.data.studentId
                    || request.auth.uid == resource.data.teacherId;
    }

    // Daily Tracker
    match /dailyTracker/{trackerId} {
      allow read: if request.auth.uid == resource.data.studentId
                  || isTeacherOf(resource.data.studentId)
                  || isParentOf(resource.data.studentId);
      allow write: if request.auth.uid == resource.data.studentId
                   || isParentOf(resource.data.studentId); // for signature
    }

    // Helper functions
    function isTeacherOf(studentId) {
      return get(/databases/$(database)/documents/students/$(studentId)).data.teacherId == request.auth.uid;
    }

    function isParentOf(studentId) {
      return request.auth.uid in get(/databases/$(database)/documents/students/$(studentId)).data.parentIds;
    }
  }
}
```

---

## Timeline Summary

| Phase | Duration | Focus | Cumulative Hours |
|-------|----------|-------|-----------------|
| Phase 1 | 2 weeks | Core Foundation (MVP) | 46 hours |
| Phase 2 | 2 weeks | Teacher Portal & Grading | 84 hours |
| Phase 3 | 1.5 weeks | Parent Portal & Signatures | 116 hours |
| Phase 4 | 2 weeks | Memorization & Homework | 156 hours |
| Phase 5 | 2.5 weeks | Quiz System & Polish | 216 hours |
| **Total** | **10 weeks** | **Full Feature Set** | **~216 hours** |

---

## Risk Assessment

### Technical Risks

| Risk | Likelihood | Impact | Mitigation |
|------|------------|--------|------------|
| Firebase quota limits | Low | Medium | Monitor usage, optimize queries |
| Audio loading slow | Medium | Medium | Lazy load, show loading states |
| Offline data sync | Medium | High | Use Firestore persistence |
| Push notification issues | Medium | Medium | Graceful fallback to in-app |

### User Experience Risks

| Risk | Likelihood | Impact | Mitigation |
|------|------------|--------|------------|
| Complex onboarding | Medium | High | Add tutorial/walkthrough |
| Arabic text rendering | Low | High | Test on multiple devices |
| Signature not working (touch) | Medium | Medium | Test on iPad specifically |

---

## Definition of Done (Each Phase)

- [ ] All features implemented per specification
- [ ] Manual testing on desktop Chrome
- [ ] Manual testing on iPad Safari (primary target)
- [ ] No TypeScript errors
- [ ] No console errors/warnings
- [ ] Data persists to Firestore correctly
- [ ] Loading states shown for async operations
- [ ] Error messages shown for failures
- [ ] Code reviewed (or self-reviewed)
- [ ] Documentation updated if needed

---

## Next Steps

1. **Get User Approval** on this plan
2. **Start Phase 1** with Firebase services layer
3. **Create invite code system** for relationships
4. **Build daily tracker** with prayer checkboxes
5. **Build lesson assignment** flow

---

## Design Reference

**Theme URL**: https://schools.macnet.ca/ogs/
**Note**: Unable to access this URL. Please provide screenshots or describe the design if specific styling is required.

**Current Theme**:
- Primary: Green (#2F855A)
- Background: White (#FFFFFF)
- Text: Black (#1A202C)
- Accent: Mint (#68D391)

---

**Document Status**: Ready for Review
**Last Updated**: 2026-02-02
**Author**: Product Manager Agent
