// Polymarket API Integration

export interface Prediction {
  title: string;
  category: string;
  date: string;
  volume: string;
  yesPercentage: number;
  noPercentage: number;
  yesPrice: string;
  noPrice: string;
  liquidity: string;
  markets: number;
  image?: string;
}

// Fetch real Polymarket data from API
export async function fetchPolymarketPredictions(): Promise<Prediction[]> {
  try {
    console.log('🔄 Fetching from Polymarket API...');
    // Use our Next.js API route (bypasses CORS) - fetch more to get better variety
    const response = await fetch('/api/polymarket', {
      headers: {
        'Accept': 'application/json',
      },
      // Add timeout
      signal: AbortSignal.timeout(10000), // 10 second timeout
    });
    
    if (!response.ok) {
      console.error(`❌ Polymarket API responded with status: ${response.status}`);
      const errorText = await response.text();
      console.error('Error details:', errorText);
      return [];
    }
    
    const data = await response.json();
    console.log('✅ Polymarket API Response received:', data.length, 'events');
    
    // Check if we got valid data
    if (!Array.isArray(data) || data.length === 0) {
      console.error('No valid data from Polymarket API');
      return [];
    }
    
    // Transform Polymarket data to our format
    const predictions: Prediction[] = data
      .filter((event: any) => event.markets && event.markets.length > 0)
      .map((event: any) => {
        const market = event.markets[0]; // Get first market
        
        // Get Yes/No prices - check both event and market levels
        let yesPercentage = 50;
        let noPercentage = 50;
        
        // Try to get outcomePrices from either event or market
        const outcomePricesRaw = event.outcomePrices || market.outcomePrices;
        
        // Parse if it's a JSON string
        let outcomePrices = outcomePricesRaw;
        if (typeof outcomePricesRaw === 'string') {
          try {
            outcomePrices = JSON.parse(outcomePricesRaw);
          } catch (e) {
            console.error('Failed to parse outcomePrices:', e);
          }
        }
        
        if (outcomePrices && Array.isArray(outcomePrices) && outcomePrices.length >= 2) {
          // outcomePrices is an array of strings representing probabilities (0.0 to 1.0)
          const yesPrice = parseFloat(outcomePrices[0]);
          const noPrice = parseFloat(outcomePrices[1]);
          
          if (!isNaN(yesPrice) && !isNaN(noPrice)) {
            yesPercentage = Math.round(yesPrice * 100);
            noPercentage = Math.round(noPrice * 100);
          }
        }
        
        // Calculate volume
        const volume = parseFloat(market.volume || event.volume || 0);
        const liquidity = parseFloat(market.liquidity || 0);
        
        return {
          title: event.title || market.question || 'Unknown Market',
          category: event.category || 'General',
          date: market.endDate || event.endDate 
            ? new Date(market.endDate || event.endDate).toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
                year: 'numeric'
              })
            : 'TBD',
          volume: formatVolume(volume),
          yesPercentage,
          noPercentage,
          yesPrice: `$${formatVolume(volume * (yesPercentage / 100))}`,
          noPrice: `$${formatVolume(volume * (noPercentage / 100))}`,
          liquidity: getLiquidityLevel(liquidity),
          markets: event.markets?.length || 1,
          image: event.image || market.image || undefined,
          url: event.slug ? `https://polymarket.com/event/${event.slug}` : undefined,
          description: event.description || market.description || undefined,
          // Additional stats for detail page
          volume24hr: event.volume24hr ? formatVolume(parseFloat(event.volume24hr)) : undefined,
          volume1wk: event.volume1wk ? formatVolume(parseFloat(event.volume1wk)) : undefined,
          liquidityClob: event.liquidityClob ? formatVolume(parseFloat(event.liquidityClob)) : undefined,
          liquidityAmm: event.liquidityAmm ? formatVolume(parseFloat(event.liquidityAmm)) : undefined,
        } as any;
      });
    
    console.log(`✅ Successfully transformed ${predictions.length} markets from Polymarket`);
    return predictions;
    
  } catch (error) {
    console.error('❌ Error fetching Polymarket data:', error);
    if (error instanceof Error) {
      console.error('Error message:', error.message);
    }
    return [];
  }
}

// Helper function to format large numbers
function formatVolume(num: number): string {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + 'M';
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'K';
  }
  return num.toFixed(0);
}

// Helper function to determine liquidity level
function getLiquidityLevel(liquidity: number): string {
  if (liquidity > 100000) return 'High';
  if (liquidity > 10000) return 'Medium';
  return 'Low';
}

