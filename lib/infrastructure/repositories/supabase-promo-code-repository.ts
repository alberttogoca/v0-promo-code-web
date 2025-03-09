import type { RedeemResult } from "@/lib/core/entities/types"
import type { PromoCodeRepository } from "@/lib/core/repositories/promo-code-repository"
import { createServerSupabaseClient } from "@/lib/infrastructure/supabase/client"
import { handleDatabaseError } from "@/lib/infrastructure/error/error-handling"

export class SupabasePromoCodeRepository implements PromoCodeRepository {
  async redeemCode(code: string): Promise<RedeemResult> {
    try {
      const supabase = createServerSupabaseClient()

      // Check if code exists and is not redeemed
      const { data: promoCodeData, error: promoCodeError } = await supabase
        .from("promo_codes")
        .select("*, prizes(*)")
        .eq("code", code)
        .single()

      if (promoCodeError) {
        // If it's a "not found" error, the code doesn't exist
        if (promoCodeError.code === "PGRST116") {
          return {
            success: false,
            message: "Invalid promo code. Please check and try again.",
          }
        }

        throw promoCodeError
      }

      if (!promoCodeData) {
        return {
          success: false,
          message: "Invalid promo code. Please check and try again.",
        }
      }

      // Check if code has already been redeemed
      if (promoCodeData.is_redeemed) {
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
        throw updateError
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
      handleDatabaseError(error)
      return {
        success: false,
        message: "Something went wrong. Please try again.",
      }
    }
  }
}

