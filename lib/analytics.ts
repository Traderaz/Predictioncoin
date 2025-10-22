// Analytics tracking utilities
// You can integrate with Google Analytics, Vercel Analytics, or other services

export const trackEvent = (eventName: string, properties?: Record<string, any>) => {
  if (typeof window !== 'undefined') {
    // Example for Google Analytics 4
    if ('gtag' in window) {
      (window as any).gtag('event', eventName, properties);
    }
    
    // Example for Vercel Analytics
    if ('va' in window) {
      (window as any).va('track', eventName, properties);
    }
    
    // Console log for development
    if (process.env.NODE_ENV === 'development') {
      console.log('📊 Analytics Event:', eventName, properties);
    }
  }
};

export const trackPageView = (url: string) => {
  if (typeof window !== 'undefined') {
    if ('gtag' in window) {
      (window as any).gtag('config', 'GA_MEASUREMENT_ID', {
        page_path: url,
      });
    }
    
    if (process.env.NODE_ENV === 'development') {
      console.log('📊 Page View:', url);
    }
  }
};

// Common events
export const analytics = {
  viewPrediction: (predictionId: string) => {
    trackEvent('view_prediction', { prediction_id: predictionId });
  },
  
  vote: (pollId: string, vote: 'yes' | 'no') => {
    trackEvent('vote', { poll_id: pollId, vote });
  },
  
  createMeme: (pollId: string) => {
    trackEvent('create_meme', { poll_id: pollId });
  },
  
  downloadMeme: (pollId: string) => {
    trackEvent('download_meme', { poll_id: pollId });
  },
  
  share: (type: 'twitter' | 'native', content: string) => {
    trackEvent('share', { type, content });
  },
};

