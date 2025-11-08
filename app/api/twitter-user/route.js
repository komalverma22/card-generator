import { NextResponse } from 'next/server';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const username = searchParams.get('username');

  if (!username) {
    return NextResponse.json({ error: 'Username is required' }, { status: 400 });
  }

  try {
    const BEARER_TOKEN = process.env.TWITTER_BEARER_TOKEN;
    
    if (!BEARER_TOKEN) {
      console.error('Twitter Bearer Token is not configured');
      return NextResponse.json({ 
        error: 'Twitter API is not properly configured. Please add TWITTER_BEARER_TOKEN to .env.local' 
      }, { status: 500 });
    }
    
    console.log('Making request for username:', username);
    
    // Twitter API v2 endpoint
    const url = `https://api.twitter.com/2/users/by/username/${username}?user.fields=profile_image_url,public_metrics,description,created_at,verified`;
    console.log('Fetching from URL:', url);
    
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${BEARER_TOKEN}`,
        'Content-Type': 'application/json',
      }
    });

    const responseText = await response.text();
    console.log('Raw API Response:', responseText);
    
    let userData;
    
    try {
      userData = JSON.parse(responseText);
    } catch (e) {
      console.error('Failed to parse response:', responseText);
      return NextResponse.json({ 
        error: 'Invalid JSON response from Twitter API',
        details: responseText
      }, { status: 500 });
    }

    // Handle specific Twitter API errors
    if (!response.ok) {
      console.error('Twitter API error:', {
        status: response.status,
        statusText: response.statusText,
        body: userData
      });

      // Handle specific error cases
      if (response.status === 401) {
        return NextResponse.json({ 
          error: 'Invalid or expired Twitter API credentials. Please check your Bearer Token.'
        }, { status: 401 });
      }
      
      if (response.status === 403) {
        return NextResponse.json({ 
          error: 'Access forbidden. Your API access level may not support this endpoint.'
        }, { status: 403 });
      }

      if (response.status === 404) {
        return NextResponse.json({ 
          error: `User @${username} not found on Twitter`
        }, { status: 404 });
      }

      if (response.status === 429) {
        return NextResponse.json({ 
          error: 'Rate limit exceeded. Please try again later.'
        }, { status: 429 });
      }

      return NextResponse.json({ 
        error: userData.detail || userData.title || `Twitter API error: ${response.status}`,
        details: userData
      }, { status: response.status });
    }
    
    if (!userData.data) {
      console.error('Invalid Twitter API response structure:', userData);
      return NextResponse.json({ 
        error: 'Invalid response structure from Twitter API',
        details: userData
      }, { status: 500 });
    }

    // Format the response data
    const formattedData = {
      id: userData.data.id,
      username: userData.data.username,
      name: userData.data.name,
      description: userData.data.description || '',
      profile_image_url: userData.data.profile_image_url?.replace('_normal', '_400x400') || '',
      verified: userData.data.verified || false,
      created_at: userData.data.created_at || null,
      public_metrics: {
        followers_count: userData.data.public_metrics?.followers_count || 0,
        following_count: userData.data.public_metrics?.following_count || 0,
        tweet_count: userData.data.public_metrics?.tweet_count || 0
      }
    };

    console.log('Formatted data:', formattedData);

    return NextResponse.json({ 
      success: true,
      data: formattedData 
    });

  } catch (error) {
    console.error('Twitter API Error:', error);
    
    // Check for network errors
    if (error.code === 'ENOTFOUND') {
      return NextResponse.json({ 
        error: 'Unable to connect to Twitter API. Please check your internet connection.'
      }, { status: 500 });
    }
    
    // Check for timeout errors
    if (error.name === 'AbortError' || error.name === 'TimeoutError') {
      return NextResponse.json({ 
        error: 'Request to Twitter API timed out. Please try again.'
      }, { status: 500 });
    }
    
    return NextResponse.json({ 
      error: error.message || 'Failed to fetch user data',
      details: error.toString()
    }, { status: 500 });
  }
}