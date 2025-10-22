'use client';

import { useState, useRef } from 'react';
import { db, storage } from '@/lib/firebase';
import { collection, addDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import MemeTemplate from '@/components/MemeTemplate';

export default function MemeGeneratorPage() {
  const [question, setQuestion] = useState('');
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [generating, setGenerating] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const memeRef = useRef<HTMLDivElement>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setUploadedImage(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleGenerate = async () => {
    if (!question || !uploadedImage) {
      alert('Please provide both a question and an image!');
      return;
    }

    setGenerating(true);

    try {
      // Convert base64 image to blob
      const response = await fetch(uploadedImage);
      const blob = await response.blob();

      // Upload the original image to Firebase Storage
      const storageRef = ref(storage, `memes/${Date.now()}.png`);
      const snapshot = await uploadBytes(storageRef, blob);
      const imageUrl = await getDownloadURL(snapshot.ref);

      // Create poll in Firestore with just the uploaded image
      await addDoc(collection(db, 'memePolls'), {
        question,
        image: imageUrl,
        yesVotes: 0,
        noVotes: 0,
        totalVotes: 0,
        createdAt: new Date().toISOString()
      });

      alert('Meme prediction created successfully!');
      
      // Reset form
      setQuestion('');
      setUploadedImage(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    } catch (error) {
      console.error('Error creating meme:', error);
      alert('Error creating meme. Please try again!');
    } finally {
      setGenerating(false);
    }
  };

  const handleDownload = async () => {
    if (!memeRef.current) return;

    try {
      const html2canvas = (await import('html2canvas')).default;
      const canvas = await html2canvas(memeRef.current);
      
      const link = document.createElement('a');
      link.download = 'prediction-meme.png';
      link.href = canvas.toDataURL();
      link.click();
    } catch (error) {
      console.error('Error downloading meme:', error);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-5xl font-bold mb-4 gradient-text">
          Meme Generator
        </h1>
        <p className="text-xl text-[rgb(var(--text-secondary))]">
          Create your own prediction market memes
        </p>
      </div>

      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Controls */}
        <div className="space-y-6">
          <div className="prediction-card">
            <h2 className="text-2xl font-bold mb-4 text-[rgb(var(--text-primary))]">Create Your Meme</h2>
            
            {/* Question Input */}
            <div className="mb-4">
              <label className="block text-sm font-semibold mb-2 text-[rgb(var(--text-primary))]">
                Prediction Question
              </label>
              <input
                type="text"
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                placeholder="Enter your prediction question..."
                className="w-full px-4 py-3 bg-white dark:bg-prediction-dark border border-gray-300 dark:border-gray-700 rounded-lg focus:border-blue-500 dark:focus:border-prediction-blue focus:outline-none text-gray-900 dark:text-white"
                maxLength={100}
              />
              <p className="text-xs text-[rgb(var(--text-secondary))] mt-1">
                {question.length}/100 characters
              </p>
            </div>

            {/* Image Upload */}
            <div className="mb-6">
              <label className="block text-sm font-semibold mb-2 text-[rgb(var(--text-primary))]">
                Upload Image
              </label>
              <div className="mb-2 p-3 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
                <p className="text-xs text-blue-700 dark:text-blue-300 font-medium">
                  💡 <strong>Recommended:</strong> 1200x630px (landscape) or 1080x1080px (square) for best results
                </p>
              </div>
              <div className="border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-lg p-8 text-center hover:border-blue-500 dark:hover:border-prediction-blue transition cursor-pointer">
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                  id="image-upload"
                />
                <label htmlFor="image-upload" className="cursor-pointer">
                  <div>
                    <div className="text-4xl mb-2">📸</div>
                    <p className="text-[rgb(var(--text-secondary))]">{uploadedImage ? 'Image uploaded! Click to change' : 'Click to upload image'}</p>
                    <p className="text-xs text-[rgb(var(--text-secondary))] mt-1">
                      PNG, JPG, GIF up to 10MB
                    </p>
                  </div>
                </label>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              <button
                onClick={handleGenerate}
                disabled={!question || !uploadedImage || generating}
                className="w-full py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white rounded-xl font-bold transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl hover:scale-[1.02] flex items-center justify-center gap-2"
              >
                {generating ? (
                  <>
                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Creating...
                  </>
                ) : (
                  <>🚀 Create & Publish Poll</>
                )}
              </button>
              <button
                onClick={handleDownload}
                disabled={!question || !uploadedImage}
                className="w-full py-4 bg-gradient-to-r from-gray-700 to-gray-800 hover:from-gray-600 hover:to-gray-700 text-white rounded-xl font-bold transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl hover:scale-[1.02]"
              >
                💾 Download Meme
              </button>
            </div>
          </div>

          {/* Tips */}
          <div className="prediction-card">
            <h3 className="font-bold mb-3 text-[rgb(var(--text-primary))] flex items-center gap-2">
              <span className="text-2xl">💡</span>
              <span>Tips for Great Memes</span>
            </h3>
            <ul className="text-sm text-[rgb(var(--text-secondary))] space-y-3">
              <li className="flex items-start gap-2">
                <span className="text-blue-500 font-bold">•</span>
                <span>Keep questions short and punchy</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-purple-500 font-bold">•</span>
                <span>Use high-quality, funny images</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-500 font-bold">•</span>
                <span>Make it relatable to CT (Crypto Twitter)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-purple-500 font-bold">•</span>
                <span>Controversial topics get more engagement</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Preview */}
        <div className="space-y-6">
          <div className="prediction-card">
            <h2 className="text-2xl font-bold mb-4 text-[rgb(var(--text-primary))]">Preview</h2>
            <MemeTemplate
              ref={memeRef}
              question={question || ''}
              image={uploadedImage}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

