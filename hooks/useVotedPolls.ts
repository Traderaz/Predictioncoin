import { useLocalStorage } from './useLocalStorage';

interface VotedPoll {
  pollId: string;
  vote: 'yes' | 'no';
  timestamp: number;
}

export function useVotedPolls() {
  const [votedPolls, setVotedPolls] = useLocalStorage<VotedPoll[]>('votedPolls', []);

  const hasVoted = (pollId: string): boolean => {
    return votedPolls.some(poll => poll.pollId === pollId);
  };

  const getVote = (pollId: string): 'yes' | 'no' | null => {
    const poll = votedPolls.find(p => p.pollId === pollId);
    return poll ? poll.vote : null;
  };

  const recordVote = (pollId: string, vote: 'yes' | 'no') => {
    setVotedPolls([
      ...votedPolls.filter(p => p.pollId !== pollId),
      { pollId, vote, timestamp: Date.now() }
    ]);
  };

  return { hasVoted, getVote, recordVote };
}

