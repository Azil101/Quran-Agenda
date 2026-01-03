# Quran Academy Tracker - Project Plan

## Project Overview
A comprehensive Quran memorization, tracking, and learning management system designed for students, teachers, and parents.

## Tech Stack

### Phase 1: Web Application (Current)
- **Frontend**: React 18 + TypeScript
- **Styling**: Tailwind CSS + shadcn/ui components
- **State Management**: Zustand + React Query
- **Backend**: Firebase
  - Authentication (role-based: student/teacher/parent)
  - Firestore Database
  - Cloud Storage (audio files, documents)
  - Cloud Functions (notifications, scheduled tasks)
  - Cloud Messaging (notifications)
- **Quran APIs**:
  - Quran.com API (primary)
  - Tarteel API (if available)
- **Audio**: Howler.js for audio playback
- **Build Tool**: Vite
- **Deployment**: Firebase Hosting

### Phase 2: iOS Mobile App
- React Native + Expo
- Share business logic with web
- Native notifications

### Phase 3: Desktop Application
- Electron + React
- Share 90%+ code with web version

## User Roles & Relationships

### Student
- Has ONE teacher
- Can have multiple parents
- Tracks personal progress
- Receives lessons from teacher
- Completes daily work
- Takes quizzes
- Earns day-offs

### Teacher
- Can have MULTIPLE students
- Assigns daily lessons (old revision + new material)
- Reviews student progress
- Grades student work
- Sets custom schedules (default: daily)

### Parent
- Can have MULTIPLE children (students)
- Reviews completed work
- Provides digital signatures
- Receives notifications
- Views progress reports

## Core Features by Phase

### Phase 1: Foundation & Authentication (Week 1-2)
**Deliverables:**
- [x] Project setup with React + TypeScript + Vite
- [ ] Firebase configuration
- [ ] Authentication system
  - Email/password login
  - Role selection (student/teacher/parent)
  - Role-based routing
- [ ] Database schema design
- [ ] Basic UI layout with navigation
- [ ] Theme system (green/white/black)

**Database Collections:**
```
users/
  - uid, email, role, displayName, createdAt

students/
  - uid, teacherId, parentIds[], profile, settings

teachers/
  - uid, studentIds[], profile

parents/
  - uid, childrenIds[], profile

lessons/
  - id, studentId, teacherId, date, type (old/new)
  - oldRevision: { fromSurah, toSurah, fromAyah, toAyah }
  - newLesson: { fromSurah, toSurah, fromAyah, toAyah }
  - status, grade, mistakes, timeSpent

dailyTracker/
  - id, studentId, date
  - quranTime, prayers[], completed, parentSignature
  - statistics: { ayahsMemorized, surahs, hizbs, juz }

quizzes/
  - id, studentId, juzNumber, type (auto/manual)
  - questions[], answers[], score, mistakes

homework/
  - id, studentId, subject, description, dueDate, completed

dayOffs/
  - id, studentId, date, reason, approved
```

### Phase 2: Student Core Features (Week 3-4)
**Deliverables:**
- [ ] Student Dashboard
  - Overview/summary cards
  - Today's agenda
  - Progress charts
  - Motivation quotes (daily rotation)
- [ ] Daily Tracker
  - Time logging for Quran study
  - Prayer checkboxes (5 daily prayers)
  - Manual entry and timer option
- [ ] Memorization Tracker
  - Total ayahs memorized
  - Surahs completed
  - Hizbs completed
  - Juz completed (with visual progress)
- [ ] Grading System
  - Toggle between A/B/C/INC and 1-5 stars
  - Manual self-assessment
  - Automatic based on mistakes
  - Historical grade view
- [ ] Basic Quran Reader
  - Uthmani script rendering
  - Surah/Ayah navigation
  - Translation toggle (hidden by default)
  - Bookmark system

### Phase 3: Teacher Dashboard (Week 5)
**Deliverables:**
- [ ] Teacher Dashboard
  - Student list with status overview
  - Quick assign interface
  - Progress monitoring
- [ ] Lesson Assignment System
  - Daily assignment form
  - Old revision (From Surah X:Y → To Surah A:B)
  - New lesson assignment
  - Custom scheduling
  - Bulk assign to multiple students
