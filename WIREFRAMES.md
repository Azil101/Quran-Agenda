# Quran Academy Tracker - UI Wireframes

This document contains wireframes and UI specifications for all pages in the Quran Academy Tracker application.

## Color Palette

```
Primary Green:   #2F855A (hsl(152, 69%, 31%))
Light Green:     #38A169 (hsl(143, 69%, 42%))
Mint Green:      #68D391 (hsl(142, 52%, 70%))
White:           #FFFFFF
Black:           #000000
Light Gray:      #F7FAFC
Border Gray:     #E2E8F0
```

---

## 1. Authentication Pages

### 1.1 Login Page (`/login`)

```
┌─────────────────────────────────────────────────────────┐
│                                                         │
│                                                         │
│                    ┌───────────┐                        │
│                    │   🕌      │  (Quran Icon)          │
│                    │  Green    │                        │
│                    │  Circle   │                        │
│                    └───────────┘                        │
│                                                         │
│                  Welcome Back                           │
│           Sign in to your Quran Academy account         │
│                                                         │
│   ┌───────────────────────────────────────────────┐   │
│   │  📧  Email                                     │   │
│   │     [_________________________________]        │   │
│   └───────────────────────────────────────────────┘   │
│                                                         │
│   ┌───────────────────────────────────────────────┐   │
│   │  🔒  Password                                  │   │
│   │     [_________________________________]        │   │
│   └───────────────────────────────────────────────┘   │
│                                                         │
│           ┌─────────────────────────┐                  │
│           │      Sign In            │  (Green Button)  │
│           └─────────────────────────┘                  │
│                                                         │
│        Don't have an account? Sign up                  │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

**Features:**
- Gradient background (green/white/black theme)
- Centered card with shadow
- Icon inputs for email and password
- Loading state on button
- Error message display above inputs
- Link to signup page

---

### 1.2 Signup Page (`/signup`)

```
┌─────────────────────────────────────────────────────────┐
│                                                         │
│                    ┌───────────┐                        │
│                    │   🕌      │  (Quran Icon)          │
│                    │  Green    │                        │
│                    │  Circle   │                        │
│                    └───────────┘                        │
│                                                         │
│                Create Account                           │
│          Join Quran Academy and start your journey      │
│                                                         │
│   ┌───────────────────────────────────────────────┐   │
│   │  👤  Full Name                                 │   │
│   │     [_________________________________]        │   │
│   └───────────────────────────────────────────────┘   │
│                                                         │
│   ┌───────────────────────────────────────────────┐   │
│   │  📧  Email                                     │   │
│   │     [_________________________________]        │   │
│   └───────────────────────────────────────────────┘   │
│                                                         │
│   ┌───────────────────────────────────────────────┐   │
│   │  I am a...                                     │   │
│   │     [▼ Student    ]                            │   │
│   │     Options: Student / Teacher / Parent        │   │
│   └───────────────────────────────────────────────┘   │
│                                                         │
│   ┌───────────────────────────────────────────────┐   │
│   │  🔒  Password                                  │   │
│   │     [_________________________________]        │   │
│   └───────────────────────────────────────────────┘   │
│                                                         │
│   ┌───────────────────────────────────────────────┐   │
│   │  ✓  Confirm Password                           │   │
│   │     [_________________________________]        │   │
│   └───────────────────────────────────────────────┘   │
│                                                         │
│           ┌─────────────────────────┐                  │
│           │   Create Account        │  (Green Button)  │
│           └─────────────────────────┘                  │
│                                                         │
│        Already have an account? Sign in                │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

**Features:**
- Role selection dropdown (Student/Teacher/Parent)
- Password confirmation field
- All fields with icons
- Form validation
- Redirect to appropriate dashboard after signup

---

## 2. Student Dashboard (`/student/dashboard`)

### 2.1 Main Dashboard View

