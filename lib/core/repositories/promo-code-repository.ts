import type { RedeemResult } from "../entities/types"

export interface PromoCodeRepository {
  redeemCode(code: string): Promise<RedeemResult>
}

