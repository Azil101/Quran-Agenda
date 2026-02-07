# Phase 1 Testing Guide

## 🌐 Accessing the Application

### Option 1: Replit Deployment (Recommended for Testing)

**Your Replit Project:** https://replit.com/@azilhassan1/Quran-Agenda

**To get your public URL:**
1. Open the Replit project link above
2. Click the **"Run"** button at the top (this will deploy the latest code)
3. Look for the **Webview** panel (usually on the right side)
4. The public URL will be displayed at the top of the Webview panel
5. It should look like: `https://quran-agenda.azilhassan1.repl.co` or similar

**Note:** Make sure the Replit is pulling from the `claude/quran-app-planning-Jw5LG` branch with all the latest Phase 1 features.

### Option 2: GitHub Pages
**URL:** https://azil101.github.io/Quran-Agenda/

**⚠️ Important:** GitHub Pages is currently deploying from an old branch. To update:
1. Go to GitHub repo → Settings → Pages
2. Change source branch to `claude/quran-app-planning-Jw5LG`
3. Change folder to `/web-app/dist` or `/`
4. Wait 2-3 minutes for deployment
5. Refresh the URL

---

## ✅ Phase 1 Testing Checklist

### 🧪 Test 1: Teacher Account Setup (5 minutes)

1. **Sign Up as Teacher**
   - [ ] Navigate to the app URL
   - [ ] Click "Sign Up"
   - [ ] Enter email (e.g., `teacher@test.com`)
   - [ ] Enter password (min 6 characters)
   - [ ] Select role: **Teacher**
   - [ ] Enter name (e.g., "Mr. Ahmad")
   - [ ] Click "Create Account"
   - [ ] ✅ Should redirect to Teacher Dashboard

2. **Generate Invite Code**
   - [ ] On Teacher Dashboard, find "Invite Code Generator" card
   - [ ] Click "Generate Code" button
   - [ ] ✅ An 8-character code should appear (e.g., "AB12CD34")
   - [ ] Code should only contain: A-Z (no O/I) and 2-9
   - [ ] Click "Copy Code" button
   - [ ] ✅ Code copied to clipboard
   - [ ] **Save this code for Test 2**

3. **Verify Teacher Dashboard**
   - [ ] Dashboard shows "Invite Code Generator" card
   - [ ] Dashboard shows placeholder cards for upcoming Phase 2 features
   - [ ] Navigation shows "Quran Reader" link
   - [ ] ✅ No errors in browser console (F12 → Console tab)

---

### 👨‍🎓 Test 2: Student Account & Daily Tracker (10 minutes)

1. **Sign Up as Student**
   - [ ] Open app in **new incognito/private window** (or log out first)
   - [ ] Click "Sign Up"
   - [ ] Enter email (e.g., `student@test.com`)
   - [ ] Enter password
   - [ ] Select role: **Student**
   - [ ] Enter name (e.g., "Ali Hassan")
   - [ ] Click "Create Account"
   - [ ] ✅ Should redirect to Student Dashboard

2. **Join Teacher Using Invite Code**
   - [ ] On Student Dashboard, find "Join with Code" card
   - [ ] Paste the 8-character code from Test 1
   - [ ] Click "Join" button
   - [ ] ✅ Success message appears (e.g., "Successfully joined teacher!")
   - [ ] "Join with Code" card should update to show teacher name

3. **Use Daily Tracker**
   - [ ] Find "Today's Progress" card (should be at top)
   - [ ] Verify stats row shows: Current Streak, This Month, Daily Average, Prayer Rate
   - [ ] All stats should initially show 0 or 0%

   **Test Time Slider:**
   - [ ] Drag the time slider
   - [ ] ✅ Time display updates (shows in hours and minutes, e.g., "1h 30m")
   - [ ] Slider range: 0 minutes to 240 minutes (4 hours)
   - [ ] Slider moves in 5-minute increments

   **Test Prayer Checkboxes:**
   - [ ] Click on "Fajr" prayer checkbox
   - [ ] ✅ Box highlights with green border and shows checkmark
   - [ ] Click again to uncheck
   - [ ] ✅ Border returns to normal
   - [ ] Repeat for all 5 prayers: Fajr 🌅, Dhuhr ☀️, Asr 🌤️, Maghrib 🌇, Isha 🌙

   **Test Save Functionality:**
   - [ ] Set time to 60 minutes (1 hour)
   - [ ] Check 3 prayers (e.g., Fajr, Dhuhr, Maghrib)
   - [ ] Click "Save Progress" button
   - [ ] ✅ Button changes to "Saving..." then "✓ Saved!"
   - [ ] ✅ Success message appears: "Great job! Keep it up! 🌟"
   - [ ] Refresh the page
   - [ ] ✅ Time slider should still show 60 minutes
   - [ ] ✅ 3 prayers should still be checked

