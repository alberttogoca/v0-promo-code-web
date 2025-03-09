import { v4 as uuidv4 } from "uuid"
import type { RedeemResult, Activity } from "../entities/types"
import type { PromoCodeRepository } from "../repositories/promo-code-repository"
import type { ActivityRepository } from "../repositories/activity-repository"

export class PromoCodeUseCases {
  constructor(
    private promoCodeRepository: PromoCodeRepository,
    private activityRepository: ActivityRepository,
  ) {}

  async redeemPromoCode(code: string): Promise<RedeemResult> {
    try {
      const normalizedCode = code.toUpperCase().trim()

      // Try to redeem the code
      const result = await this.promoCodeRepository.redeemCode(normalizedCode)

      // Log the activity
      const activity: Activity = {
        id: uuidv4(),
        code: normalizedCode,
        success: result.success,
        timestamp: new Date().toISOString(),
        prizeName: result.prize?.name,
      }

      await this.activityRepository.logActivity(activity)

      return result
    } catch (error) {
      console.error("Error in redeemPromoCode use case:", error)
      return {
        success: false,
        message: "An unexpected error occurred. Please try again.",
      }
    }
  }
}

