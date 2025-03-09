export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[]

export interface Database {
  public: {
    Tables: {
      prizes: {
        Row: {
          id: string
          name: string
          description: string
          category: string
          value: number
          redeemed: boolean
          created_at: string
          expires_at: string | null
          redeemed_at: string | null
          image_url: string | null
        }
        Insert: {
          id: string
          name: string
          description: string
          category: string
          value: number
          redeemed?: boolean
          created_at?: string
          expires_at?: string | null
          redeemed_at?: string | null
          image_url?: string | null
        }
        Update: {
          id?: string
          name?: string
          description?: string
          category?: string
          value?: number
          redeemed?: boolean
          created_at?: string
          expires_at?: string | null
          redeemed_at?: string | null
          image_url?: string | null
        }
      }
      promo_codes: {
        Row: {
          id: string
          code: string
          prize_id: string
          is_redeemed: boolean
          created_at: string
          redeemed_at: string | null
        }
        Insert: {
          id: string
          code: string
          prize_id: string
          is_redeemed?: boolean
          created_at?: string
          redeemed_at?: string | null
        }
        Update: {
          id?: string
          code?: string
          prize_id?: string
          is_redeemed?: boolean
          created_at?: string
          redeemed_at?: string | null
        }
      }
      activities: {
        Row: {
          id: string
          code: string
          success: boolean
          timestamp: string
          prize_name: string | null
        }
        Insert: {
          id: string
          code: string
          success: boolean
          timestamp?: string
          prize_name?: string | null
        }
        Update: {
          id?: string
          code?: string
          success?: boolean
          timestamp?: string
          prize_name?: string | null
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}

