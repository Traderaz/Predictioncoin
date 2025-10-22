# Prediction Coin 🎯

A prediction market meme platform inspired by Polymarket. Create, share, and vote on prediction market memes with your crypto community!

## Features

- 📊 **Live Predictions**: Display real prediction markets from Polymarket
- 🗳️ **Meme Voting**: Vote on community-created prediction memes (no money involved)
- 🎨 **Meme Generator**: Create custom prediction market memes with images and polls
- 🔥 **Real-time Updates**: Polls update in real-time with Firebase
- 💎 **Beautiful UI**: Modern design with Prediction Coin branding

## Tech Stack

- **Frontend**: Next.js 14 + React 18 + TypeScript
- **Styling**: Tailwind CSS
- **Database**: Firebase Firestore
- **Storage**: Firebase Storage
- **Hosting**: Vercel
- **Meme Generation**: html2canvas

## Getting Started

### Prerequisites

- Node.js 18+ installed
- Firebase project set up
- Vercel account (for deployment)

### Installation

1. Clone the repository:
\`\`\`bash
git clone <your-repo-url>
cd prediction-coin
\`\`\`

2. Install dependencies:
\`\`\`bash
npm install
\`\`\`

3. Set up Firebase:
   - Create a new Firebase project at [firebase.google.com](https://firebase.google.com)
   - Enable Firestore Database
   - Enable Storage
   - Copy your Firebase configuration

4. Create a `.env.local` file in the root directory:
\`\`\`env
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_storage_bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
\`\`\`

5. Run the development server:
\`\`\`bash
npm run dev
\`\`\`

6. Open [http://localhost:3000](http://localhost:3000) in your browser

## Firebase Setup

### Firestore Database Structure

Create a collection called \`memePolls\` with the following structure:

\`\`\`
memePolls/
  {pollId}/
    - question: string
    - image: string (URL)
    - yesVotes: number
    - noVotes: number
    - totalVotes: number
    - createdAt: timestamp
\`\`\`

### Firestore Security Rules

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

### Storage Security Rules

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

## Deployment to Vercel

1. Push your code to GitHub

2. Go to [vercel.com](https://vercel.com) and import your repository

3. Add your environment variables in Vercel:
   - Go to Project Settings → Environment Variables
   - Add all your Firebase configuration variables

4. Deploy! Vercel will automatically build and deploy your site

## Pages

- **/** - Home page with Polymarket predictions
- **/meme-votes** - Vote on community meme predictions
- **/meme-generator** - Create your own meme predictions

## Customization

### Branding Colors

Edit `tailwind.config.js` to change the color scheme:

\`\`\`javascript
colors: {
  'prediction-blue': '#0066FF', // Your primary color
  'prediction-dark': '#0A0A0A', // Background
  'prediction-card': '#1A1A1A', // Card background
}
\`\`\`

### Logo

Replace the "P" logo in the header with your own logo image.

## Polymarket Integration

The app currently uses mock data for Polymarket predictions. To integrate real Polymarket data:

1. Sign up for Polymarket API access
2. Update `lib/polymarket.ts` with your API credentials
3. Implement the `fetchRealPolymarketData()` function

## Contributing

Contributions are welcome! Feel free to open issues and pull requests.

## License

MIT License - feel free to use this project however you'd like!

## Support

For questions or support, reach out on Twitter [@predictioncoin](https://x.com/predictcnsol)

---

Built with ❤️ using Cursor and Claude 4.5 Sonnet

