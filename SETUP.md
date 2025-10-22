# Prediction Coin - Setup Guide

Follow these steps to get your Prediction Coin website up and running!

## Step 1: Install Dependencies

Open your terminal in the project directory and run:

\`\`\`bash
npm install
\`\`\`

## Step 2: Set Up Firebase

### Create Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Add project"
3. Name it "Prediction Coin" (or your preferred name)
4. Disable Google Analytics (optional)
5. Click "Create project"

### Enable Firestore Database

1. In your Firebase project, click "Firestore Database" in the left sidebar
2. Click "Create database"
3. Choose "Start in production mode"
4. Select a location close to your users
5. Click "Enable"

### Enable Storage

1. Click "Storage" in the left sidebar
2. Click "Get started"
3. Use the default security rules for now
4. Click "Done"

### Get Your Configuration

1. Click the gear icon (⚙️) next to "Project Overview"
2. Select "Project settings"
3. Scroll down to "Your apps"
4. Click the web icon (</>)
5. Register your app with a nickname (e.g., "Prediction Coin Web")
6. Copy the configuration values

### Configure Security Rules

#### Firestore Rules

1. Go to Firestore Database → Rules
2. Replace with:

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

3. Click "Publish"

#### Storage Rules

1. Go to Storage → Rules
2. Replace with:

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

3. Click "Publish"

## Step 3: Create Environment File

1. Create a file named `.env.local` in the root directory
2. Add your Firebase configuration:

\`\`\`env
NEXT_PUBLIC_FIREBASE_API_KEY=AIza...
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=123456789
NEXT_PUBLIC_FIREBASE_APP_ID=1:123456789:web:abc123
\`\`\`

3. Replace the values with your actual Firebase configuration

## Step 4: Run Development Server

\`\`\`bash
npm run dev
\`\`\`

Open [http://localhost:3000](http://localhost:3000) to see your site!

## Step 5: Deploy to Vercel

### Prepare for Deployment

1. Create a GitHub repository
2. Push your code:

\`\`\`bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/yourusername/prediction-coin.git
git push -u origin main
\`\`\`

### Deploy on Vercel

1. Go to [vercel.com](https://vercel.com)
2. Sign in with GitHub
3. Click "Add New" → "Project"
4. Import your repository
5. Configure environment variables:
   - Add all your \`NEXT_PUBLIC_FIREBASE_*\` variables
6. Click "Deploy"

Your site will be live in a few minutes! 🎉

## Testing the Features

### Test Homepage
- Visit the homepage to see Polymarket-style predictions
- Click through the filter tabs (All, Volume, Open)

### Test Meme Voting
1. Go to "Meme Votes" in the navigation
2. Click on Yes or No to vote
3. See the results update in real-time

### Test Meme Generator
1. Go to "Meme Generator"
2. Enter a prediction question
3. Upload an image
4. Click "Create & Publish Poll"
5. Download or publish your meme

## Troubleshooting

### Firebase Connection Issues
- Double-check your environment variables
- Make sure `.env.local` is in the root directory
- Restart the development server after changing `.env.local`

### Build Errors
- Run \`npm install\` again
- Delete \`node_modules\` and \`.next\` folders, then run \`npm install\`

### Image Upload Not Working
- Check Firebase Storage rules are published
- Verify your Storage bucket name in Firebase config

## Next Steps

1. **Customize Branding**: Update colors in \`tailwind.config.js\`
2. **Add More Polls**: Create default polls in Firestore
3. **Connect Real Polymarket API**: Update \`lib/polymarket.ts\`
4. **Add Analytics**: Install Vercel Analytics
5. **Custom Domain**: Add your domain in Vercel settings

## Need Help?

- Check the README.md for more information
- Review Firebase documentation: [firebase.google.com/docs](https://firebase.google.com/docs)
- Check Next.js docs: [nextjs.org/docs](https://nextjs.org/docs)

Happy meme creating! 🚀

