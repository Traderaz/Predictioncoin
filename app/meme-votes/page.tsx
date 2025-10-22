'use client';

import { useState, useEffect } from 'react';
import { db } from '@/lib/firebase';
import { collection, addDoc, getDocs, updateDoc, doc, increment } from 'firebase/firestore';
import MemePoll from '@/components/MemePoll';
import ShareButton from '@/components/ShareButton';

export default function MemeVotesPage() {
  const [polls, setPolls] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadPolls();
  }, []);

  const loadPolls = async () => {
    try {
      const pollsCollection = collection(db, 'memePolls');
      const pollsSnapshot = await getDocs(pollsCollection);
      const pollsData = pollsSnapshot.docs.map((doc: any) => ({
        id: doc.id,
        ...doc.data()
      }));
      setPolls(pollsData);
    } catch (error) {
      console.error('❌ Error loading polls:', error);
      setPolls([]);
    } finally {
      setLoading(false);
    }
  };

  const handleVote = async (pollId: string, vote: 'yes' | 'no') => {
    try {
      const pollRef = doc(db, 'memePolls', pollId);
      const field = vote === 'yes' ? 'yesVotes' : 'noVotes';
      
      await updateDoc(pollRef, {
        [field]: increment(1),
        totalVotes: increment(1)
      });

      // Update local state
      setPolls(polls.map(poll => {
        if (poll.id === pollId) {
          return {
            ...poll,
            [field]: poll[field] + 1,
            totalVotes: poll.totalVotes + 1
          };
        }
        return poll;
      }));
    } catch (error) {
      console.error('❌ Error voting:', error);
      alert('Failed to submit vote. Please check your Firebase permissions.');
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-5xl font-bold mb-4 gradient-text">
          Meme Predictions
        </h1>
        <p className="text-xl text-[rgb(var(--text-secondary))]">
          Vote on the funniest prediction market memes - no money, just vibes
        </p>
      </div>

      {/* Loading State */}
      {loading && (
        <div className="text-center py-20">
          <div className="inline-block animate-spin rounded-full h-16 w-16 border-4 border-blue-500/20 border-t-blue-500"></div>
          <p className="mt-6 text-lg text-[rgb(var(--text-secondary))] font-semibold">Loading meme predictions...</p>
        </div>
      )}

      {/* Polls Grid */}
      {!loading && polls.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {polls.map((poll) => (
            <MemePoll
              key={poll.id}
              poll={poll}
              onVote={(vote) => handleVote(poll.id, vote)}
            />
          ))}
        </div>
      )}

      {/* No Polls Message */}
      {!loading && polls.length === 0 && (
        <div className="text-center py-20 prediction-card max-w-2xl mx-auto">
          <div className="text-6xl mb-6">🎭</div>
          <p className="text-2xl font-bold text-[rgb(var(--text-primary))] mb-3">No meme polls yet!</p>
          <p className="text-lg text-[rgb(var(--text-secondary))] mb-8">Be the first to create a hilarious prediction meme.</p>
          <a
            href="/meme-generator"
            className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white rounded-xl font-bold transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 inline-flex items-center gap-2"
          >
            🚀 Create First Poll
          </a>
        </div>
      )}

      {/* Call to Action */}
      <div className="mt-16 text-center prediction-card max-w-2xl mx-auto">
        <h3 className="text-2xl font-bold mb-3 text-[rgb(var(--text-primary))]">
          Create Your Own
        </h3>
        <p className="text-[rgb(var(--text-secondary))] mb-6">
          Have an idea for a hilarious prediction market meme?
        </p>
        <div className="flex gap-4 justify-center items-center flex-wrap">
          <a
            href="/meme-generator"
            className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white rounded-xl font-bold transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 inline-flex items-center gap-2"
          >
            🚀 Create Meme Prediction
          </a>
          <ShareButton text="Check out these hilarious prediction market memes!" />
        </div>
      </div>
    </div>
  );
}