```
┌─────────────────────────────────────────────────────────────────────────────┐
│  [☰ Menu]    Quran Academy Tracker                        [🔔] [👤] [⚙️]  │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  As-salamu Alaykum, Ahmed! 👋                         [Sign Out]           │
│  Ready to continue your Quran journey today?                               │
│                                                                             │
│  ┌──────────────────┐  ┌──────────────────┐  ┌──────────────────┐         │
│  │ 📊 Today         │  │ 🎯 Current Juz   │  │ 🔥 Streak        │         │
│  │                  │  │                  │  │                  │         │
│  │   45 minutes     │  │     Juz 15       │  │    12 days       │         │
│  │   Quran time     │  │     65%          │  │    🔥🔥🔥        │         │
│  │                  │  │   [Progress Bar] │  │                  │         │
│  └──────────────────┘  └──────────────────┘  └──────────────────┘         │
│                                                                             │
│  ┌────────────────────────────────────────────────────────────────────┐    │
│  │  📖 TODAY'S LESSON                                                 │    │
│  │  ────────────────────────────────────────────────────────────────  │    │
│  │                                                                    │    │
│  │  Old Revision (Repetition):                                       │    │
│  │  ┌─────────────────────────────────────────────────────────┐      │    │
│  │  │  Surah Al-Baqarah (2:142) → Surah Al-Baqarah (2:155)    │      │    │
│  │  │  Status: Not Started                        [▶ Start]   │      │    │
│  │  │  Time: 0 min  |  Mistakes: 0  |  Grade: --             │      │    │
│  │  └─────────────────────────────────────────────────────────┘      │    │
│  │                                                                    │    │
│  │  New Lesson:                                                       │    │
│  │  ┌─────────────────────────────────────────────────────────┐      │    │
│  │  │  Surah Al-Baqarah (2:156) → Surah Al-Baqarah (2:160)    │      │    │
│  │  │  Status: Not Started                        [▶ Start]   │      │    │
│  │  │  Time: 0 min  |  Mistakes: 0  |  Grade: --             │      │    │
│  │  └─────────────────────────────────────────────────────────┘      │    │
│  │                                                                    │    │
│  │  Assigned by: Ustadh Ibrahim  |  Due: Today                       │    │
│  └────────────────────────────────────────────────────────────────────┘    │
│                                                                             │
│  ┌──────────────────┐  ┌──────────────────┐  ┌──────────────────┐         │
│  │ 🕌 Prayer Track  │  │ 📚 Memorized     │  │ ✅ Homework      │         │
│  │                  │  │                  │  │                  │         │
│  │  ✓ Fajr          │  │  1,245 Ayahs     │  │  3 pending       │         │
│  │  ✓ Dhuhr         │  │  12 Surahs       │  │  5 completed     │         │
│  │  ✓ Asr           │  │  6 Hizbs         │  │                  │         │
│  │  □ Maghrib       │  │  2.5 Juz         │  │  [View All →]    │         │
│  │  □ Isha          │  │                  │  │                  │         │
│  └──────────────────┘  └──────────────────┘  └──────────────────┘         │
│                                                                             │
│  ┌────────────────────────────────────────────────────────────────────┐    │
│  │  💡 Quran Fact of the Day                                          │    │
│  │  ────────────────────────────────────────────────────────────────  │    │
│  │  Did you know? The longest verse in the Quran is Ayat al-Dayn     │    │
│  │  (Surah Al-Baqarah 2:282), which deals with financial contracts.  │    │
│  └────────────────────────────────────────────────────────────────────┘    │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

**Key Features:**
- **Top Stats Cards**: Time today, current Juz progress, streak
- **Today's Lesson Card**: Shows old revision and new lesson from teacher
- **Prayer Tracker**: Checkboxes for 5 daily prayers
- **Memorization Stats**: Total ayahs, surahs, hizbs, juz completed
- **Homework Widget**: Quick view of pending homework
- **Daily Quran Fact**: Rotating interesting facts

---

### 2.2 Daily Tracker Page (`/student/tracker`)

```
┌─────────────────────────────────────────────────────────────────────────────┐
│  [← Back]    Daily Tracker                                    Jan 3, 2026  │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  ┌────────────────────────────────────────────────────────────────────┐    │
│  │  ⏱️  QURAN TIME TRACKING                                            │    │
│  │  ────────────────────────────────────────────────────────────────  │    │
│  │                                                                    │    │
│  │     ┌──────────────┐                                               │    │
│  │     │   00:45:32   │  (Large Timer Display)                        │    │
│  │     └──────────────┘                                               │    │
│  │                                                                    │    │
│  │  [▶ Start]  [⏸ Pause]  [⏹ Stop]  [🔄 Reset]                        │    │
│  │                                                                    │    │
│  │  Or enter manually:  [___] hours  [___] minutes                   │    │
│  │                                                                    │    │
│  │  Today's Total: 45 minutes  |  This Week: 5.2 hours               │    │
│  └────────────────────────────────────────────────────────────────────┘    │
│                                                                             │
│  ┌────────────────────────────────────────────────────────────────────┐    │
│  │  🕌 PRAYER TRACKER                                                  │    │
│  │  ────────────────────────────────────────────────────────────────  │    │
│  │                                                                    │    │
│  │  [✓] Fajr      [✓] Dhuhr      [✓] Asr      [□] Maghrib   [□] Isha │    │
│  │                                                                    │    │
│  │  Completion: 3/5 prayers  |  This Week: 32/35 (91%)               │    │
│  └────────────────────────────────────────────────────────────────────┘    │
│                                                                             │
│  ┌────────────────────────────────────────────────────────────────────┐    │
│  │  ⭐ SELF EVALUATION                                                 │    │
│  │  ────────────────────────────────────────────────────────────────  │    │
│  │                                                                    │    │
│  │  How did you do today?                                             │    │
│  │                                                                    │    │
│  │  Letter Grade:   [A]  [B]  [C]  [INC]                             │    │
│  │                                                                    │    │
│  │  Star Rating:    ⭐ ⭐ ⭐ ⭐ ☆                                       │    │
│  │                                                                    │    │
│  │  Notes:                                                            │    │
│  │  ┌──────────────────────────────────────────────────────────┐     │    │
│  │  │ Today I memorized well but made some mistakes in...     │     │    │
│  │  │                                                          │     │    │
│  │  └──────────────────────────────────────────────────────────┘     │    │
│  │                                                                    │    │
│  │                                   [Save Evaluation]                │    │
│  └────────────────────────────────────────────────────────────────────┘    │
│                                                                             │
│  ┌────────────────────────────────────────────────────────────────────┐    │
│  │  📊 WEEKLY OVERVIEW (Sunday - Saturday)                            │    │
│  │  ────────────────────────────────────────────────────────────────  │    │
│  │                                                                    │    │
│  │  Sun  Mon  Tue  Wed  Thu  Fri  Sat                                │    │
│  │  [✓]  [✓]  [✓]  [✓]  [✓]  [✓]  [ ]  ← Completion                  │    │
│  │   A    B    A    A    B    A    --   ← Grades                     │    │
│  │  45m  30m  60m  45m  40m  50m  0m   ← Time                        │    │
│  │                                                                    │    │
│  │  Streak: 🔥 12 days  |  Best Day: Wednesday (60 min)               │    │
│  └────────────────────────────────────────────────────────────────────┘    │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

