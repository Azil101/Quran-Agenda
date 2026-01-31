# 🤖 Auto-Deploy Setup Guide (iPad Friendly!)

## What This Does

Automatically deploys your app to a live URL every time you push code to GitHub!

**Your Live URL (after setup):**
`https://quranagenda-b3f9a.web.app`

---

## 📱 Setup Instructions (Can Do From iPad!)

### Step 1: Add Firebase Credentials to GitHub Secrets

1. **Go to your GitHub repository:**
   👉 https://github.com/Azil101/Quran-Agenda/settings/secrets/actions

2. **Click "New repository secret"** and add each of these:

   **Secret 1:**
   - Name: `VITE_FIREBASE_API_KEY`
   - Value: `AIzaSyDldHIN5FTn3VtdOo1glaGwNzkhFKMBIfo`

   **Secret 2:**
   - Name: `VITE_FIREBASE_AUTH_DOMAIN`
   - Value: `quranagenda-b3f9a.firebaseapp.com`

   **Secret 3:**
   - Name: `VITE_FIREBASE_PROJECT_ID`
   - Value: `quranagenda-b3f9a`

   **Secret 4:**
   - Name: `VITE_FIREBASE_STORAGE_BUCKET`
   - Value: `quranagenda-b3f9a.firebasestorage.app`

   **Secret 5:**
   - Name: `VITE_FIREBASE_MESSAGING_SENDER_ID`
   - Value: `990096038405`

   **Secret 6:**
   - Name: `VITE_FIREBASE_APP_ID`
   - Value: `1:990096038405:web:9c4211674e1cfba39eda6c`

   **Secret 7:**
   - Name: `VITE_FIREBASE_MEASUREMENT_ID`
   - Value: (leave empty or skip this one)

### Step 2: Create Firebase Service Account

This is a bit tricky on iPad, but here's how:

#### Option A: Use Firebase Console on iPad

1. **Go to Firebase Console:**
   👉 https://console.firebase.google.com/project/quranagenda-b3f9a/settings/serviceaccounts/adminsdk

2. **Click "Generate new private key"**

3. **Download the JSON file** (it will save to your iPad)

4. **Copy the ENTIRE contents** of that JSON file

5. **Go back to GitHub Secrets:**
   👉 https://github.com/Azil101/Quran-Agenda/settings/secrets/actions

6. **Add new secret:**
   - Name: `FIREBASE_SERVICE_ACCOUNT`
   - Value: Paste the entire JSON content

#### Option B: I Can Help

If that's too complex, I can generate a simpler setup command that you can run later when you have computer access.

---

## 🚀 How to Deploy

Once secrets are added:

1. **Push any code to GitHub** (or just click "Re-run workflow")

2. **GitHub Actions will automatically:**
   - ✅ Install dependencies
   - ✅ Build your app
   - ✅ Deploy to Firebase Hosting

3. **Your app will be live at:**
   `https://quranagenda-b3f9a.web.app`

---

## 📊 Check Deployment Status

Watch the deployment progress:
👉 https://github.com/Azil101/Quran-Agenda/actions

---

## 🎯 Quick Deploy Button

Once setup is complete, you can deploy by:
1. Going to: https://github.com/Azil101/Quran-Agenda/actions/workflows/deploy.yml
2. Click "Run workflow"
3. Click the green "Run workflow" button

---

## 🔄 Alternative: Simple One-Click Deploy

If the above is too complex, I can set up:

### Vercel Deploy (Easiest!)
- One-click deployment
- No service account needed
- Live URL in 30 seconds

### Netlify Deploy
- Drag and drop from iPad
- Custom domain support
- Free tier available

Let me know which you prefer!

---

## Need Help?

Tell me:
- "Set up Vercel deployment instead" (easier!)
- "Help me add GitHub secrets"
- "I'll do Firebase deployment later on computer"

---

**Current Status:** ⏳ Waiting for GitHub secrets setup
**After Setup:** ✅ Auto-deploy on every push!