- [ ] Student Progress View
  - Individual student detail page
  - Historical performance
  - Grade analytics
  - Time spent statistics
- [ ] Grading Interface
  - Review submitted work
  - Assign grades (A/B/C/INC or stars)
  - Add comments/notes
  - Mark mistakes

### Phase 4: Parent Portal (Week 6)
**Deliverables:**
- [ ] Parent Dashboard
  - All children overview
  - Today's summary for each child
  - Pending reviews
- [ ] Daily Review System
  - View completed work
  - Digital signature functionality
  - Approve/comment on performance
- [ ] Notifications
  - Daily completion notifications
  - Weekly summary emails
  - Missed work alerts
- [ ] Progress Reports
  - Weekly/monthly reports
  - Downloadable PDF reports
  - Graphical analytics

### Phase 5: Advanced Student Features (Week 7-8)
**Deliverables:**
- [ ] Quiz/Testing System
  - Auto-generated quizzes after Juz completion
  - Multiple choice questions
  - Text-based input
  - Audio-based testing option
  - Immediate feedback
  - Score tracking
- [ ] Mistake Counter
  - Track mistakes per surah/juz
  - Categorize mistake types
  - Identify weak areas
  - Improvement tracking
- [ ] Juz Completion Tracking
  - Visual progress (30 juz grid)
  - Completion celebrations
  - Certificate generation
  - Auto day-off reward
- [ ] Day Off System
  - Automatic day-off after juz completion
  - Notifications disabled for that day
  - Calendar view of earned days off
  - Manual override option
- [ ] Reminder System
  - Customizable reminder times
  - Smart reminders based on schedule
  - Snooze functionality
  - Multiple reminder types (Quran, homework, prayers)

### Phase 6: Quran Enhancement (Week 9-10)
**Deliverables:**
- [ ] Audio Integration
  - Top reciter selection (Saad al-Ghamidi, etc.)
  - Playback controls
  - Repeat/loop options
  - Speed control
  - Auto-scroll with audio
- [ ] Offline Mode
  - Download surahs for offline use
  - Cache management
  - Sync when online
- [ ] Revision Mode
  - "Test prep" interface
  - Hide/reveal ayahs
  - Practice mode
  - Spaced repetition algorithm
- [ ] Quran Facts
  - Daily interesting facts
  - Fact categories
  - Shareable facts
- [ ] Quran Questions Bank
  - Categorized questions
  - Difficulty levels
  - Tafsir references
  - Answer explanations

### Phase 7: Productivity Features (Week 11)
**Deliverables:**
- [ ] Homework/To-Do List
  - Subject categorization
  - Due date tracking
  - Priority levels
  - Completion tracking
  - Integration with notifications
- [ ] Notification System
  - Missed Quran work alerts
  - Homework reminders
  - Upcoming test notifications
  - Achievement notifications
  - Customizable notification preferences
- [ ] Theme Customization
  - Green/White/Black color schemes
  - Dark/Light mode toggle
  - Custom accent colors
  - Accessibility options
- [ ] Analytics Dashboard
  - Streak tracking
  - Best/worst days analysis
  - Time-of-day patterns
  - Comparison with goals
  - Exportable reports

### Phase 8: Polish & Testing (Week 12)
**Deliverables:**
- [ ] UI/UX Refinements
  - Responsive design testing
  - Animation polish
  - Loading states
  - Error handling
- [ ] Performance Optimization
  - Code splitting
  - Lazy loading
  - Image optimization
  - Caching strategy
- [ ] Testing
  - Unit tests (Jest)
  - Integration tests
  - E2E tests (Playwright)
  - User acceptance testing
- [ ] Documentation
  - User guides for each role
  - Video tutorials
  - FAQ section
  - Help center
- [ ] Deployment
  - Firebase hosting setup
  - Custom domain
  - SSL certificate
  - Analytics integration

## Database Schema Details

### Users Collection
```typescript
interface User {
  uid: string;
  email: string;
  displayName: string;
  role: 'student' | 'teacher' | 'parent';
  profilePicture?: string;
  createdAt: Timestamp;
  updatedAt: Timestamp;
  settings: {
    notifications: boolean;
    emailNotifications: boolean;
    theme: 'light' | 'dark';
    colorScheme: 'green' | 'default';
    language: 'en' | 'ar';
  };
}
```

