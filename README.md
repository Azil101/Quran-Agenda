# Quran Academy Tracker

A comprehensive Quran memorization, tracking, and learning management system for students, teachers, and parents.

## Features

### For Students
- **Daily Tracker**: Track time spent on Quran study and prayer completion
- **Memorization Tracking**: Monitor ayahs, surahs, hizbs, and juz memorized
- **Quran Reader**: Read and revise with Uthmani script and optional translations
- **Audio Recitation**: Listen to top reciters (Saad al-Ghamidi and more)
- **Quiz System**: Test yourself with multiple choice, text, or audio-based questions
- **Grading**: Self-assess with letter grades (A/B/C/INC) or star ratings (1-5)
- **Progress Analytics**: View your improvement over time
- **Homework Tracker**: Manage homework and to-do lists
- **Day Off Rewards**: Earn a day off after completing each juz
- **Smart Reminders**: Get notified about daily tasks

### For Teachers
- **Student Management**: Oversee multiple students
- **Lesson Assignment**: Assign daily old revision and new lessons
- **Progress Monitoring**: Track each student's performance
- **Grading Interface**: Review and grade student work
- **Custom Scheduling**: Set custom lesson schedules per student

### For Parents
- **Multi-Child Dashboard**: Monitor all your children's progress
- **Daily Reviews**: Review and digitally sign off on completed work
- **Notifications**: Receive alerts about achievements and missed work
- **Progress Reports**: Access weekly/monthly performance summaries

## Tech Stack

- **Frontend**: React 18 + TypeScript + Vite
- **Styling**: Tailwind CSS
- **Backend**: Firebase
  - Authentication
  - Firestore Database
  - Cloud Storage
  - Cloud Functions
  - Cloud Messaging
- **State Management**: Zustand
- **Data Fetching**: React Query (@tanstack/react-query)
- **Routing**: React Router
- **Date Handling**: date-fns
- **Quran Data**: Quran.com API

## Getting Started

### Prerequisites

- Node.js 18 or higher
- npm or yarn
- A Firebase project (see setup instructions below)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Azil101/Quran-Agenda.git
   cd Quran-Agenda
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up Firebase**

   a. Go to [Firebase Console](https://console.firebase.google.com/)

   b. Create a new project or select an existing one

   c. Enable the following services:
      - Authentication (Email/Password)
      - Firestore Database
      - Storage
      - Cloud Functions

   d. Get your Firebase configuration:
      - Go to Project Settings
      - Scroll to "Your apps" section
      - Click on the web icon (</>)
      - Copy the config object

4. **Configure environment variables**
   ```bash
   cp .env.example .env
   ```

   Edit `.env` and add your Firebase configuration:
   ```env
   VITE_FIREBASE_API_KEY=your_api_key
   VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
   VITE_FIREBASE_PROJECT_ID=your_project_id
   VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
   VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
   VITE_FIREBASE_APP_ID=your_app_id
   VITE_FIREBASE_MEASUREMENT_ID=your_measurement_id
   ```

5. **Run the development server**
   ```bash
   npm run dev
   ```

   The app will be available at `http://localhost:5173`

### Firebase Security Rules

Set up Firestore security rules to protect user data:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Users collection
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }

    // Students collection
    match /students/{studentId} {
      allow read: if request.auth != null && (
        request.auth.uid == studentId ||
        request.auth.uid == resource.data.teacherId ||
        request.auth.uid in resource.data.parentIds
      );
      allow write: if request.auth != null && (
        request.auth.uid == studentId ||
        request.auth.uid == resource.data.teacherId
      );
    }

    // Teachers collection
    match /teachers/{teacherId} {
      allow read: if request.auth != null;
      allow write: if request.auth != null && request.auth.uid == teacherId;
    }

    // Parents collection
    match /parents/{parentId} {
      allow read, write: if request.auth != null && request.auth.uid == parentId;
    }

    // Lessons collection
    match /lessons/{lessonId} {
      allow read: if request.auth != null;
      allow write: if request.auth != null;
    }

    // Other collections follow similar patterns
  }
}
```

## Project Structure

```
Quran-Agenda/
├── src/
│   ├── components/        # React components
│   │   ├── auth/         # Authentication components
│   │   ├── student/      # Student-specific components
│   │   ├── teacher/      # Teacher-specific components
│   │   ├── parent/       # Parent-specific components
│   │   └── shared/       # Shared/reusable components
│   ├── pages/            # Page components
│   │   ├── auth/         # Login, signup pages
│   │   ├── student/      # Student dashboard, etc.
│   │   ├── teacher/      # Teacher dashboard, etc.
│   │   └── parent/       # Parent dashboard, etc.
│   ├── lib/              # Utility libraries
│   │   ├── firebase.ts   # Firebase configuration
│   │   └── utils.ts      # Helper functions
│   ├── hooks/            # Custom React hooks
│   ├── services/         # API services
│   ├── types/            # TypeScript type definitions
│   ├── contexts/         # React contexts
│   ├── assets/           # Images, icons, etc.
│   └── styles/           # Global styles
├── public/               # Static assets
├── PROJECT_PLAN.md       # Detailed project plan
└── README.md            # This file
```

## Development Roadmap

See [PROJECT_PLAN.md](./PROJECT_PLAN.md) for detailed development phases and timeline.

### Current Status: Phase 1 - Foundation ✅
- [x] Project setup
- [x] TypeScript configuration
- [x] Tailwind CSS setup
- [x] Firebase configuration
- [x] Database schema design
- [ ] Authentication implementation (In Progress)

### Next: Phase 2 - Student Core Features
- Student dashboard
- Daily tracker
- Memorization tracking
- Basic Quran reader

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Contributing

This is a personal project, but suggestions and feedback are welcome!

## License

Private - All Rights Reserved

## Contact

For questions or support, please contact [Your Email]

---

**Made with ❤️ for Quran memorization and learning**
