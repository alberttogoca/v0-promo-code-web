import type { Activity } from "@/lib/core/entities/types"
import type { ActivityRepository } from "@/lib/core/repositories/activity-repository"
import { createServerSupabaseClient } from "@/lib/infrastructure/supabase/client"
import { handleDatabaseError } from "@/lib/infrastructure/error/error-handling"

export class SupabaseActivityRepository implements ActivityRepository {
  async getRecentActivities(): Promise<Activity[]> {
    try {
      const supabase = createServerSupabaseClient()
      const { data, error } = await supabase
        .from("activities")
        .select("*")
        .order("timestamp", { ascending: false })
        .limit(50)

      if (error) {
        throw error
      }

      return this.transformActivities(data || [])
    } catch (error) {
      console.error("Failed to fetch activities:", error)
      handleDatabaseError(error)
      return []
    }
  }

  async clearAllActivities(): Promise<boolean> {
    try {
      const supabase = createServerSupabaseClient()
      const { error } = await supabase.from("activities").delete().neq("id", "placeholder") // Delete all records

      if (error) {
        throw error
      }

      return true
    } catch (error) {
      console.error("Failed to clear activities:", error)
      handleDatabaseError(error)
      return false
    }
  }

  async logActivity(activity: Activity): Promise<void> {
    try {
      const supabase = createServerSupabaseClient()
      const { error } = await supabase.from("activities").insert({
        id: activity.id,
        code: activity.code,
        success: activity.success,
        timestamp: activity.timestamp,
        prize_name: activity.prizeName || null,
      })

      if (error) {
        throw error
      }
    } catch (error) {
      console.error("Error logging activity:", error)
      handleDatabaseError(error)
    }
  }

  private transformActivities(data: any[]): Activity[] {
    return data.map((activity) => ({
      id: activity.id,
      code: activity.code,
      success: activity.success,
      timestamp: activity.timestamp,
      prizeName: activity.prize_name || undefined,
    }))
  }
}

