// Type definitions for Prediction Coin

export interface Prediction {
  title: string;
  category: string;
  date: string;
  volume: string;
  yesPercentage: number;
  noPercentage: number;
  yesPrice: string;
  noPrice: string;
  liquidity: string;
  markets: number;
  image?: string;
  url?: string; // Polymarket URL
  description?: string; // Market context/description
}

export interface MemePoll {
  id: string;
  question: string;
  yesVotes: number;
  noVotes: number;
  totalVotes: number;
  image?: string | null;
  createdAt?: string;
}

export interface FirebaseConfig {
  apiKey: string;
  authDomain: string;
  projectId: string;
  storageBucket: string;
  messagingSenderId: string;
  appId: string;
}