**Features:**
- Timer for tracking Quran study time
- Manual time entry option
- Prayer checkboxes with weekly stats
- Self-evaluation (letter grades + star rating)
- Notes section
- Weekly overview calendar

---

### 2.3 Quran Reader (`/student/quran`)

```
┌─────────────────────────────────────────────────────────────────────────────┐
│  [← Back]    Quran Reader                                  [🔊] [⚙️] [📖]  │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  ┌────────────────────────────────────────────────────────────────────┐    │
│  │  Surah: [▼ Al-Fatihah (1)    ]  Ayah: [▼ 1        ] [Go]          │    │
│  │                                                                    │    │
│  │  [📑 Revision Mode]  [🎧 Audio: Saad al-Ghamidi]  [📥 Download]    │    │
│  └────────────────────────────────────────────────────────────────────┘    │
│                                                                             │
│  ┌────────────────────────────────────────────────────────────────────┐    │
│  │                         بِسْمِ اللَّهِ                              │    │
│  │                      الرَّحْمَٰنِ الرَّحِيمِ                        │    │
│  │                                                                    │    │
│  │  [Arabic text in large Uthmani script - Right to Left]            │    │
│  │                                                                    │    │
│  │  ┌──────────────────────────────────────────────────────────┐     │    │
│  │  │  Translation (tap to show):                             │     │    │
│  │  │  "In the name of Allah, the Entirely Merciful,          │     │    │
│  │  │   the Especially Merciful."                             │     │    │
│  │  └──────────────────────────────────────────────────────────┘     │    │
│  │                                                                    │    │
│  └────────────────────────────────────────────────────────────────────┘    │
│                                                                             │
│  ┌────────────────────────────────────────────────────────────────────┐    │
│  │  🎵 AUDIO CONTROLS                                                  │    │
│  │  ────────────────────────────────────────────────────────────────  │    │
│  │                                                                    │    │
│  │  Reciter: [▼ Saad al-Ghamidi     ]                                │    │
│  │                                                                    │    │
│  │  [⏮] [▶] [⏭]     ────●──────────  3:45 / 5:20                     │    │
│  │                                                                    │    │
│  │  Speed: [1x]  [1.5x]  [2x]    |    [🔁 Repeat]  [📱 Auto-Scroll]  │    │
│  └────────────────────────────────────────────────────────────────────┘    │
│                                                                             │
│  ┌────────────────────────────────────────────────────────────────────┐    │
│  │  📝 REVISION MODE                                                   │    │
│  │  ────────────────────────────────────────────────────────────────  │    │
│  │                                                                    │    │
│  │  [👁️ Hide Ayahs]  Test yourself by hiding portions                │    │
│  │                                                                    │    │
│  │  Mistakes this session: 3                                          │    │
│  │  [+] Mark Mistake                                                  │    │
│  └────────────────────────────────────────────────────────────────────┘    │
│                                                                             │
│  [← Previous Ayah]                                    [Next Ayah →]        │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

**Features:**
- Surah and Ayah selection dropdowns
- Large Uthmani script display (RTL)
- Collapsible translation
- Audio player with multiple reciters
- Playback controls (play, pause, skip, speed)
- Revision mode to hide/reveal ayahs
- Mistake counter
- Download for offline use

---

### 2.4 Quiz Page (`/student/quiz`)

```
┌─────────────────────────────────────────────────────────────────────────────┐
│  [← Back]    Juz 15 Completion Quiz                      Question 5 of 10  │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  Progress: ████████████░░░░░░░░  50%                                        │
│                                                                             │
│  ┌────────────────────────────────────────────────────────────────────┐    │
│  │  Question 5: Multiple Choice                                       │    │
│  │  ────────────────────────────────────────────────────────────────  │    │
│  │                                                                    │    │
│  │  Which ayah comes after:                                           │    │
│  │                                                                    │    │
│  │              إِنَّ اللَّهَ لَا يَظْلِمُ مِثْقَالَ ذَرَّةٍ           │    │
│  │                                                                    │    │
│  │  ┌──────────────────────────────────────────────────────────┐     │    │
│  │  │  A) وَإِن تَكُ حَسَنَةً يُضَاعِفْهَا                     │     │    │
│  │  └──────────────────────────────────────────────────────────┘     │    │
│  │                                                                    │    │
│  │  ┌──────────────────────────────────────────────────────────┐     │    │
│  │  │  B) وَيُؤْتِ مِن لَّدُنْهُ أَجْرًا عَظِيمًا              │     │    │
│  │  └──────────────────────────────────────────────────────────┘     │    │
│  │                                                                    │    │
│  │  ┌──────────────────────────────────────────────────────────┐     │    │
│  │  │  C) فَكَيْفَ إِذَا جِئْنَا مِن كُلِّ أُمَّةٍ              │     │    │
│  │  └──────────────────────────────────────────────────────────┘     │    │
│  │                                                                    │    │
│  │  ┌──────────────────────────────────────────────────────────┐     │    │
│  │  │  D) بِشَهِيدٍ وَجِئْنَا بِكَ عَلَىٰ هَٰؤُلَاءِ           │     │    │
│  │  └──────────────────────────────────────────────────────────┘     │    │
│  │                                                                    │    │
│  │  Reference: Surah An-Nisa (4:40)                                  │    │
│  │                                                                    │    │
│  │  [🔊 Play Audio]                                                   │    │
│  │                                                                    │    │
│  │              [Skip Question]        [Submit Answer →]              │    │
│  └────────────────────────────────────────────────────────────────────┘    │
│                                                                             │
│  ┌────────────────────────────────────────────────────────────────────┐    │
│  │  Current Stats:                                                    │    │
│  │  ✓ Correct: 3  |  ✗ Incorrect: 1  |  ⏭️ Skipped: 0                 │    │
│  └────────────────────────────────────────────────────────────────────┘    │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

