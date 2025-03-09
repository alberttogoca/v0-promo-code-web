import type { Prize } from "../entities/types"

export interface PrizeRepository {
  getAllPrizes(): Promise<Prize[]>
  updatePrize(prize: Prize): Promise<boolean>
}

