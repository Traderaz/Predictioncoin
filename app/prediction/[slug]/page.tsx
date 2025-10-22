'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Prediction } from '@/types';

export default function PredictionDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const [prediction, setPrediction] = useState<Prediction | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPrediction() {
      try {
        // Try to fetch from Firestore first
        const { db } = await import('@/lib/firebase');
        const { doc, getDoc } = await import('firebase/firestore');
        
        const docRef = doc(db, 'predictions', params.slug as string);
        const docSnap = await getDoc(docRef);
        
        if (docSnap.exists()) {
          console.log('✅ Loaded prediction from Firestore:', params.slug);
          setPrediction(docSnap.data() as Prediction);
          setLoading(false);
        } else {
          // Fallback to localStorage if not in Firestore
          console.log('⚠️ Prediction not found in Firestore, checking localStorage...');
          const stored = localStorage.getItem(`prediction-${params.slug}`);
          if (stored) {
            console.log('✅ Loaded prediction from localStorage:', params.slug);
            setPrediction(JSON.parse(stored));
            setLoading(false);
          } else {
            console.log('❌ Prediction not found anywhere, redirecting...');
            router.push('/');
          }
        }
      } catch (error) {
        console.error('❌ Error fetching prediction from Firestore:', error);
        // Fallback to localStorage on error
        const stored = localStorage.getItem(`prediction-${params.slug}`);
        if (stored) {
          setPrediction(JSON.parse(stored));
          setLoading(false);
        } else {
          router.push('/');
        }
      }
    }
    
    fetchPrediction();
  }, [params.slug, router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }

  if (!prediction) {
    return null;
  }

  return (
    <div className="min-h-screen pb-20">
      <div className="container-custom pt-8">
        {/* Back Button */}
        <button
          onClick={() => router.back()}
          className="mb-6 flex items-center gap-2 text-gray-400 hover:text-white transition"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Markets
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content - Left Side */}
          <div className="lg:col-span-2 space-y-6">
            {/* Header */}
            <div className="prediction-card">
              <div className="flex items-center gap-3 mb-4">
                <span className="px-3 py-1 bg-yellow-500 text-black text-xs font-semibold rounded">
                  {prediction.category}
                </span>
                <span className="text-sm text-gray-400">{prediction.date}</span>
              </div>
              
              <h1 className="text-3xl font-bold mb-6">{prediction.title}</h1>

              {prediction.image && (
                <img
                  src={prediction.image}
                  alt={prediction.title}
                  className="w-full h-64 object-cover rounded-lg mb-6"
                />
              )}

              {/* Probability Bar */}
              <div className="mb-6">
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-semibold text-green-400">
                    YES {prediction.yesPercentage}%
                  </span>
                  <span className="text-sm font-semibold text-red-400">
                    NO {prediction.noPercentage}%
                  </span>
                </div>
                <div className="h-3 bg-gray-800 rounded-full overflow-hidden flex">
                  <div
                    className="bg-green-500 transition-all"
                    style={{ width: `${prediction.yesPercentage}%` }}
                  />
                  <div
                    className="bg-red-500 transition-all"
                    style={{ width: `${prediction.noPercentage}%` }}
                  />
                </div>
              </div>

              {/* Trading Prices */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-green-900/20 border border-green-700/50 rounded-lg p-4">
                  <div className="text-xs text-gray-400 mb-1">YES Price</div>
                  <div className="text-xl font-bold text-green-400">
                    {prediction.yesPercentage}¢
                  </div>
                  <div className="text-xs text-gray-500 mt-1">{prediction.yesPrice}</div>
                </div>
                <div className="bg-red-900/20 border border-red-700/50 rounded-lg p-4">
                  <div className="text-xs text-gray-400 mb-1">NO Price</div>
                  <div className="text-xl font-bold text-red-400">
                    {prediction.noPercentage}¢
                  </div>
                  <div className="text-xs text-gray-500 mt-1">{prediction.noPrice}</div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3">
                {prediction.url && (
                  <a
                    href={prediction.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 py-3 bg-yellow-700 hover:bg-yellow-600 rounded-lg font-semibold transition text-center flex items-center justify-center gap-2"
                  >
                    🔄 Trade on Polymarket
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>
                )}
              </div>
            </div>

            {/* Market Context */}
            {prediction.description && (
              <div className="prediction-card">
                <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                  📋 Market Context
                </h2>
                <div className="text-gray-300 leading-relaxed whitespace-pre-line">
                  {prediction.description}
                </div>
              </div>
            )}

            {/* Rules Section */}
            <div className="prediction-card">
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                📜 Rules
              </h2>
              <div className="text-gray-300 leading-relaxed">
                <p>This market will resolve based on the outcome of the prediction question.</p>
                <p className="mt-2">Market resolution will be determined by verifiable sources and credible reporting.</p>
              </div>
            </div>
          </div>

          {/* Sidebar - Right Side */}
          <div className="space-y-6">
            {/* About Card */}
            <div className="prediction-card">
              <h3 className="text-xl font-bold mb-4">About</h3>
              <div className="space-y-3">
                <div>
                  <div className="text-xs text-gray-400 mb-1">Volume</div>
                  <div className="text-lg font-semibold">${prediction.volume}</div>
                </div>
                <div>
                  <div className="text-xs text-gray-400 mb-1">End Date</div>
                  <div className="text-lg font-semibold">{prediction.date}</div>
                </div>
                <div>
                  <div className="text-xs text-gray-400 mb-1">Liquidity</div>
                  <div className="text-lg font-semibold">{prediction.liquidity}</div>
                </div>
                <div>
                  <div className="text-xs text-gray-400 mb-1">Markets</div>
                  <div className="text-lg font-semibold">{prediction.markets}</div>
                </div>
              </div>
            </div>

            {/* Volume Stats */}
            <div className="prediction-card">
              <h3 className="text-xl font-bold mb-4">Volume Stats</h3>
              <div className="space-y-3">
                <div>
                  <div className="text-xs text-gray-400 mb-1">Total Volume</div>
                  <div className="text-lg font-semibold">${prediction.volume}</div>
                </div>
                {(prediction as any).volume24hr && (
                  <div>
                    <div className="text-xs text-gray-400 mb-1">24h Volume</div>
                    <div className="text-lg font-semibold">${(prediction as any).volume24hr}</div>
                  </div>
                )}
                {(prediction as any).volume1wk && (
                  <div>
                    <div className="text-xs text-gray-400 mb-1">1 Week Volume</div>
                    <div className="text-lg font-semibold">${(prediction as any).volume1wk}</div>
                  </div>
                )}
              </div>
            </div>

            {/* Liquidity Stats */}
            <div className="prediction-card">
              <h3 className="text-xl font-bold mb-4">Liquidity Stats</h3>
              <div className="space-y-3">
                <div>
                  <div className="text-xs text-gray-400 mb-1">Total Liquidity</div>
                  <div className="text-lg font-semibold">{prediction.liquidity}</div>
                </div>
                {(prediction as any).liquidityClob && (
                  <div>
                    <div className="text-xs text-gray-400 mb-1">CLOB Liquidity</div>
                    <div className="text-lg font-semibold">${(prediction as any).liquidityClob}</div>
                  </div>
                )}
                {(prediction as any).liquidityAmm && (
                  <div>
                    <div className="text-xs text-gray-400 mb-1">AMM Liquidity</div>
                    <div className="text-lg font-semibold">${(prediction as any).liquidityAmm}</div>
                  </div>
                )}
              </div>
            </div>

            {/* Market Details */}
            <div className="prediction-card">
              <h3 className="text-xl font-bold mb-4">Market Details</h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-400">Category:</span>
                  <span className="font-semibold">{prediction.category}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Status:</span>
                  <span className="font-semibold text-green-400">Open</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Resolution:</span>
                  <span className="font-semibold text-gray-500">Pending</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

