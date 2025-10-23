'use client';

import { forwardRef } from 'react';

interface MemeTemplateProps {
  question: string;
  image?: string | null;
  yesPercentage?: number;
  noPercentage?: number;
}

const MemeTemplate = forwardRef<HTMLDivElement, MemeTemplateProps>(
  ({ question, image, yesPercentage = 57, noPercentage = 43 }, ref) => {
    return (
      <div ref={ref} className="relative w-full bg-white rounded-2xl overflow-hidden shadow-2xl">
        {/* Image Header - Your uploaded image goes here */}
        {image ? (
          <div className="w-full h-64 relative overflow-hidden">
            <img 
              src={image} 
              alt="Meme" 
              className="w-full h-full object-cover"
            />
          </div>
        ) : (
          <div className="w-full h-64 bg-gradient-to-r from-blue-600 via-blue-500 to-purple-600 flex items-center justify-center">
            <div className="text-center text-white">
              <div className="text-6xl mb-3">🖼️</div>
              <p className="text-xl font-bold">Upload your image</p>
            </div>
          </div>
        )}

        {/* Content Area */}
        <div className="p-8 bg-gradient-to-br from-gray-50 to-white">
          {/* Question */}
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-8 leading-tight">
            {question}
          </h2>

          {/* Poll Options - Full Width */}
          <div className="grid grid-cols-2 gap-6 mb-8">
            <div className="bg-white p-5 text-center border-2 border-black rounded-lg">
              <div className="text-xl font-bold text-gray-900 mb-1">Yes</div>
              <div className="text-4xl font-black text-blue-600">{yesPercentage}%</div>
            </div>
            <div className="bg-white p-5 text-center border-2 border-black rounded-lg">
              <div className="text-xl font-bold text-gray-900 mb-1">No</div>
              <div className="text-4xl font-black text-red-600">{noPercentage}%</div>
            </div>
          </div>

          {/* Bottom Info */}
          <div className="grid grid-cols-4 gap-4 text-center">
            <div className="bg-white p-3 border-2 border-black rounded-lg">
              <div className="text-xs text-gray-500 font-semibold mb-1">Date</div>
              <div className="text-sm font-bold text-gray-900">$</div>
            </div>
            <div className="bg-white p-3 border-2 border-black rounded-lg">
              <div className="text-xs text-gray-500 font-semibold mb-1">Volume</div>
              <div className="text-sm font-bold text-gray-900">$</div>
            </div>
            <div className="bg-white p-3 border-2 border-black rounded-lg">
              <div className="text-xs text-gray-500 font-semibold mb-1">Liquidity</div>
              <div className="text-sm font-bold text-gray-900">$</div>
            </div>
            <div>
              <button className="w-full bg-gradient-to-r from-yellow-400 to-yellow-500 text-black px-6 py-3 rounded-xl font-black">
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