### Students Collection
```typescript
interface Student {
  uid: string; // matches user uid
  teacherId: string;
  parentIds: string[];
  profile: {
    grade?: string;
    school?: string;
    startDate: Timestamp;
  };
  memorization: {
    totalAyahs: number;
    completedSurahs: number[];
    completedHizbs: number[];
    completedJuz: number[];
    currentJuz: number;
    currentProgress: number; // percentage
  };
  statistics: {
    totalTimeSpent: number; // minutes
    totalMistakes: number;
    averageGrade: number;
    currentStreak: number;
    longestStreak: number;
  };
  preferences: {
    preferredReciter: string;
    quizDifficulty: 'easy' | 'medium' | 'hard';
    gradingSystem: 'letter' | 'stars';
    reminderTimes: string[];
  };
}
```

### Teachers Collection
```typescript
interface Teacher {
  uid: string;
  studentIds: string[];
  profile: {
    school?: string;
    specialization?: string;
    experience?: number;
  };
  settings: {
    defaultAssignmentType: 'daily' | 'weekly' | 'custom';
    autoGrading: boolean;
  };
}
```

### Parents Collection
```typescript
interface Parent {
  uid: string;
  childrenIds: string[];
  profile: {
    phone?: string;
  };
  notificationPreferences: {
    dailyReview: boolean;
    weeklyReport: boolean;
    achievements: boolean;
    missedWork: boolean;
  };
}
```

### Lessons Collection
```typescript
interface Lesson {
  id: string;
  studentId: string;
  teacherId: string;
  date: Timestamp;
  type: 'daily' | 'test' | 'review';

  oldRevision?: {
    fromSurah: number;
    fromAyah: number;
    toSurah: number;
    toAyah: number;
    completed: boolean;
    grade?: 'A' | 'B' | 'C' | 'INC' | number; // 1-5 stars
    mistakes?: number;
    timeSpent?: number;
    notes?: string;
  };

  newLesson?: {
    fromSurah: number;
    fromAyah: number;
    toSurah: number;
    toAyah: number;
    completed: boolean;
    grade?: 'A' | 'B' | 'C' | 'INC' | number;
    mistakes?: number;
    timeSpent?: number;
    notes?: string;
  };

  status: 'assigned' | 'in_progress' | 'completed' | 'reviewed';
  teacherReview?: {
    reviewedAt: Timestamp;
    comments: string;
    finalGrade: string | number;
  };
  parentReview?: {
    reviewedAt: Timestamp;
    signedBy: string;
    signature: string; // digital signature
    comments?: string;
  };
}
```

### DailyTracker Collection
```typescript
interface DailyTracker {
  id: string;
  studentId: string;
  date: Timestamp;

  prayers: {
    fajr: boolean;
    dhuhr: boolean;
    asr: boolean;
    maghrib: boolean;
    isha: boolean;
  };

  quranTime: number; // minutes
  lessonIds: string[]; // references to lessons completed today

  homework: {
    id: string;
    subject: string;
    completed: boolean;
  }[];

  evaluation: {
    selfGrade?: 'A' | 'B' | 'C' | 'INC' | number;
    teacherGrade?: 'A' | 'B' | 'C' | 'INC' | number;
    notes?: string;
  };

  parentSignature?: {
    signedAt: Timestamp;
    parentId: string;
    signature: string;
  };

  completed: boolean;
}
```

### Quizzes Collection
```typescript
interface Quiz {
  id: string;
  studentId: string;
  juzNumber: number;
  type: 'auto' | 'manual' | 'teacher_assigned';
  mode: 'multiple_choice' | 'text' | 'audio';

  questions: {
    id: string;
    text: string;
    type: 'multiple_choice' | 'fill_blank' | 'audio_recite';
    options?: string[];
    correctAnswer: string;
    studentAnswer?: string;
    correct?: boolean;
    surahRef?: { surah: number; ayah: number };
  }[];

  score: number;
  totalQuestions: number;
  mistakes: number;
  timeSpent: number;
  completedAt?: Timestamp;

  feedback?: string;
}
```

