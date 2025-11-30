import { NextRequest, NextResponse } from 'next/server';

const NEWS_API_KEY = process.env.NEWS_API_KEY || 'a1a016ba720a41dfb7e9014fd5dc12ef';
const NEWS_API_URL = 'https://newsapi.org/v2/top-headlines';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const page = searchParams.get('page') || '1';git add .
  const q = searchParams.get('q') || '';
  const country = searchParams.get('country') || 'us';
  const pageSize = searchParams.get('pageSize') || '10';

  try {
    const url = new URL(NEWS_API_URL);
    url.searchParams.append('country', country);
    url.searchParams.append('pageSize', pageSize);
    url.searchParams.append('page', page);
    url.searchParams.append('apiKey', NEWS_API_KEY);
    
    if (q) {
      url.searchParams.append('q', q);
    }

    const response = await fetch(url.toString(), {
      headers: {
        'Accept': 'application/json',
      },
      next: { revalidate: 300 }, // Кеш на 5 минут
    });

    if (!response.ok) {
      const error = await response.json();
      return NextResponse.json(
        { error: error.message || 'Failed to fetch news' },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('News API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
