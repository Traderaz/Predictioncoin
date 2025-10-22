'use client';

import { useRouter } from 'next/navigation';
import { Prediction } from '@/types';

interface PredictionCardProps {
  prediction: Prediction;
}

export default function PredictionCard({ prediction }: PredictionCardProps) {
  const router = useRouter();

  const handleAnalyze = async () => {
    try {
      // Create a slug from the title
      const slug = prediction.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');
      
      // Store prediction data in Firestore
      const { db } = await import('@/lib/firebase');
      const { doc, setDoc } = await import('firebase/firestore');
      
      await setDoc(doc(db, 'predictions', slug), {
        ...prediction,
        slug,
        updatedAt: new Date().toISOString(),
      });
      
      console.log('✅ Saved prediction to Firestore:', slug);
      
      // Navigate to the details page
      router.push(`/prediction/${slug}`);
    } catch (error) {
      console.error('❌ Error saving prediction to Firestore:', error);
      // Fallback to localStorage if Firebase fails
      const slug = prediction.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');
      localStorage.setItem(`prediction-${slug}`, JSON.stringify(prediction));
      router.push(`/prediction/${slug}`);
    }
  };
  return (
    <div className="prediction-card card-hover group relative overflow-hidden">
      {/* Animated gradient overlay on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
      
      {/* Category Badge & Date */}
      <div className="flex items-center justify-between mb-4 relative z-10">
        <span className="px-4 py-1.5 bg-gradient-to-r from-yellow-400 to-yellow-500 dark:from-yellow-500 dark:to-yellow-600 text-black font-bold rounded-lg uppercase tracking-wide text-xs shadow-lg">
          {prediction.category}
        </span>
        <span className="text-xs text-[rgb(var(--text-secondary))] font-semibold">{prediction.date}</span>
      </div>

      {/* Image if available */}
      {prediction.image && (
        <div className="mb-5 rounded-xl overflow-hidden relative shadow-lg group-hover:shadow-2xl transition-shadow duration-500">
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10" />
          <img 
            src={prediction.image} 
            alt={prediction.title}
            className="w-full h-44 object-cover transform group-hover:scale-110 transition-transform duration-700 ease-out"
          />
        </div>
      )}

      {/* Title */}
      <h3 className="text-base font-semibold mb-3 line-clamp-2 text-[rgb(var(--text-primary))] leading-snug min-h-[2.5rem]">
        {prediction.title}
      </h3>

      {/* Volume & Markets */}
      <div className="mb-4">
        <p className="text-sm text-[rgb(var(--text-primary))] font-medium mb-1">
          ${prediction.volume} <span className="text-[rgb(var(--text-secondary))] text-xs">Vol.</span>
        </p>
        <p className="text-xs text-[rgb(var(--text-secondary))]">Markets ({prediction.markets})</p>
      </div>

      {/* Prediction Question */}
      <p className="text-xs text-[rgb(var(--text-secondary))] mb-2 line-clamp-1">{prediction.title}</p>

      {/* Yes/No Bars */}
      <div className="grid grid-cols-2 gap-2 mb-4">
        <div className="bg-green-50 dark:bg-green-900/20 border-2 border-green-500 dark:border-green-700 rounded-md p-3 text-center">
          <div className="text-xs font-bold !text-blue-600 dark:!text-green-400 mb-1">YES</div>
          <div className="text-3xl font-black !text-blue-700 dark:!text-green-400">{prediction.yesPercentage}%</div>
        </div>
        <div className="bg-red-50 dark:bg-red-900/20 border-2 border-red-500 dark:border-red-700 rounded-md p-3 text-center">
          <div className="text-xs font-bold !text-yellow-600 dark:!text-red-400 mb-1">NO</div>
          <div className="text-3xl font-black !text-yellow-700 dark:!text-red-400">{prediction.noPercentage}%</div>
        </div>
      </div>

      {/* Price Range */}
      <div className="flex justify-between text-xs mb-4">
        <span className="text-blue-700 dark:text-green-400 font-medium">{prediction.yesPrice}</span>
        <span className="text-yellow-700 dark:text-red-400 font-medium">{prediction.noPrice}</span>
      </div>

      {/* Status Badge */}
      <div className="mb-4 flex items-center gap-2">
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-green-500/10 dark:bg-green-900/30 text-green-600 dark:text-green-400 text-xs font-medium rounded">
          <span className="w-1.5 h-1.5 bg-green-500 dark:bg-green-400 rounded-full"></span>
          Open
        </span>
        <span className="text-xs text-[rgb(var(--text-secondary))]">{prediction.markets}</span>
      </div>

      {/* Action Buttons */}
      <div className="space-y-3 relative z-10">
        <button 
          onClick={handleAnalyze}
          className="w-full py-3 bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-400 hover:to-orange-400 rounded-xl text-sm font-bold transition-all duration-300 text-white flex items-center justify-center gap-2 shadow-lg hover:shadow-xl hover:scale-[1.02]"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
          </svg>
          Analyze
        </button>
        {prediction.url ? (
          <a
            href={prediction.url}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-3 bg-slate-900 hover:bg-slate-800 dark:bg-slate-800 dark:hover:bg-slate-700 rounded-xl text-sm font-bold transition-all duration-300 border-2 border-slate-700 dark:border-slate-600 flex items-center justify-center gap-2 text-white shadow-lg hover:shadow-xl hover:scale-[1.02] group/link"
          >
            <svg className="w-4 h-4 group-hover/link:rotate-45 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
            Trade on Polymarket
          </a>
        ) : (
          <button className="w-full py-3 bg-gray-200 dark:bg-gray-800 rounded-xl text-sm font-semibold border border-[rgb(var(--border-color))] opacity-50 cursor-not-allowed text-[rgb(var(--text-secondary))]">
            Trade on Polymarket
          </button>
        )}
      </div>
    </div>
  );
}
