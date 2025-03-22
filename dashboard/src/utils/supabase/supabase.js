import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client with proper URL and key
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// Add some debug logging
if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('Missing Supabase environment variables!', { 
    hasUrl: !!supabaseUrl, 
    hasKey: !!supabaseAnonKey 
  });
}

export const supabase = createClient(
  supabaseUrl || '',
  supabaseAnonKey || '',
  {
    auth: {
      persistSession: true, // Make sure session persistence is enabled
      autoRefreshToken: true, // Auto refresh token
    },
  }
);

// Debug log to confirm client creation
console.log('Supabase client initialized:', { 
  url: supabaseUrl?.substring(0, 15) + '...',
  hasKey: !!supabaseAnonKey
});