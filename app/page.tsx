'use client';

import { useState, useEffect } from 'react';
import PredictionCard from '@/components/PredictionCard';
import { fetchPolymarketPredictions } from '@/lib/polymarket';

export default function Home() {
  const [predictions, setPredictions] = useState<any[]>([]);
  const [allPredictions, setAllPredictions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('All Categories');
  const [searchTerm, setSearchTerm] = useState('');
  const [displayLimit, setDisplayLimit] = useState(20);

  useEffect(() => {
    loadPredictions();
  }, []);

  const loadPredictions = async () => {
    try {
      // Fetch real Polymarket data
      const data = await fetchPolymarketPredictions();
      
      if (!data || data.length === 0) {
        console.error('❌ No predictions returned from API');
        setAllPredictions([]);
        setPredictions([]);
      } else {
        console.log('✅ Loaded', data.length, 'predictions from Polymarket API');
        setAllPredictions(data);
        setPredictions(data);
      }
    } catch (error) {
      console.error('❌ Error loading predictions:', error);
      setAllPredictions([]);
      setPredictions([]);
    } finally {
      setLoading(false);
    }
  };

  // Filter predictions by category
  const filterByCategory = (category: string) => {
    setCategoryFilter(category);
    if (category === 'All Categories') {
      setPredictions(allPredictions);
    } else {
      const filtered = allPredictions.filter((pred) => {
        // More flexible matching - checks if category is in the prediction category
        const predCategory = pred.category?.toLowerCase() || '';
        const filterCategory = category.toLowerCase();
        return predCategory.includes(filterCategory) || filterCategory.includes(predCategory);
      });
      setPredictions(filtered);
      
      // Debug log to see what categories we're getting
      if (filtered.length === 0) {
        console.log(`No results for category: ${category}`);
        console.log('Available categories:', Array.from(new Set(allPredictions.map(p => p.category))));
      }
    }
  };

  // Get unique categories directly from API data
  const apiCategories = Array.from(new Set(allPredictions.map(p => p.category).filter(Boolean)));
  
  // Display "All Categories" + actual API categories
  const displayCategories = [
    'All Categories',
    ...apiCategories.sort() // Sort alphabetically
  ];

  // Filter by search term
  const searchFilteredPredictions = searchTerm.trim() === '' 
    ? predictions 
    : predictions.filter(pred => 
        pred.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        pred.category.toLowerCase().includes(searchTerm.toLowerCase())
      );

  // Sort predictions based on filter
  const sortedPredictions = [...searchFilteredPredictions].sort((a, b) => {
    switch (filter) {
      case 'volume':
        // Sort by highest volume
        const volA = parseFloat(a.volume.replace(/[^0-9.]/g, '')) || 0;
        const volB = parseFloat(b.volume.replace(/[^0-9.]/g, '')) || 0;
        return volB - volA;
      
      case 'newest':
        // Sort by newest date first
        const dateA = new Date(a.date).getTime();
        const dateB = new Date(b.date).getTime();
        return dateB - dateA;
      
      case 'liquidity':
        // Sort by liquidity level
        const liqMap: any = { 'High': 3, 'Medium': 2, 'Low': 1 };
        return (liqMap[b.liquidity] || 0) - (liqMap[a.liquidity] || 0);
      
      default:
        return 0;
    }
  });

  // Limit displayed predictions
  const displayedPredictions = sortedPredictions.slice(0, displayLimit);
  const hasMore = sortedPredictions.length > displayLimit;

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Hero Section */}
      <div className="text-center mb-12">
        <h1 className="text-5xl font-bold mb-4 gradient-text">
          Prediction Markets
        </h1>
        <p className="text-xl text-[rgb(var(--text-secondary))]">
          Using prediction markets to meme everything on CT
        </p>
      </div>

      {/* Search Bar */}
      <div className="max-w-2xl mx-auto mb-6">
        <div className="relative">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search predictions (e.g., Bitcoin, Ethereum, Trump, etc.)"
            className="w-full px-6 py-3 bg-[rgb(var(--bg-card))] text-[rgb(var(--text-primary))] rounded-lg border border-[rgb(var(--border-color))] focus:border-[rgb(var(--accent-blue))] focus:outline-none pl-12"
          />
          <svg 
            className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[rgb(var(--text-secondary))]"
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-[rgb(var(--text-secondary))] hover:text-[rgb(var(--text-primary))]"
            >
              ✕
            </button>
          )}
        </div>
        {searchTerm && (
          <p className="text-sm text-[rgb(var(--text-secondary))] mt-2">
            Showing {searchFilteredPredictions.length} result{searchFilteredPredictions.length !== 1 ? 's' : ''} for "{searchTerm}"
          </p>
        )}
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row justify-center items-center gap-4 mb-8">
        {/* Category Dropdown */}
        <div className="relative">
          <select
            value={categoryFilter}
            onChange={(e) => filterByCategory(e.target.value)}
            className="px-6 py-2 bg-[rgb(var(--bg-card))] text-[rgb(var(--text-primary))] rounded-lg border border-[rgb(var(--border-color))] focus:border-[rgb(var(--accent-blue))] focus:outline-none cursor-pointer hover:bg-[rgb(var(--bg-secondary))] transition appearance-none pr-10"
          >
            {displayCategories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-[rgb(var(--text-secondary))]">
            <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
              <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
            </svg>
          </div>
        </div>

        {/* Sort Dropdown */}
        <div className="relative">
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="px-6 py-2 bg-[rgb(var(--bg-card))] text-[rgb(var(--text-primary))] rounded-lg border border-[rgb(var(--border-color))] focus:border-[rgb(var(--accent-blue))] focus:outline-none cursor-pointer hover:bg-[rgb(var(--bg-secondary))] transition appearance-none pr-10"
          >
            <option value="all">All</option>
            <option value="volume">Volume</option>
            <option value="newest">Newest</option>
            <option value="liquidity">Liquidity</option>
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-[rgb(var(--text-secondary))]">
            <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
              <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
            </svg>
          </div>
        </div>
      </div>

      {/* Loading State */}
      {loading && (
        <div className="text-center py-20">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-[rgb(var(--accent-blue))]"></div>
          <p className="mt-4 text-[rgb(var(--text-secondary))]">Loading predictions...</p>
        </div>
      )}

      {/* Results Count & Display Limit */}
      {!loading && sortedPredictions.length > 0 && (
        <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
          <p className="text-[rgb(var(--text-secondary))]">
            Showing <span className="text-[rgb(var(--text-primary))] font-semibold">{displayedPredictions.length}</span> of{' '}
            <span className="text-[rgb(var(--text-primary))] font-semibold">{sortedPredictions.length}</span> predictions
          </p>
          
          <div className="flex items-center gap-2">
            <span className="text-[rgb(var(--text-secondary))] text-sm">Show:</span>
            {[20, 50, 75, 100].map((limit) => (
              <button
                key={limit}
                onClick={() => setDisplayLimit(limit)}
                className={`px-4 py-2 rounded-lg transition text-sm ${
                  displayLimit === limit
                    ? 'bg-[rgb(var(--accent-blue))] text-white'
                    : 'bg-[rgb(var(--bg-card))] text-[rgb(var(--text-secondary))] hover:text-[rgb(var(--text-primary))] border border-[rgb(var(--border-color))]'
                }`}
              >
                {limit}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Predictions Grid */}
      {!loading && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {displayedPredictions.map((prediction, index) => (
            <PredictionCard key={index} prediction={prediction} />
          ))}
        </div>
      )}

      {/* Load More Button */}
      {!loading && hasMore && (
        <div className="text-center mt-8">
          <button
            onClick={() => setDisplayLimit(prev => Math.min(prev + 20, sortedPredictions.length))}
            className="btn-prediction inline-flex items-center gap-2"
          >
            Load More
            <span className="text-sm">({sortedPredictions.length - displayLimit} remaining)</span>
          </button>
        </div>
      )}

      {/* Empty State */}
      {!loading && sortedPredictions.length === 0 && (
        <div className="text-center py-20">
          <p className="text-[rgb(var(--text-secondary))] text-lg">
            {categoryFilter === 'All Categories' 
              ? 'No predictions found' 
              : `No predictions found in ${categoryFilter} category`}
          </p>
          <button
            onClick={() => filterByCategory('All Categories')}
            className="mt-4 btn-prediction"
          >
            Show All Categories
          </button>
        </div>
      )}
    </div>
  );
}