### Homework Collection
```typescript
interface Homework {
  id: string;
  studentId: string;
  subject: string;
  description: string;
  dueDate: Timestamp;
  priority: 'low' | 'medium' | 'high';
  completed: boolean;
  completedAt?: Timestamp;
  notes?: string;
}
```

### DayOffs Collection
```typescript
interface DayOff {
  id: string;
  studentId: string;
  date: Timestamp;
  reason: 'juz_completion' | 'teacher_approved' | 'parent_approved';
  metadata?: {
    juzNumber?: number;
    approvedBy?: string;
  };
  active: boolean;
}
```

## API Integrations

### Quran.com API
- **Base URL**: `https://api.quran.com/api/v4/`
- **Endpoints**:
  - `/chapters` - List all surahs
  - `/verses/by_chapter/{chapter_number}` - Get verses
  - `/quran/verses/uthmani` - Uthmani script
  - `/resources/recitations` - Audio reciters
  - `/chapter_recitations/{reciter_id}/{chapter_number}` - Audio files

### Tarteel API (if available)
- Research needed for API access
- Potentially for AI-assisted recitation checking

## UI/UX Design Principles

### Color Scheme (Default: Green Theme)
```css
/* Green Theme */
--primary: #2F855A (Green)
--secondary: #38A169 (Light Green)
--background: #FFFFFF (White)
--surface: #F7FAFC (Light Gray)
--text: #1A202C (Near Black)
--accent: #68D391 (Mint Green)

/* Black accents for text and borders */
--text-primary: #000000
--border: #E2E8F0
```

### Typography
- **Arabic Text**: Amiri, Scheherazade New, or similar
- **English Text**: Inter, System UI
- **Headers**: Bold, larger sizing
- **Body**: Regular weight, comfortable line height

### Component Library: shadcn/ui
- Pre-built accessible components
- Customizable with Tailwind
- Dark mode support built-in

## Development Workflow

### Git Branching Strategy
- `main` - Production-ready code
- `develop` - Integration branch
- `feature/*` - Feature branches
- `bugfix/*` - Bug fixes
- `release/*` - Release preparation

### Code Quality
- ESLint + Prettier
- Husky pre-commit hooks
- TypeScript strict mode
- Component testing with React Testing Library

### Deployment Pipeline
1. Push to GitHub
2. GitHub Actions runs tests
3. Build for production
4. Deploy to Firebase Hosting
5. Smoke tests
6. Notify team

## Success Metrics

### User Engagement
- Daily active users
- Time spent per session
- Completion rates for daily lessons
- Quiz participation

### Learning Outcomes
- Average memorization rate
- Mistake reduction over time
- Juz completion rate
- Grade improvements

### System Performance
- Page load time < 2s
- API response time < 500ms
- 99.9% uptime
- Zero data loss

## Future Enhancements (Post-Launch)

### Advanced Features
- AI-powered recitation analysis (Tarteel integration)
- Gamification (badges, leaderboards)
- Social features (study groups, competitions)
- Advanced analytics with ML insights
- Multi-language support
- Accessibility improvements (screen reader, high contrast)
- Apple Watch app integration
- Widget for iOS

### Monetization (Optional)
- Free tier with core features
- Premium tier with advanced analytics
- School/institutional licenses
- Ad-free experience

## Timeline Summary

| Phase | Duration | Deliverables |
|-------|----------|--------------|
| 1 | 2 weeks | Auth, DB, Basic UI |
| 2 | 2 weeks | Student core features |
| 3 | 1 week | Teacher dashboard |
| 4 | 1 week | Parent portal |
| 5 | 2 weeks | Advanced features (quiz, mistakes) |
| 6 | 2 weeks | Quran enhancements |
| 7 | 1 week | Productivity features |
| 8 | 1 week | Polish & testing |
| **Total** | **12 weeks** | **Web app launch** |

## Next Steps

1. ✅ Create project structure
2. ✅ Initialize React + TypeScript + Vite
3. ✅ Set up Firebase project
4. ✅ Implement authentication
5. ✅ Design initial UI mockups
6. Begin Phase 1 development

---

**Last Updated**: 2026-01-03
**Version**: 1.0
**Status**: Planning Complete → Ready for Development
