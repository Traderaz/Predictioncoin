'use client';

import { useState, useEffect } from 'react';
import { useVotedPolls } from '@/hooks/useVotedPolls';

interface MemePollProps {
  poll: {
    id: string;
    question: string;
    yesVotes: number;
    noVotes: number;
    totalVotes: number;
    image?: string | null;
  };
  onVote: (vote: 'yes' | 'no') => void;
}

export default function MemePoll({ poll, onVote }: MemePollProps) {
  const { hasVoted: checkHasVoted, getVote, recordVote } = useVotedPolls();
  const [hasVoted, setHasVoted] = useState(false);
  const [selectedVote, setSelectedVote] = useState<'yes' | 'no' | null>(null);

  useEffect(() => {
    // Check if user has already voted on this poll
    if (checkHasVoted(poll.id)) {
      setHasVoted(true);
      setSelectedVote(getVote(poll.id));
    }
  }, [poll.id, checkHasVoted, getVote]);

  const yesPercentage = poll.totalVotes > 0 
    ? Math.round((poll.yesVotes / poll.totalVotes) * 100) 
    : 50;
  const noPercentage = 100 - yesPercentage;

  const handleVote = (vote: 'yes' | 'no') => {
    if (hasVoted) return;
    
    setHasVoted(true);
    setSelectedVote(vote);
    recordVote(poll.id, vote);
    onVote(vote);
  };

  return (
    <div className="prediction-card card-hover">
      {/* Image if available */}
      {poll.image && (
        <div className="mb-4 rounded-lg overflow-hidden">
          <img 
            src={poll.image} 
            alt={poll.question}
            className="w-full h-48 object-cover"
          />
        </div>
      )}

      {/* Question */}
      <h3 className="text-xl font-bold mb-6 text-center text-[rgb(var(--text-primary))]">
        {poll.question}
      </h3>

      {/* Vote Buttons or Results */}
      {!hasVoted ? (
        <div className="grid grid-cols-2 gap-4 mb-4">
          <button
            onClick={() => handleVote('yes')}
            className="poll-option py-6 flex flex-col items-center gap-2"
          >
            <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">Yes</span>
            <span className="text-sm text-[rgb(var(--text-secondary))]">{yesPercentage}%</span>
          </button>
          <button
            onClick={() => handleVote('no')}
            className="poll-option py-6 flex flex-col items-center gap-2"
          >
            <span className="text-2xl font-bold text-red-600 dark:text-red-400">No</span>
            <span className="text-sm text-[rgb(var(--text-secondary))]">{noPercentage}%</span>
          </button>
        </div>
      ) : (
        <div className="mb-4 space-y-3">
          {/* Yes Bar */}
          <div className={`poll-option ${selectedVote === 'yes' ? 'selected' : ''}`}>
            <div className="flex justify-between items-center mb-2">
              <span className="font-semibold text-blue-600 dark:text-blue-400">Yes</span>
              <span className="font-bold text-[rgb(var(--text-primary))]">{yesPercentage}%</span>
            </div>
            <div className="w-full bg-gray-300 dark:bg-gray-700 rounded-full h-2">
              <div
                className="bg-blue-600 dark:bg-blue-500 h-2 rounded-full transition-all duration-500"
                style={{ width: `${yesPercentage}%` }}
              />
            </div>
          </div>

          {/* No Bar */}
          <div className={`poll-option ${selectedVote === 'no' ? 'selected' : ''}`}>
            <div className="flex justify-between items-center mb-2">
              <span className="font-semibold text-red-600 dark:text-red-400">No</span>
              <span className="font-bold text-[rgb(var(--text-primary))]">{noPercentage}%</span>
            </div>
            <div className="w-full bg-gray-300 dark:bg-gray-700 rounded-full h-2">
              <div
                className="bg-red-600 dark:bg-red-500 h-2 rounded-full transition-all duration-500"
                style={{ width: `${noPercentage}%` }}
              />
            </div>
          </div>
        </div>
      )}

      {/* Stats */}
      <div className="text-center text-sm text-[rgb(var(--text-secondary))]">
        {poll.totalVotes} total votes
      </div>

      {/* Trade Button */}
      <button className="w-full mt-4 py-3 bg-yellow-600 hover:bg-yellow-700 dark:hover:bg-yellow-500 rounded-lg font-semibold transition text-white">
        Trade
      </button>
    </div>
  );
}

