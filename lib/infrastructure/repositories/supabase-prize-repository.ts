import type { Prize } from "@/lib/core/entities/types"
import type { PrizeRepository } from "@/lib/core/repositories/prize-repository"
import { createServerSupabaseClient } from "@/lib/infrastructure/supabase/client"
import { handleDatabaseError } from "@/lib/infrastructure/error/error-handling"

export class SupabasePrizeRepository implements PrizeRepository {
  async getAllPrizes(): Promise<Prize[]> {
    try {
      const supabase = createServerSupabaseClient()
      const { data, error } = await supabase.from("prizes").select("*").order("created_at", { ascending: false })

      if (error) {
        throw error
      }

      return this.transformPrizes(data || [])
    } catch (error) {
      console.error("Failed to fetch prizes:", error)
      handleDatabaseError(error)
      return []
    }
  }

  async updatePrize(prize: Prize): Promise<boolean> {
    try {
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
        throw error
      }

      return true
    } catch (error) {
      console.error("Failed to update prize:", error)
      handleDatabaseError(error)
      return false
    }
  }

  private transformPrizes(data: any[]): Prize[] {
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
}

