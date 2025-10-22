'use client';

interface ShareButtonProps {
  text: string;
  url?: string;
}

export default function ShareButton({ text, url }: ShareButtonProps) {
  const handleShare = async () => {
    const shareUrl = url || window.location.href;
    const shareText = `${text} 🎯\n\nVote now on Prediction Coin!\n`;

    // Try native share first (mobile)
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Prediction Coin',
          text: shareText,
          url: shareUrl,
        });
      } catch (err) {
        console.log('Share cancelled');
      }
    } else {
      // Fallback to Twitter
      const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`;
      window.open(twitterUrl, '_blank', 'width=550,height=420');
    }
  };

  return (
    <button
      onClick={handleShare}
      className="px-4 py-2 bg-prediction-card hover:bg-gray-700 rounded-lg font-semibold transition border border-gray-700 flex items-center gap-2"
    >
      <span>🐦</span>
      <span>Share</span>
    </button>
  );
}

