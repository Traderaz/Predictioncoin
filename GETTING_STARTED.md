# 🎯 Getting Started with Prediction Coin

Welcome! This guide will walk you through everything you need to know to get your Prediction Coin website up and running.

## 📋 What You're Building

A full-stack web application featuring:
- **Polymarket-style predictions** with real-time data
- **Community voting** on meme predictions
- **Meme generator** to create shareable prediction images
- **Firebase backend** for storage and database
- **Vercel hosting** for instant deployment

## 🛠️ What You Need

Before you start, make sure you have:

- ✅ **Node.js 18 or higher** - [Download here](https://nodejs.org/)
- ✅ **Git** - [Download here](https://git-scm.com/)
- ✅ **A code editor** - VS Code, Cursor, etc.
- ✅ **A Firebase account** - [Sign up free](https://firebase.google.com/)
- ✅ **A Vercel account** - [Sign up free](https://vercel.com/)

## 🚀 Step-by-Step Setup

### Step 1: Install Dependencies

Open your terminal in the project folder and run:

\`\`\`bash
npm install
\`\`\`

This will install all the packages you need (React, Next.js, Firebase, etc.)

**Expected time:** 1-2 minutes

### Step 2: Set Up Firebase

Firebase will handle your database and image storage.

#### 2.1 Create a Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "**Add project**"
3. Enter name: "**Prediction Coin**" (or whatever you prefer)
4. Disable Google Analytics (optional)
5. Click "**Create project**"

#### 2.2 Enable Firestore Database

1. In the sidebar, click "**Firestore Database**"
2. Click "**Create database**"
3. Select "**Start in production mode**"
4. Choose your location (closest to your users)
5. Click "**Enable**"

#### 2.3 Configure Firestore Rules

1. Click on the "**Rules**" tab
2. Replace the content with:

\`\`\`javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /memePolls/{pollId} {
      allow read: if true;
      allow create: if true;
      allow update: if request.resource.data.diff(resource.data).affectedKeys()
        .hasOnly(['yesVotes', 'noVotes', 'totalVotes']);
    }
  }
}
\`\`\`

3. Click "**Publish**"

#### 2.4 Enable Storage

1. In the sidebar, click "**Storage**"
2. Click "**Get started**"
3. Click "**Next**" (keep default rules for now)
4. Choose the same location as your database
5. Click "**Done**"

#### 2.5 Configure Storage Rules

1. Click on the "**Rules**" tab
2. Replace the content with:

\`\`\`javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /memes/{allPaths=**} {
      allow read: if true;
      allow write: if request.resource.size < 10 * 1024 * 1024
                   && request.resource.contentType.matches('image/.*');
    }
  }
}
\`\`\`

3. Click "**Publish**"

#### 2.6 Get Your Firebase Config

1. Click the **gear icon** (⚙️) next to "Project Overview"
2. Click "**Project settings**"
3. Scroll down to "**Your apps**"
4. Click the **web icon** (</>)
5. Register app with nickname: "**Prediction Coin Web**"
6. **Copy the configuration values** (you'll need these next!)

### Step 3: Configure Environment Variables

1. In your project folder, create a file named `.env.local`
2. Copy and paste this template:

\`\`\`env
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key_here
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=123456789012
NEXT_PUBLIC_FIREBASE_APP_ID=1:123456789012:web:abc123def456
\`\`\`

3. **Replace each value** with your actual Firebase config from Step 2.6
4. **Save the file**

⚠️ **Important:** Make sure there are NO spaces around the `=` signs!

### Step 4: Run Your Development Server

In your terminal, run:

\`\`\`bash
npm run dev
\`\`\`

You should see:

\`\`\`
▲ Next.js 14.x.x
- Local:        http://localhost:3000
\`\`\`

Open [http://localhost:3000](http://localhost:3000) in your browser! 🎉

### Step 5: Test the Features

#### Test the Homepage
1. You should see prediction cards in a grid
2. Try the filter tabs (All, Volume, Open)
3. Cards should have hover effects

#### Test Meme Voting
1. Click "**Meme Votes**" in the navigation
2. You should see some default polls
3. Click "**Yes**" or "**No**" to vote
4. The percentages should update!

#### Test Meme Generator
1. Click "**Meme Generator**" in the navigation
2. Type a question (e.g., "Will Bitcoin hit 100k?")
3. Click to upload an image
4. See the preview update in real-time
5. Click "**Create & Publish Poll**" to save it
6. Or click "**Download Meme**" to save locally

### Step 6: Add Some Default Polls (Optional)

Want to start with some pre-populated polls? 

1. Make sure your `.env.local` is configured
2. Run:

\`\`\`bash
npx ts-node scripts/seedData.ts
\`\`\`

This will add 6 default meme polls to your database.

## 🚢 Deploying to Vercel

Ready to go live? Let's deploy!

### Step 1: Push to GitHub

If you haven't already:

\`\`\`bash
git init
git add .
git commit -m "Initial commit: Prediction Coin"
git branch -M main
git remote add origin https://github.com/yourusername/prediction-coin.git
git push -u origin main
\`\`\`

### Step 2: Deploy on Vercel

1. Go to [vercel.com](https://vercel.com)
2. Sign in with GitHub
3. Click "**Add New**" → "**Project**"
4. Import your `prediction-coin` repository
5. Vercel will auto-detect Next.js settings ✓
6. Click "**Environment Variables**"
7. Add all your `NEXT_PUBLIC_FIREBASE_*` variables
   - Copy each variable name and value from your `.env.local`
8. Click "**Deploy**"

**That's it!** Your site will be live in 2-3 minutes! 🚀

Vercel will give you a URL like: `https://prediction-coin-xyz.vercel.app`

### Step 3: Add a Custom Domain (Optional)

1. In your Vercel project, go to "**Settings**" → "**Domains**"
2. Add your domain (e.g., `predictioncoin.com`)
3. Follow the DNS instructions
4. Wait for verification (usually takes a few minutes)

## 🎨 Customization Ideas

### Change the Colors

Edit `tailwind.config.js`:

\`\`\`javascript
colors: {
  'prediction-blue': '#0066FF',  // Your main color
  'prediction-dark': '#0A0A0A',  // Background
  'prediction-card': '#1A1A1A',  // Cards
}
\`\`\`

### Update the Logo

Replace the "P" logo in `components/Header.tsx` with your own logo image.

### Add More Predictions

Edit `lib/polymarket.ts` to add more mock predictions or connect to real APIs.

## 🐛 Troubleshooting

### "Firebase not configured" error
→ Check your `.env.local` file exists and has correct values
→ Restart the dev server (`npm run dev`)

### Polls not showing up
→ Make sure Firebase rules are published correctly
→ Check browser console for errors

### Can't upload images
→ Verify Storage rules are set
→ Check file size is under 10MB

### Build errors
→ Delete `node_modules` and `.next` folders
→ Run `npm install` again
→ Run `npm run dev`

### Vercel deployment fails
→ Check all environment variables are added
→ Make sure they start with `NEXT_PUBLIC_`
→ Check the build logs for specific errors

## 📚 Next Steps

Now that you're up and running:

1. **Customize the branding** to match your style
2. **Create some meme polls** to test the generator
3. **Share on Twitter** to get your first users
4. **Connect real Polymarket API** for live data
5. **Add analytics** to track engagement

## 🆘 Need Help?

- 📖 Read [README.md](README.md) for full documentation
- 📋 Check [SETUP.md](SETUP.md) for detailed setup guide
- 📊 Review [PROJECT_SUMMARY.md](PROJECT_SUMMARY.md) for architecture
- 🔥 Check [Firebase Documentation](https://firebase.google.com/docs)
- ▲ Check [Next.js Documentation](https://nextjs.org/docs)

## 🎉 You're All Set!

Congratulations! You now have a fully functional prediction market meme platform!

Share your site and start creating some viral memes! 🚀

---

**Happy predicting!** 🎯

Built with ❤️ using Cursor and Claude 4.5 Sonnet