**Features:**
- Progress bar showing quiz completion
- Multiple choice questions with Arabic text
- Audio playback option for questions
- Surah/Ayah reference
- Real-time stats (correct, incorrect, skipped)
- Skip and submit buttons

---

## 3. Teacher Dashboard (`/teacher/dashboard`)

```
┌─────────────────────────────────────────────────────────────────────────────┐
│  [☰ Menu]    Quran Academy - Teacher Portal               [🔔] [👤] [⚙️]  │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  As-salamu Alaykum, Ustadh Ibrahim! 👋                    [Sign Out]       │
│  Manage your students and assignments                                      │
│                                                                             │
│  ┌──────────────────┐  ┌──────────────────┐  ┌──────────────────┐         │
│  │ 👥 Total Students│  │ ✅ Today's Work  │  │ ⏰ Pending Review│         │
│  │                  │  │                  │  │                  │         │
│  │       15         │  │    12 / 15       │  │        8         │         │
│  │   students       │  │   completed      │  │    students      │         │
│  │                  │  │                  │  │                  │         │
│  └──────────────────┘  └──────────────────┘  └──────────────────┘         │
│                                                                             │
│  ┌────────────────────────────────────────────────────────────────────┐    │
│  │  👥 MY STUDENTS                                    [+ Add Student]  │    │
│  │  ────────────────────────────────────────────────────────────────  │    │
│  │                                                                    │    │
│  │  Search: [_______________________]  Filter: [▼ All    ] [🔍]      │    │
│  │                                                                    │    │
│  │  ┌──────────────────────────────────────────────────────────┐     │    │
│  │  │ 👤 Ahmed Ali                               Grade: B  ✓   │     │    │
│  │  │ Current Juz: 15 (65%)  |  Today: Completed             │     │    │
│  │  │ [📝 Assign Lesson]  [📊 View Progress]  [✍️ Grade]      │     │    │
│  │  └──────────────────────────────────────────────────────────┘     │    │
│  │                                                                    │    │
│  │  ┌──────────────────────────────────────────────────────────┐     │    │
│  │  │ 👤 Fatimah Hassan                          Grade: A  ✓   │     │    │
│  │  │ Current Juz: 12 (45%)  |  Today: Completed             │     │    │
│  │  │ [📝 Assign Lesson]  [📊 View Progress]  [✍️ Grade]      │     │    │
│  │  └──────────────────────────────────────────────────────────┘     │    │
│  │                                                                    │    │
│  │  ┌──────────────────────────────────────────────────────────┐     │    │
│  │  │ 👤 Omar Khalid                             Grade: -- ⏰  │     │    │
│  │  │ Current Juz: 8 (20%)   |  Today: Pending               │     │    │
│  │  │ [📝 Assign Lesson]  [📊 View Progress]  [✍️ Grade]      │     │    │
│  │  └──────────────────────────────────────────────────────────┘     │    │
│  │                                                                    │    │
│  │  [View All Students →]                                             │    │
│  └────────────────────────────────────────────────────────────────────┘    │
│                                                                             │
│  ┌────────────────────────────────────────────────────────────────────┐    │
│  │  📝 QUICK ASSIGN LESSON                                             │    │
│  │  ────────────────────────────────────────────────────────────────  │    │
│  │                                                                    │    │
│  │  Student: [▼ Select Student     ]  Date: [▼ Today      ]          │    │
│  │                                                                    │    │
│  │  Old Revision: Surah [▼ Al-Baqarah] Ayah [__] to Ayah [__]        │    │
│  │  New Lesson:   Surah [▼ Al-Baqarah] Ayah [__] to Ayah [__]        │    │
│  │                                                                    │    │
│  │  [Assign to Multiple Students]        [Assign Lesson →]            │    │
│  └────────────────────────────────────────────────────────────────────┘    │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

**Key Features:**
- Student overview stats
- Student list with status and grades
- Quick actions for each student (assign, view, grade)
- Quick assign lesson form
- Bulk assignment option

---

### 3.2 Student Detail Page (`/teacher/student/:id`)

```
┌─────────────────────────────────────────────────────────────────────────────┐
│  [← Back to Students]    Ahmed Ali's Progress                              │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  ┌──────────────────┐  ┌──────────────────┐  ┌──────────────────┐         │
│  │ 📖 Current Juz   │  │ ⭐ Avg Grade     │  │ 🔥 Streak        │         │
│  │                  │  │                  │  │                  │         │
│  │   Juz 15 (65%)   │  │       A          │  │    12 days       │         │
│  │  [Progress Bar]  │  │     4.2/5.0      │  │                  │         │
│  └──────────────────┘  └──────────────────┘  └──────────────────┘         │
│                                                                             │
│  ┌────────────────────────────────────────────────────────────────────┐    │
│  │  📊 PERFORMANCE CHART (Last 30 Days)                                │    │
│  │  ────────────────────────────────────────────────────────────────  │    │
│  │                                                                    │    │
│  │  Grade                                                              │    │
│  │   A │     ●         ●   ●   ●       ●   ●                          │    │
│  │   B │  ●     ●   ●           ●   ●                                 │    │
│  │   C │                                                               │    │
│  │ INC │                                                               │    │
│  │     └────────────────────────────────────────────────────          │    │
│  │      1  5  10  15  20  25  30  (Days)                              │    │
│  └────────────────────────────────────────────────────────────────────┘    │
│                                                                             │
│  ┌────────────────────────────────────────────────────────────────────┐    │
│  │  📚 LESSON HISTORY                                [📅 Filter: All]  │    │
│  │  ────────────────────────────────────────────────────────────────  │    │
│  │                                                                    │    │
│  │  Jan 3, 2026 - Wednesday                                           │    │
│  │  ┌──────────────────────────────────────────────────────────┐     │    │
│  │  │  Old: Al-Baqarah (2:142-155)  Grade: A  Time: 25min     │     │    │
│  │  │  New: Al-Baqarah (2:156-160)  Grade: B  Time: 30min     │     │    │
│  │  │  Mistakes: 3  |  Notes: Good but needs more practice    │     │    │
│  │  │                                              [✍️ Edit]    │     │    │
│  │  └──────────────────────────────────────────────────────────┘     │    │
│  │                                                                    │    │
│  │  Jan 2, 2026 - Tuesday                                             │    │
│  │  ┌──────────────────────────────────────────────────────────┐     │    │
│  │  │  Old: Al-Baqarah (2:130-141)  Grade: A  Time: 20min     │     │    │
│  │  │  New: Al-Baqarah (2:142-145)  Grade: A  Time: 35min     │     │    │
│  │  │  Mistakes: 1  |  Notes: Excellent work!                 │     │    │
│  │  │                                              [✍️ Edit]    │     │    │
│  │  └──────────────────────────────────────────────────────────┘     │    │
│  │                                                                    │    │
│  │  [Load More →]                                                     │    │
│  └────────────────────────────────────────────────────────────────────┘    │
│                                                                             │
│  [📝 Assign New Lesson]  [📊 Generate Report]  [✉️ Contact Parent]         │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

