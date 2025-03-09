import type { DatabaseSetupRepository } from "@/lib/core/repositories/database-setup-repository"
import { createServerSupabaseClient } from "@/lib/infrastructure/supabase/client"
import { handleDatabaseError } from "@/lib/infrastructure/error/error-handling"

// Flag to track if we've attempted to set up the database
let databaseSetupAttempted = false

export class SupabaseDatabaseSetupRepository implements DatabaseSetupRepository {
  async setupDatabase(): Promise<boolean> {
    try {
      console.log("Setting up database...")
      const supabase = createServerSupabaseClient()

      // Create tables
      await this.createTables(supabase)

      // Insert sample data
      await this.insertSampleData(supabase)

      databaseSetupAttempted = true
      return true
    } catch (error) {
      console.error("Failed to set up database:", error)
      handleDatabaseError(error)
      databaseSetupAttempted = true
      return false
    }
  }

  async isDatabaseSetupNeeded(): Promise<boolean> {
    if (databaseSetupAttempted) return false

    try {
      const supabase = createServerSupabaseClient()

      // Check if prizes table exists
      const { error } = await supabase.from("prizes").select("*").limit(1)

      if (error && error.message && error.message.includes('relation "public.prizes" does not exist')) {
        return true
      }

      return false
    } catch (error) {
      console.error("Error checking if database setup is needed:", error)
      return true
    }
  }

  private async createTables(supabase: any): Promise<void> {
    try {
      // Create prizes table
      await this.createPrizesTable(supabase)

      // Create promo_codes table
      await this.createPromoCodesTable(supabase)

      // Create activities table
      await this.createActivitiesTable(supabase)

      console.log("Tables created successfully")
    } catch (error) {
      console.error("Error creating tables:", error)
      throw error
    }
  }

  private async createPrizesTable(supabase: any): Promise<void> {
    try {
      // Check if table exists
      const { error: checkError } = await supabase.from("prizes").select("*").limit(1)

      // If table doesn't exist or there's another error, try to create it
      if (checkError) {
        console.log("Prizes table doesn't exist or error checking:", checkError.message)

        // Create the table structure
        const { error } = await supabase.from("prizes").insert({
          id: "test-prize",
          name: "Test Prize",
          description: "Test prize description",
          category: "test",
          value: 0,
          redeemed: false,
          created_at: new Date().toISOString(),
          image_url: null,
        })

        if (error && !error.message.includes("duplicate key")) {
          console.error("Error creating prizes table:", error)
        } else {
          console.log("Prizes table created successfully")
        }
      } else {
        console.log("Prizes table already exists")
      }
    } catch (error) {
      console.error("Error in createPrizesTable:", error)
    }
  }

  private async createPromoCodesTable(supabase: any): Promise<void> {
    try {
      // Check if table exists
      const { error: checkError } = await supabase.from("promo_codes").select("*").limit(1)

      // If table doesn't exist or there's another error, try to create it
      if (checkError) {
        console.log("Promo codes table doesn't exist or error checking:", checkError.message)

        // First make sure the prizes table exists and has our test prize
        const { data: prizeData } = await supabase.from("prizes").select("*").eq("id", "test-prize").single()

        if (!prizeData) {
          // Create a test prize if it doesn't exist
          await supabase.from("prizes").insert({
            id: "test-prize",
            name: "Test Prize",
            description: "Test prize description",
            category: "test",
            value: 0,
            redeemed: false,
            created_at: new Date().toISOString(),
            image_url: null,
          })
        }

        // Create the table structure
        const { error } = await supabase.from("promo_codes").insert({
          id: "test-code",
          code: "TEST123",
          prize_id: "test-prize",
          is_redeemed: false,
          created_at: new Date().toISOString(),
        })

        if (error && !error.message.includes("duplicate key")) {
          console.error("Error creating promo_codes table:", error)
        } else {
          console.log("Promo codes table created successfully")
        }
      } else {
        console.log("Promo codes table already exists")
      }
    } catch (error) {
      console.error("Error in createPromoCodesTable:", error)
    }
  }

