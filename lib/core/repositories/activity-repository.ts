import type { Activity } from "../entities/types"

export interface ActivityRepository {
  getRecentActivities(): Promise<Activity[]>
  clearAllActivities(): Promise<boolean>
  logActivity(activity: Activity): Promise<void>
}