**Features:**
- Student overview stats (current Juz, average grade, streak)
- Performance chart showing grade trends
- Complete lesson history with grades and notes
- Edit past grades and notes
- Generate progress reports

---

## 4. Parent Dashboard (`/parent/dashboard`)

```
┌─────────────────────────────────────────────────────────────────────────────┐
│  [☰ Menu]    Quran Academy - Parent Portal                [🔔] [👤] [⚙️]  │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  As-salamu Alaykum, Sister Amina! 👋                      [Sign Out]       │
│  Monitor your children's Quran progress                                    │
│                                                                             │
│  ┌──────────────────┐  ┌──────────────────┐  ┌──────────────────┐         │
│  │ 👶 My Children   │  │ ✍️ Pending Sign  │  │ 📊 This Week     │         │
│  │                  │  │                  │  │                  │         │
│  │        2         │  │        3         │  │   25 / 30        │         │
│  │    children      │  │    reviews       │  │  lessons done    │         │
│  │                  │  │                  │  │                  │         │
│  └──────────────────┘  └──────────────────┘  └──────────────────┘         │
│                                                                             │
│  ┌────────────────────────────────────────────────────────────────────┐    │
│  │  👶 MY CHILDREN                                                     │    │
│  │  ────────────────────────────────────────────────────────────────  │    │
│  │                                                                    │    │
│  │  ┌──────────────────────────────────────────────────────────┐     │    │
│  │  │ 👦 Ahmed Ali (Age 12)                         Grade: B    │     │    │
│  │  │                                                           │     │    │
│  │  │ Today: ✓ Completed  |  Streak: 🔥 12 days                │     │    │
│  │  │ Current Juz: 15 (65%)  |  Teacher: Ustadh Ibrahim        │     │    │
│  │  │                                                           │     │    │
│  │  │ Pending Review: 1 day  ⏰                                 │     │    │
│  │  │                                                           │     │    │
│  │  │ [👁️ View Details]  [✍️ Review & Sign]                     │     │    │
│  │  └──────────────────────────────────────────────────────────┘     │    │
│  │                                                                    │    │
│  │  ┌──────────────────────────────────────────────────────────┐     │    │
│  │  │ 👧 Fatima Ali (Age 9)                         Grade: A    │     │    │
│  │  │                                                           │     │    │
│  │  │ Today: ✓ Completed  |  Streak: 🔥 8 days                 │     │    │
│  │  │ Current Juz: 8 (30%)   |  Teacher: Sister Khadija        │     │    │
│  │  │                                                           │     │    │
│  │  │ Pending Review: 2 days  ⏰                                │     │    │
│  │  │                                                           │     │    │
│  │  │ [👁️ View Details]  [✍️ Review & Sign]                     │     │    │
│  │  └──────────────────────────────────────────────────────────┘     │    │
│  └────────────────────────────────────────────────────────────────────┘    │
│                                                                             │
│  ┌────────────────────────────────────────────────────────────────────┐    │
│  │  ✍️ PENDING REVIEWS                                                 │    │
│  │  ────────────────────────────────────────────────────────────────  │    │
│  │                                                                    │    │
│  │  Ahmed Ali - Jan 3, 2026 (Wednesday)                               │    │
│  │  ┌──────────────────────────────────────────────────────────┐     │    │
│  │  │  Old: Al-Baqarah (2:142-155)  Time: 25min  Grade: A      │     │    │
│  │  │  New: Al-Baqarah (2:156-160)  Time: 30min  Grade: B      │     │    │
│  │  │                                                           │     │    │
│  │  │  Teacher Notes: "Good progress, needs more practice"     │     │    │
│  │  │                                                           │     │    │
│  │  │  Parent Comments (optional):                             │     │    │
│  │  │  [_________________________________________]              │     │    │
│  │  │                                                           │     │    │
│  │  │  Signature:  [📝 Draw Signature]                          │     │    │
│  │  │                                                           │     │    │
│  │  │              [Cancel]            [✍️ Sign & Approve]       │     │    │
│  │  └──────────────────────────────────────────────────────────┘     │    │
│  │                                                                    │    │
│  │  [View More Reviews →]                                             │    │
│  └────────────────────────────────────────────────────────────────────┘    │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

**Key Features:**
- Overview of all children
- Individual child cards with status
- Pending reviews requiring signature
- Digital signature functionality
- Parent comments section

---

## 5. Mobile Responsive Design

### 5.1 Mobile Dashboard (Student)

```
┌─────────────────────┐
│ [☰]  Quran Academy  │
│                     │
│ As-salamu Alaykum   │
│ Ahmed! 👋           │
│                     │
│ ┌─────────────────┐ │
│ │ 📊 Today        │ │
│ │   45 minutes    │ │
│ │   Quran time    │ │
│ └─────────────────┘ │
│                     │
│ ┌─────────────────┐ │
│ │ 🎯 Current Juz  │ │
│ │    Juz 15       │ │
│ │    65%          │ │
│ │  [Progress Bar] │ │
│ └─────────────────┘ │
│                     │
│ ┌─────────────────┐ │
│ │ 🔥 Streak       │ │
│ │   12 days       │ │
│ │   🔥🔥🔥        │ │
│ └─────────────────┘ │
│                     │
│ [📖] [📊] [🕌] [⚙️] │
└─────────────────────┘
```

**Mobile Features:**
- Stacked card layout
- Bottom navigation bar
- Hamburger menu for secondary options
- Swipeable cards
- Touch-optimized buttons

---

## 6. Component Specifications

### 6.1 Card Component

**Default Card:**
- White background
- Subtle shadow: `shadow-sm`
- Border radius: `rounded-lg`
- Padding: `p-6`
- Border: `border border-border`

**Hover State:**
- Slight elevation increase
- Transition: `0.2s ease`

### 6.2 Button Component

**Primary Button (Green):**
- Background: `#2F855A`
- Text: White
- Padding: `px-4 py-2`
- Hover: Darken 10%

