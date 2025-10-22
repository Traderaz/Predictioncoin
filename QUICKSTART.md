# 🚀 Quick Start Guide

Get your Prediction Coin website running in 5 minutes!

## Prerequisites

- Node.js 18+ installed
- A Firebase account (free)
- Git installed

## Quick Setup

### 1. Install Dependencies (30 seconds)

\`\`\`bash
npm install
\`\`\`

### 2. Set Up Firebase (2 minutes)

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create a new project
3. Enable **Firestore Database** (production mode)
4. Enable **Storage**
5. Get your config from Project Settings → Your apps → Web app

### 3. Configure Environment (1 minute)

Create `.env.local` file:

\`\`\`env
NEXT_PUBLIC_FIREBASE_API_KEY=your_key_here
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_domain_here
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_bucket_here
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
\`\`\`

### 4. Run Development Server (30 seconds)

\`\`\`bash
npm run dev
\`\`\`

Visit [http://localhost:3000](http://localhost:3000) 🎉

## What You Get

✅ **Homepage** with Polymarket-style predictions  
✅ **Meme Voting** page with real-time polls  
✅ **Meme Generator** to create custom prediction memes  
✅ **Full Firebase integration** for storage and database  
✅ **Ready to deploy** on Vercel  

## Deploy to Vercel (2 minutes)

1. Push to GitHub:
\`\`\`bash
git init
git add .
git commit -m "Initial commit"
git push
\`\`\`

2. Go to [vercel.com](https://vercel.com)
3. Import your repository
4. Add your Firebase environment variables
5. Deploy!

## Need More Details?

- See [SETUP.md](SETUP.md) for detailed setup instructions
- See [README.md](README.md) for full documentation
- Check Firebase Security Rules in [SETUP.md](SETUP.md)

## Troubleshooting

**Site not loading?**  
→ Check your `.env.local` file has all Firebase config values

**Can't create polls?**  
→ Make sure Firebase Storage rules are set (see SETUP.md)

**Build errors?**  
→ Delete `node_modules`, `.next` and run `npm install` again

---

**That's it!** You now have a fully functional prediction market meme site! 🎯

