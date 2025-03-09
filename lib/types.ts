export interface Prize {
  id: string
  name: string
  description: string
  category: string
  value: number
  redeemed: boolean
  expiresAt?: string
  redeemedAt?: string
  imageUrl?: string
  createdAt?: string
}

export interface Activity {
  id: string
  code: string
  success: boolean
  timestamp: string
  prizeName?: string
}

export interface RedeemResult {
  success: boolean
  message?: string
  prize?: Prize
}

export interface PromoCode {
  id: string
  code: string
  prizeId: string
  isRedeemed: boolean
  createdAt: string
  redeemedAt?: string
}

