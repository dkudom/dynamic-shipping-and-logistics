import { createClient } from '@supabase/supabase-js'

// Check if the environment variables are defined or fall back to hardcoded values
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
if (!supabaseUrl) {
  throw new Error('NEXT_PUBLIC_SUPABASE_URL is not defined')
}

const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
if (!supabaseAnonKey) {
  throw new Error('NEXT_PUBLIC_SUPABASE_ANON_KEY is not defined')
}

console.log('Initializing Supabase client with URL:', supabaseUrl);

// Custom fetch implementation with retries and better error handling
const customFetch = async (url: RequestInfo | URL, options: RequestInit = {}) => {
  const maxRetries = 3;
  const retryDelay = 1000; // 1 second

  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      // Set a timeout for the fetch request
      const controller = new AbortController();
      const { signal } = controller;
      const timeoutId = setTimeout(() => controller.abort(), 15000); // 15 second timeout

      const response = await fetch(url, {
        ...options,
        signal,
        headers: {
          ...options.headers,
          'Content-Type': 'application/json',
        },
      });

      clearTimeout(timeoutId);

      // Check if the response is ok
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return response;
    } catch (error) {
      console.error(`Attempt ${attempt} failed:`, error);

      // If it's the last attempt, throw the error
      if (attempt === maxRetries) {
        throw new Error(`Failed to fetch after ${maxRetries} attempts: ${error instanceof Error ? error.message : 'Unknown error'}`);
      }

      // Wait before retrying
      await new Promise(resolve => setTimeout(resolve, retryDelay * attempt));
    }
  }

  // This should never be reached due to the throw in the loop
  throw new Error('Failed to fetch');
};

// Create the Supabase client with the custom fetch implementation
const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
    flowType: 'pkce',
  },
  global: {
    fetch: customFetch,
  },
  // Increase timeouts for better reliability
  db: {
    schema: 'public',
  },
})

export default supabase 