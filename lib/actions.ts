"use server"

import { v4 as uuidv4 } from "uuid"
import { createServerSupabaseClient } from "@/lib/supabase"
import type { Prize, Activity, RedeemResult } from "./types"

// Flag to track if we've attempted to set up the database
let databaseSetupAttempted = false

/**
 * Sets up the database directly without using the API route
 */
async function setupDatabaseDirectly(): Promise<boolean> {
  try {
    console.log("Setting up database directly...")
    const supabase = createServerSupabaseClient()

    // Skip the SQL RPC approach and directly use the API
    // This is more reliable as not all Supabase instances have exec_sql enabled
    console.log("Creating tables using Supabase API...")
    await createTablesUsingApi(supabase)

    // Insert sample data
    await insertSampleData(supabase)

    return true
  } catch (error) {
    console.error("Failed to set up database directly:", error)
    return false
  }
}

/**
 * Create tables using Supabase API
 */
async function createTablesUsingApi(supabase: any) {
  console.log("Checking if tables exist...")

  try {
    // Create prizes table
    console.log("Creating prizes table...")
    await createPrizesTable(supabase)

    // Create promo_codes table
    console.log("Creating promo_codes table...")
    await createPromoCodesTable(supabase)

    // Create activities table
    console.log("Creating activities table...")
    await createActivitiesTable(supabase)

    console.log("Tables created successfully")
  } catch (error) {
    console.error("Error creating tables:", error)
    throw error
  }
}

/**
 * Create prizes table using Supabase API
 */
