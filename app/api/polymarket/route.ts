import { NextResponse } from 'next/server';

// Force dynamic rendering for this route
export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET(request: Request) {
  try {
    // Get limit from query params or default to 50
    const { searchParams } = new URL(request.url);
    const limit = searchParams.get('limit') || '50';
    
    // Fetch from Polymarket API server-side (bypasses CORS)
    const response = await fetch(`https://gamma-api.polymarket.com/events?limit=${limit}&active=true&closed=false`, {
      headers: {
        'Accept': 'application/json',
      },
      // Cache for 30 seconds for fresher data
      next: { revalidate: 30 }
    });

    if (!response.ok) {
      console.error(`Polymarket API error: ${response.status}`);
      return NextResponse.json({ error: 'Failed to fetch from Polymarket' }, { status: response.status });
    }

    const data = await response.json();
    
    // Return the data with CORS headers
    return NextResponse.json(data, {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET',
        'Access-Control-Allow-Headers': 'Content-Type',
      },
    });
  } catch (error) {
    console.error('Error in Polymarket proxy:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