4. **Verify Stats Update**
   - [ ] After saving, check stats row:
   - [ ] **Current Streak:** Should show "1 days" (since you tracked today)
   - [ ] **This Month:** Should show "1h 0m" (60 minutes)
   - [ ] **Daily Average:** Should show "1h 0m"
   - [ ] **Prayer Rate:** Should show "60%" (3 out of 5 prayers)

5. **Test Multi-Day Tracking** (Optional - if you have time)
   - [ ] Save different times and prayers
   - [ ] Check if stats accumulate correctly
   - [ ] Verify streak increments each day

---

### 📚 Test 3: Lesson System (Coming Soon)

**Status:** Lesson assignment UI is planned for Phase 2 (Teacher Portal)

**Current Status:**
- [ ] Student Dashboard shows "Current Lesson" card
- [ ] Should display: "No lesson assigned yet. Your teacher will assign lessons soon!"
- [ ] This is expected behavior - lesson assignment UI coming in Phase 2

**What's Ready Behind the Scenes:**
- ✅ `LessonService.assignLesson()` - Teachers can assign lessons (via code)
- ✅ `LessonService.completeLesson()` - Students can mark lessons complete
- ✅ `LessonService.gradeLesson()` - Teachers can grade with A/B/C/INC
- ✅ Database structure ready for old revision + new material

---

## 🔍 Firebase Database Verification

After completing Tests 1 & 2, verify data in Firebase Console:

1. **Go to Firebase Console:** https://console.firebase.google.com/project/quranagenda-b3f9a
2. **Navigate to:** Firestore Database

### Check `invites` Collection
- [ ] Document exists with ID = the 8-character code (e.g., "AB12CD34")
- [ ] Fields should include:
  - `code`: "AB12CD34"
  - `type`: "student"
  - `createdBy`: (teacher's UID)
  - `createdByName`: "Mr. Ahmad"
  - `used`: true
  - `usedBy`: (student's UID)
  - `createdAt`: timestamp
  - `expiresAt`: timestamp (7 days from creation)

### Check `teachers` Collection
- [ ] Document exists with ID = teacher's UID
- [ ] Fields should include:
  - `studentIds`: [array with student UID]
  - `students`: [array with {id, name, addedAt}]

### Check `students` Collection
- [ ] Document exists with ID = student's UID
- [ ] Fields should include:
  - `teacherId`: (teacher's UID)
  - `teacherName`: "Mr. Ahmad"
  - `joinedAt`: timestamp

### Check `dailyTracker` Collection
- [ ] Document exists with ID format: `{studentId}_{YYYY-MM-DD}` (e.g., "abc123_2026-02-07")
- [ ] Fields should include:
  - `studentId`: (student's UID)
  - `date`: Date object
  - `quranTime`: 60 (or whatever you set)
  - `prayers`: {fajr: true, dhuhr: true, asr: false, maghrib: true, isha: false}

---

## ⚠️ Known Issues & Limitations

### Current Phase 1 Limitations
- **No Lesson Assignment UI:** Teachers cannot assign lessons via UI yet (Phase 2)
- **No Student List:** Teachers cannot see their student list via UI yet (Phase 2)
- **No Progress Tracking:** Teachers cannot view student progress yet (Phase 2)
- **No Parent Portal:** Parent features not implemented yet (Phase 3)

### Security
- **⚠️ CRITICAL:** Firestore security rules NOT yet deployed
  - All collections currently have default rules (may be open)
  - **Action Required:** Deploy security rules ASAP (see PHASE_1_COMPLETION.md)

---

## 🐛 Reporting Issues

If you encounter any bugs, please report with:
1. **What you were doing:** (e.g., "Clicking Save on Daily Tracker")
2. **What happened:** (e.g., "Button stayed on 'Saving...' forever")
3. **Expected behavior:** (e.g., "Should show 'Saved!' message")
4. **Browser console errors:** (Press F12 → Console tab → screenshot)
5. **Screenshot:** If applicable

---

## ✅ Success Criteria

Phase 1 is successful if:
- [x] ✅ Zero TypeScript build errors
- [ ] Teacher can generate and share invite codes
- [ ] Student can use invite code to join teacher
- [ ] Student can track daily Quran time (0-240 min slider)
- [ ] Student can track 5 daily prayers with checkboxes
- [ ] Student can save progress and see stats update
- [ ] Data persists in Firebase and reloads correctly
- [ ] All stats calculate correctly (streak, total, average, prayer rate)

---

## 📞 Support

If you need help or encounter issues during testing, create a list of:
- Which tests passed ✅
- Which tests failed ❌
- Any error messages or screenshots

I'll help debug and fix any issues found!
