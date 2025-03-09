"use server"

import { container } from "@/lib/infrastructure/di/container"
import type { Prize, Activity } from "@/lib/core/entities/types"

// Prize actions
export async function getUserPrizes(): Promise<Prize[]> {
  return container.prizeUseCases.getAllPrizes()
}

export async function updatePrizeInDatabase(prize: Prize): Promise<boolean> {
  return container.prizeUseCases.updatePrize(prize)
}

// Promo code actions
export async function redeemPromoCode(code: string) {
  return container.promoCodeUseCases.redeemPromoCode(code)
}

// Activity actions
export async function getRecentActivity(): Promise<Activity[]> {
  return container.activityUseCases.getRecentActivities()
}

export async function clearAllActivities(): Promise<boolean> {
  return container.activityUseCases.clearAllActivities()
}

// Database setup actions
export async function setupDatabase(): Promise<boolean> {
  return container.databaseSetupUseCases.setupDatabase()
}

export async function isDatabaseSetupNeeded(): Promise<boolean> {
  return container.databaseSetupUseCases.isDatabaseSetupNeeded()
}