**Secondary Button:**
- Background: `#38A169`
- Text: White
- Padding: `px-4 py-2`

**Outline Button:**
- Border: `2px solid #2F855A`
- Text: `#2F855A`
- Background: Transparent
- Hover: Light green background

### 6.3 Input Component

**Text Input:**
- Height: `40px`
- Border: `1px solid #E2E8F0`
- Border radius: `6px`
- Focus: Green ring
- Icon spacing: `pl-10` when icon present

### 6.4 Progress Bar

```
┌────────────────────────────────────┐
│ ████████████░░░░░░░░░░░░░░░░░░  65%│
└────────────────────────────────────┘
```

- Height: `8px`
- Background: Light gray (`#E2E8F0`)
- Fill: Primary green (`#2F855A`)
- Border radius: `full`
- Animated on change

---

## 7. Typography

### Headings
- **H1**: `text-3xl font-bold` (30px)
- **H2**: `text-2xl font-semibold` (24px)
- **H3**: `text-xl font-medium` (20px)

### Body Text
- **Regular**: `text-base` (16px)
- **Small**: `text-sm` (14px)
- **Tiny**: `text-xs` (12px)

### Arabic Text
- **Font**: Amiri (Google Fonts)
- **Size**: `text-2xl` or larger (24px+)
- **Line Height**: `leading-loose` (2.0)
- **Direction**: RTL

