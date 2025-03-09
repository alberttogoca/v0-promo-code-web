import type { Prize } from "../entities/types"
import type { PrizeRepository } from "../repositories/prize-repository"

export class PrizeUseCases {
  constructor(private prizeRepository: PrizeRepository) {}

  async getAllPrizes(): Promise<Prize[]> {
    return this.prizeRepository.getAllPrizes()
  }

  async updatePrize(prize: Prize): Promise<boolean> {
    return this.prizeRepository.updatePrize(prize)
  }
}

