'use client';

import { forwardRef } from 'react';

interface MemeTemplateProps {
  question: string;
  image?: string | null;
}

const MemeTemplate = forwardRef<HTMLDivElement, MemeTemplateProps>(
  ({ question, image }, ref) => {
    return (
      <div ref={ref} className="relative w-full bg-white rounded-2xl overflow-hidden shadow-2xl">
        {/* Blue Gradient Header with Logo */}
        <div className="bg-gradient-to-r from-blue-600 via-blue-500 to-purple-600 h-28 flex items-center px-8 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent" />
          <div className="w-14 h-14 bg-white rounded-xl flex items-center justify-center shadow-lg relative z-10 p-2">
            <img 
              src="/icon.png" 
              alt="Prediction Coin" 
              className="w-full h-full object-contain"
            />
          </div>
        </div>

        {/* Content Area */}
        <div className="p-8 bg-gradient-to-br from-gray-50 to-white">
          {/* Question */}
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-8 leading-tight">
            {question}
          </h2>

          {/* Image and Poll Side by Side */}
          <div className="grid grid-cols-2 gap-6 mb-8">
            {/* Poll Options */}
            <div className="flex flex-col gap-4">
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 border-2 border-blue-400 rounded-xl p-5 text-center shadow-lg transform hover:scale-105 transition-transform">
                <div className="text-xl font-bold text-gray-900 mb-1">Yes</div>
                <div className="text-4xl font-black text-blue-600">57%</div>
              </div>
              <div className="bg-gradient-to-br from-red-50 to-red-100 border-2 border-red-400 rounded-xl p-5 text-center shadow-lg transform hover:scale-105 transition-transform">
                <div className="text-xl font-bold text-gray-900 mb-1">No</div>
                <div className="text-4xl font-black text-red-600">43%</div>
              </div>
            </div>

            {/* Image */}
            <div className="flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl overflow-hidden shadow-lg border-2 border-gray-300">
              {image ? (
                <img
                  src={image}
                  alt="Meme"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="text-center text-gray-500 p-6">
                  <div className="text-5xl mb-3">🖼️</div>
                  <p className="text-sm font-semibold">Your image here</p>
                </div>
              )}
            </div>
          </div>

          {/* Bottom Info */}
          <div className="grid grid-cols-4 gap-4 text-center">
            <div className="bg-white rounded-lg p-3 shadow-md">
              <div className="text-xs text-gray-500 font-semibold mb-1">Date</div>
              <div className="text-sm font-bold text-gray-900">$</div>
            </div>
            <div className="bg-white rounded-lg p-3 shadow-md">
              <div className="text-xs text-gray-500 font-semibold mb-1">Volume</div>
              <div className="text-sm font-bold text-gray-900">$</div>
            </div>
            <div className="bg-white rounded-lg p-3 shadow-md">
              <div className="text-xs text-gray-500 font-semibold mb-1">Liquidity</div>
              <div className="text-sm font-bold text-gray-900">$</div>
            </div>
            <div>
              <button className="w-full bg-gradient-to-r from-yellow-400 to-yellow-500 text-black px-6 py-3 rounded-xl font-black hover:from-yellow-500 hover:to-orange-500 transition-all shadow-lg hover:shadow-xl transform hover:scale-105">
                Trade
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
);

MemeTemplate.displayName = 'MemeTemplate';

export default MemeTemplate;

