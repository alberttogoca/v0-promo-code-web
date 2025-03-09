import type { Activity } from "../entities/types"
import type { ActivityRepository } from "../repositories/activity-repository"

export class ActivityUseCases {
  constructor(private activityRepository: ActivityRepository) {}

  async getRecentActivities(): Promise<Activity[]> {
    return this.activityRepository.getRecentActivities()
  }

  async clearAllActivities(): Promise<boolean> {
    return this.activityRepository.clearAllActivities()
  }

  async logActivity(activity: Activity): Promise<void> {
    return this.activityRepository.logActivity(activity)
  }
}