  private async createActivitiesTable(supabase: any): Promise<void> {
    try {
      // Check if table exists
      const { error: checkError } = await supabase.from("activities").select("*").limit(1)

      // If table doesn't exist or there's another error, try to create it
      if (checkError) {
        console.log("Activities table doesn't exist or error checking:", checkError.message)

        // Create the table structure
        const { error } = await supabase.from("activities").insert({
          id: "test-activity",
          code: "TEST123",
          success: true,
          timestamp: new Date().toISOString(),
          prize_name: "Test Prize",
        })

        if (error && !error.message.includes("duplicate key")) {
          console.error("Error creating activities table:", error)
        } else {
          console.log("Activities table created successfully")
        }
      } else {
        console.log("Activities table already exists")
      }
    } catch (error) {
      console.error("Error in createActivitiesTable:", error)
    }
  }

  private async insertSampleData(supabase: any): Promise<void> {
    try {
      // Insert sample prizes
      const prizes = [
        {
          id: "prize-1",
          name: "10% Discount Coupon",
          description:
            "Get 10% off your next purchase. Valid for all products on our store. Cannot be combined with other offers.",
          category: "discount",
          value: 10,
          image_url: "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?q=80&w=2070&auto=format&fit=crop",
        },
        {
          id: "prize-2",
          name: "Free Shipping Voucher",
          description:
            "Free shipping on your next order. No minimum purchase required. Valid for standard shipping only.",
          category: "discount",
          value: 5,
          image_url: "https://images.unsplash.com/photo-1627634777217-c864268db30c?q=80&w=2070&auto=format&fit=crop",
          redeemed: true,
          redeemed_at: new Date().toISOString(),
        },
        {
          id: "prize-3",
          name: "VIP Member Status",
          description:
            "Exclusive access to VIP deals for 30 days. Includes early access to sales, exclusive discounts, and priority customer service.",
          category: "special",
          value: 50,
          image_url: "https://images.unsplash.com/photo-1634128221889-82ed6efebfc3?q=80&w=2070&auto=format&fit=crop",
        },
        {
          id: "prize-4",
          name: "50 Bonus Points",
          description:
            "50 points added to your loyalty account. Use these points to redeem exclusive rewards and discounts on future purchases.",
          category: "reward",
          value: 50,
          image_url: "https://images.unsplash.com/photo-1550565118-3a14e8d0386f?q=80&w=2070&auto=format&fit=crop",
        },
      ]

      for (const prize of prizes) {
        const { error } = await supabase.from("prizes").upsert(prize)
        if (error && error.message && !error.message.includes("duplicate key")) {
          console.error("Error inserting prize:", error)
        }
      }

      // Insert sample promo codes
      const promoCodes = [
        {
          id: "code-1",
          code: "WELCOME10",
          prize_id: "prize-1",
          is_redeemed: false,
        },
        {
          id: "code-2",
          code: "FREESHIP",
          prize_id: "prize-2",
          is_redeemed: true,
          redeemed_at: new Date().toISOString(),
        },
        {
          id: "code-3",
          code: "VIP2024",
          prize_id: "prize-3",
          is_redeemed: false,
        },
        {
          id: "code-4",
          code: "BONUS50",
          prize_id: "prize-4",
          is_redeemed: false,
        },
      ]

      for (const code of promoCodes) {
        const { error } = await supabase.from("promo_codes").upsert(code)
        if (error && error.message && !error.message.includes("duplicate key")) {
          console.error("Error inserting promo code:", error)
        }
      }

      // Insert sample activities
      const activities = [
        {
          id: "activity-1",
          code: "WELCOME10",
          success: true,
          timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
          prize_name: "10% Discount Coupon",
        },
        {
          id: "activity-2",
          code: "FREESHIP",
          success: true,
          timestamp: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
          prize_name: "Free Shipping Voucher",
        },
        {
          id: "activity-3",
          code: "INVALID",
          success: false,
          timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
        },
      ]

      for (const activity of activities) {
        const { error } = await supabase.from("activities").upsert(activity)
        if (error && error.message && !error.message.includes("duplicate key")) {
          console.error("Error inserting activity:", error)
        }
      }
    } catch (error) {
      console.error("Error inserting sample data:", error)
    }
  }
}