---

## 8. Icons

Using Heroicons (https://heroicons.com/) for all icons:

- **Book**: 📖 Quran/Reading
- **Chart**: 📊 Statistics/Progress
- **Fire**: 🔥 Streak
- **Check**: ✓ Completed
- **Clock**: ⏰ Time/Pending
- **Star**: ⭐ Rating
- **User**: 👤 Profile
- **Bell**: 🔔 Notifications
- **Cog**: ⚙️ Settings

---

## 9. Color Usage Guide

### When to Use Each Color

**Primary Green (#2F855A):**
- Primary buttons
- Active navigation items
- Progress bars
- Important CTAs

**Light Green (#38A169):**
- Secondary buttons
- Hover states
- Badges

**Mint Green (#68D391):**
- Accents
- Success messages
- Highlights

**Black (#000000):**
- Primary text
- Headings
- Borders

**White (#FFFFFF):**
- Background
- Card backgrounds
- Button text

**Gray (#F7FAFC):**
- Secondary backgrounds
- Disabled states
- Subtle borders

---

## Next Steps for Implementation

1. **Phase 1**: Build login/signup pages (DONE)
2. **Phase 2**: Implement student dashboard with stats cards
3. **Phase 3**: Create daily tracker with timer
4. **Phase 4**: Build Quran reader with audio
5. **Phase 5**: Implement teacher and parent dashboards
6. **Phase 6**: Add quiz functionality
7. **Phase 7**: Polish and mobile optimization

---

**Last Updated**: 2026-01-03
**Status**: Wireframes Complete - Ready for Implementation
