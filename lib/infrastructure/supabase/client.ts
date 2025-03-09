import { createClient } from "@supabase/supabase-js"
import type { Database } from "@/lib/infrastructure/supabase/database.types"

// Create a single supabase client for the entire application
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ""
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ""

// Check if we're in development mode and provide fallbacks for local development
const isDevelopment = process.env.NODE_ENV === "development"

if (!supabaseUrl || !supabaseAnonKey) {
  if (isDevelopment) {
    console.warn("Missing Supabase environment variables. Using mock data in development mode.")
  } else {
    console.error("Missing Supabase environment variables. Please check your .env file.")
  }
}

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey)

// Create a server-side client with service role for admin operations
export const createServerSupabaseClient = () => {
  const supabaseUrl = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL || ""
  const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || ""

  if (!supabaseUrl) {
    console.error("Missing Supabase URL environment variable")
    if (isDevelopment) {
      console.warn("Using a placeholder URL for development. Database operations will fail.")
      return createClient("https://placeholder-url.supabase.co", supabaseAnonKey, {
        auth: {
          persistSession: false,
        },
      })
    }
    throw new Error("Missing Supabase URL environment variable")
  }

  if (!supabaseServiceKey) {
    console.warn("Missing Supabase service role key. Using anon key instead.")
    return createClient<Database>(supabaseUrl, supabaseAnonKey, {
      auth: {
        persistSession: false,
      },
    })
  }

  return createClient<Database>(supabaseUrl, supabaseServiceKey, {
    auth: {
      persistSession: false,
    },
  })
}

// Helper function to check if Supabase is properly configured
export const isSupabaseConfigured = () => {
  return Boolean(supabaseUrl && supabaseAnonKey)
}