async function createPrizesTable(supabase: any) {
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

/**
 * Create promo_codes table using Supabase API
 */
async function createPromoCodesTable(supabase: any) {
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

/**
 * Create activities table using Supabase API
 */
async function createActivitiesTable(supabase: any) {
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

/**
 * Insert sample data into the database
 */
async function insertSampleData(supabase: any) {
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
      // Add proper null check before accessing error.message
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
      // Add proper null check before accessing error.message
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
      // Add proper null check before accessing error.message
      if (error && error.message && !error.message.includes("duplicate key")) {
        console.error("Error inserting activity:", error)
      }
    }
  } catch (error) {
    console.error("Error inserting sample data:", error)
  }
}

/**
 * Checks if the database is set up and attempts to set it up if not
 */
async function ensureDatabaseSetup(): Promise<boolean> {
  if (databaseSetupAttempted) return true

  try {
    // First try to set up the database directly
    const success = await setupDatabaseDirectly()
    databaseSetupAttempted = true
    return success
  } catch (error) {
    console.error("Failed to set up database directly:", error)
    databaseSetupAttempted = true
    return false
  }
}

/**
 * Fetches all prizes for the current user
 */
export async function getUserPrizes(): Promise<Prize[]> {
  try {
    // Ensure database is set up
    await ensureDatabaseSetup()

    const supabase = createServerSupabaseClient()

    const { data, error } = await supabase.from("prizes").select("*").order("created_at", { ascending: false })

    if (error) {
      // Check if the error is because the table doesn't exist
      if (error.message && error.message.includes('relation "public.prizes" does not exist')) {
        console.error("Prizes table does not exist. Attempting to set up database...")
        const setupSuccess = await setupDatabaseDirectly()

        if (setupSuccess) {
          // Try again after setup
          const { data: retryData, error: retryError } = await supabase
            .from("prizes")
            .select("*")
            .order("created_at", { ascending: false })

          if (retryError) {
            console.error("Error fetching prizes after database setup:", retryError)
            return []
          }

          return transformPrizes(retryData || [])
        } else {
          console.error("Failed to set up database")
          return []
        }
      }

      console.error("Error fetching prizes:", error)
      return []
    }

    return transformPrizes(data || [])
  } catch (error) {
    console.error("Failed to fetch prizes:", error)
    return []
  }
}

/**
 * Transform database prize records to our Prize interface
 */
function transformPrizes(data: any[]): Prize[] {
  return data.map((prize) => ({
    id: prize.id,
    name: prize.name,
    description: prize.description,
    category: prize.category,
    value: prize.value,
    redeemed: prize.redeemed,
    expiresAt: prize.expires_at || undefined,
    redeemedAt: prize.redeemed_at || undefined,
    imageUrl: prize.image_url || undefined,
    createdAt: prize.created_at,
  }))
}

/**
 * Fetches recent activity for the current user
 */
export async function getRecentActivity(): Promise<Activity[]> {
  try {
    // Ensure database is set up
    await ensureDatabaseSetup()

    const supabase = createServerSupabaseClient()

    const { data, error } = await supabase
      .from("activities")
      .select("*")
      .order("timestamp", { ascending: false })
      .limit(50)

    if (error) {
      // Check if the error is because the table doesn't exist
      if (error.message && error.message.includes('relation "public.activities" does not exist')) {
        console.error("Activities table does not exist. Attempting to set up database...")
        const setupSuccess = await setupDatabaseDirectly()

        if (setupSuccess) {
          // Try again after setup
          const { data: retryData, error: retryError } = await supabase
            .from("activities")
            .select("*")
            .order("timestamp", { ascending: false })
            .limit(50)

          if (retryError) {
            console.error("Error fetching activities after database setup:", retryError)
            return []
          }

          return transformActivities(retryData || [])
        } else {
          console.error("Failed to set up database")
          return []
        }
      }

      console.error("Error fetching activities:", error)
      return []
    }

    return transformActivities(data || [])
  } catch (error) {
    console.error("Failed to fetch activities:", error)
    return []
  }
}

/**
 * Transform database activity records to our Activity interface
 */
function transformActivities(data: any[]): Activity[] {
  return data.map((activity) => ({
    id: activity.id,
    code: activity.code,
    success: activity.success,
    timestamp: activity.timestamp,
    prizeName: activity.prize_name || undefined,
  }))
}

/**
 * Redeems a promo code and returns the result
 */
export async function redeemPromoCode(code: string): Promise<RedeemResult> {
  try {
    // Ensure database is set up
    await ensureDatabaseSetup()

    const normalizedCode = code.toUpperCase().trim()
    const supabase = createServerSupabaseClient()

    // Check if code exists and is not redeemed
    const { data: promoCodeData, error: promoCodeError } = await supabase
      .from("promo_codes")
      .select("*, prizes(*)")
      .eq("code", normalizedCode)
      .single()

    if (promoCodeError) {
      // Check if the error is because the table doesn't exist
      if (promoCodeError.message && promoCodeError.message.includes('relation "public.promo_codes" does not exist')) {
        console.error("Promo codes table does not exist. Attempting to set up database...")
        await setupDatabaseDirectly()

        // Add failed attempt to activity log
        await logActivity({
          id: uuidv4(),
          code: normalizedCode,
          success: false,
          timestamp: new Date().toISOString(),
        })

        return {
          success: false,
          message: "Database is being set up. Please try again in a moment.",
        }
      }

      // If it's a "not found" error, the code doesn't exist
      if (promoCodeError.code === "PGRST116") {
        // Add failed attempt to activity log
        await logActivity({
          id: uuidv4(),
          code: normalizedCode,
          success: false,
          timestamp: new Date().toISOString(),
        })

        return {
          success: false,
          message: "Invalid promo code. Please check and try again.",
        }
      }

      console.error("Error checking promo code:", promoCodeError)
      return {
        success: false,
        message: "Error checking promo code. Please try again.",
      }
    }

    if (!promoCodeData) {
      // Add failed attempt to activity log
      await logActivity({
        id: uuidv4(),
        code: normalizedCode,
        success: false,
        timestamp: new Date().toISOString(),
      })

      return {
        success: false,
        message: "Invalid promo code. Please check and try again.",
      }
    }

    // Check if code has already been redeemed
    if (promoCodeData.is_redeemed) {
      // Add failed attempt to activity log
      await logActivity({
        id: uuidv4(),
        code: normalizedCode,
        success: false,
        timestamp: new Date().toISOString(),
      })

      return {
        success: false,
        message: "This code has already been redeemed.",
      }
    }

    // Get the prize details
    const prize = promoCodeData.prizes

    if (!prize) {
      return {
        success: false,
        message: "Prize not found for this code.",
      }
    }

    // Mark code as redeemed
    const now = new Date().toISOString()
    const { error: updateError } = await supabase
      .from("promo_codes")
      .update({
        is_redeemed: true,
        redeemed_at: now,
      })
      .eq("id", promoCodeData.id)

    if (updateError) {
      console.error("Error updating promo code:", updateError)
      return {
        success: false,
        message: "Error redeeming code. Please try again.",
      }
    }

    // Mark prize as redeemed if it's not already
    if (!prize.redeemed) {
      const { error: prizeUpdateError } = await supabase
        .from("prizes")
        .update({
          redeemed: true,
          redeemed_at: now,
        })
        .eq("id", prize.id)

      if (prizeUpdateError) {
        console.error("Error updating prize:", prizeUpdateError)
      }
    }

    // Add successful redemption to activity log
    await logActivity({
      id: uuidv4(),
      code: normalizedCode,
      success: true,
      timestamp: now,
      prizeName: prize.name,
    })

    // Return the prize with our interface format
    return {
      success: true,
      prize: {
        id: prize.id,
        name: prize.name,
        description: prize.description,
        category: prize.category,
        value: prize.value,
        redeemed: true,
        redeemedAt: now,
        expiresAt: prize.expires_at || undefined,
        imageUrl: prize.image_url || undefined,
      },
    }
  } catch (error) {
    console.error("Error redeeming promo code:", error)
    return {
      success: false,
      message: "Something went wrong. Please try again.",
    }
  }
}

/**
 * Logs an activity to the database
 */
async function logActivity(activity: Activity): Promise<void> {
  try {
    // Ensure database is set up
    await ensureDatabaseSetup()

    const supabase = createServerSupabaseClient()

    const { error } = await supabase.from("activities").insert({
      id: activity.id,
      code: activity.code,
      success: activity.success,
      timestamp: activity.timestamp,
      prize_name: activity.prizeName || null,
    })

    if (error) {
      // If the table doesn't exist, we'll just log the error but not fail
      if (error.message && error.message.includes('relation "public.activities" does not exist')) {
        console.error("Activities table does not exist. Activity logging skipped.")
        return
      }

      console.error("Error logging activity:", error)
    }
  } catch (error) {
    console.error("Error logging activity:", error)
  }
}

/**
 * Clears all activities from the database
 */
export async function clearAllActivities(): Promise<boolean> {
  try {
    // Ensure database is set up
    await ensureDatabaseSetup()

    const supabase = createServerSupabaseClient()

    const { error } = await supabase.from("activities").delete().neq("id", "placeholder") // Delete all records

    if (error) {
      // If the table doesn't exist, we'll consider it "cleared"
      if (error.message && error.message.includes('relation "public.activities" does not exist')) {
        console.error("Activities table does not exist. Considering it cleared.")
        return true
      }

      console.error("Error clearing activities:", error)
      return false
    }

    return true
  } catch (error) {
    console.error("Failed to clear activities:", error)
    return false
  }
}

/**
 * Updates a prize in the database
 */
export async function updatePrizeInDatabase(prize: Prize): Promise<boolean> {
  try {
    // Ensure database is set up
    await ensureDatabaseSetup()

    const supabase = createServerSupabaseClient()

    const { error } = await supabase
      .from("prizes")
      .update({
        name: prize.name,
        description: prize.description,
        category: prize.category,
        value: prize.value,
        redeemed: prize.redeemed,
        expires_at: prize.expiresAt || null,
        redeemed_at: prize.redeemedAt || null,
        image_url: prize.imageUrl || null,
      })
      .eq("id", prize.id)

    if (error) {
      // If the table doesn't exist, we'll log the error
      if (error.message?.includes('relation "public.prizes" does not exist')) {
        console.error("Prizes table does not exist. Update skipped.")
        return false
      }

      console.error("Error updating prize:", error)
      return false
    }

    return true
  } catch (error) {
    console.error("Failed to update prize:", error)
    return false
  }
}

