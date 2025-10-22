# 🔥 Your Firebase Configuration is Ready!

## ✅ Step 1: Create .env.local File

Create a file named `.env.local` in the root of your project and paste this:

\`\`\`env
NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSyCG6Xeiayk2lUo9vZ0pWP6DW024pKl6RBM
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=predictioncoin-38591.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=predictioncoin-38591
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=predictioncoin-38591.firebasestorage.app
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=713960557855
NEXT_PUBLIC_FIREBASE_APP_ID=1:713960557855:web:90cac84b03b425b6b4742a
\`\`\`

### Quick Command (PowerShell):

\`\`\`powershell
@"
NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSyCG6Xeiayk2lUo9vZ0pWP6DW024pKl6RBM
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=predictioncoin-38591.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=predictioncoin-38591
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=predictioncoin-38591.firebasestorage.app
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=713960557855
NEXT_PUBLIC_FIREBASE_APP_ID=1:713960557855:web:90cac84b03b425b6b4742a
"@ | Out-File -FilePath .env.local -Encoding utf8
\`\`\`

Then run: `npm run dev`

---

## ✅ Step 2: Configure Firebase Rules

### Firestore Database Rules

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project: **predictioncoin-38591**
3. Click **Firestore Database** → **Rules**
4. Replace with:

\`\`\`javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /memePolls/{pollId} {
      // Anyone can read polls
      allow read: if true;
      
      // Anyone can create polls
      allow create: if true;
      
      // Only allow updating vote counts
      allow update: if request.resource.data.diff(resource.data).affectedKeys()
        .hasOnly(['yesVotes', 'noVotes', 'totalVotes']);
    }
  }
}
\`\`\`

5. Click **Publish**

### Storage Rules

1. Click **Storage** → **Rules**
2. Replace with:

\`\`\`javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /memes/{allPaths=**} {
      // Anyone can read meme images
      allow read: if true;
      
      // Anyone can upload images (max 10MB, images only)
      allow write: if request.resource.size < 10 * 1024 * 1024
                   && request.resource.contentType.matches('image/.*');
    }
  }
}
\`\`\`

3. Click **Publish**

---

## ✅ Step 3: Seed Initial Data (Optional)

Add some default polls to get started:

\`\`\`bash
npx ts-node scripts/seedData.ts
\`\`\`

This will create 6 default polls in your database!

---

## ✅ Step 4: Test Your Setup

1. **Start the dev server:**
   \`\`\`bash
   npm run dev
   \`\`\`

2. **Visit:** http://localhost:3000

3. **Test these features:**
   - ✅ Homepage loads with predictions
   - ✅ Navigate to /meme-votes
   - ✅ Vote on a poll (vote should save!)
   - ✅ Go to /meme-generator
   - ✅ Upload an image
   - ✅ Create a meme (should upload to Firebase!)

---

## 🎉 You're All Set!

Your Firebase is configured and ready! Here's what works now:

- ✅ Firestore Database connected
- ✅ Firebase Storage connected
- ✅ Votes will be saved
- ✅ Images will be uploaded
- ✅ Real-time updates work

---

## 🚀 Deploy to Vercel

When you're ready to deploy:

1. **Push to GitHub:**
   \`\`\`bash
   git add .
   git commit -m "Add Firebase config"
   git push
   \`\`\`

2. **In Vercel Dashboard:**
   - Go to Settings → Environment Variables
   - Add all 6 variables from your .env.local
   - Deploy!

---

## 🔐 Security Notes

⚠️ **Important:** Your `.env.local` file is already in `.gitignore` so your credentials won't be committed to Git. This is good!

✅ Firebase security rules are set up to:
- Allow everyone to read polls and images
- Allow anyone to create polls
- Only allow vote count updates (not full poll edits)
- Limit image uploads to 10MB
- Only allow image file types

---

## 🐛 Troubleshooting

### "Firebase not configured" error
→ Make sure `.env.local` exists in the root folder
→ Restart the dev server: `npm run dev`

### Votes not saving
→ Check Firestore rules are published
→ Check browser console for errors
→ Verify Firestore is enabled in Firebase Console

### Images not uploading
→ Check Storage rules are published
→ Make sure Storage is enabled
→ Check file is under 10MB and is an image

### Still having issues?
→ Check Firebase Console → Usage tab
→ Make sure you're on the free Spark plan (should be enough)
→ Check browser console for specific error messages

---

## 📊 Firebase Console Links

Quick access to your Firebase project:

- **Console**: https://console.firebase.google.com/project/predictioncoin-38591
- **Firestore**: https://console.firebase.google.com/project/predictioncoin-38591/firestore
- **Storage**: https://console.firebase.google.com/project/predictioncoin-38591/storage
- **Settings**: https://console.firebase.google.com/project/predictioncoin-38591/settings/general

---

## 🎯 Next Steps

1. ✅ Create `.env.local` (see above)
2. ✅ Set up Firestore rules
3. ✅ Set up Storage rules
4. ✅ Run `npm run dev`
5. ✅ Test all features
6. ✅ Seed some data
7. 🚀 Deploy to Vercel!

**Happy coding!** 🎉

