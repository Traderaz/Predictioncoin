// Application constants

export const SITE_CONFIG = {
  name: 'Prediction Coin',
  shortName: 'PredictCoin',
  description: 'Using prediction markets to meme everything on CT',
  url: 'https://your-domain.vercel.app', // Update this after deployment!
  twitter: '@predictcnsol',
  twitterUrl: 'https://x.com/predictcnsol',
  firebaseProject: 'predictioncoin-38591',
};

export const ROUTES = {
  home: '/',
  memeVotes: '/meme-votes',
  memeGenerator: '/meme-generator',
};

export const COLORS = {
  predictionBlue: '#0066FF',
  predictionDark: '#0A0A0A',
  predictionCard: '#1A1A1A',
};

export const FIREBASE_COLLECTIONS = {
  memePolls: 'memePolls',
};

export const LIMITS = {
  maxImageSize: 10 * 1024 * 1024, // 10MB
  maxQuestionLength: 100,
  pollsPerPage: 12,
};

export const SOCIAL_SHARE = {
  twitter: {
    base: 'https://twitter.com/intent/tweet',
    hashtags: ['PredictionCoin', 'CryptoTwitter', 'Polymarket'],
  },
};

export const ERROR_MESSAGES = {
  firebaseNotConfigured: 'Firebase is not configured. Please check your environment variables.',
  uploadFailed: 'Failed to upload image. Please try again.',
  voteFailed: 'Failed to record vote. Please try again.',
  createPollFailed: 'Failed to create poll. Please try again.',
  imageTooLarge: `Image must be less than ${LIMITS.maxImageSize / 1024 / 1024}MB`,
  questionTooLong: `Question must be less than ${LIMITS.maxQuestionLength} characters`,
};

export const SUCCESS_MESSAGES = {
  voteRecorded: 'Vote recorded successfully!',
  pollCreated: 'Meme prediction created successfully!',
  imageDownloaded: 'Meme downloaded successfully!',
};

