import { PrizeUseCases } from "@/lib/core/usecases/prize-usecases"
import { PromoCodeUseCases } from "@/lib/core/usecases/promo-code-usecases"
import { ActivityUseCases } from "@/lib/core/usecases/activity-usecases"
import { DatabaseSetupUseCases } from "@/lib/core/usecases/database-setup-usecases"

import { SupabasePrizeRepository } from "@/lib/infrastructure/repositories/supabase-prize-repository"
import { SupabasePromoCodeRepository } from "@/lib/infrastructure/repositories/supabase-promo-code-repository"
import { SupabaseActivityRepository } from "@/lib/infrastructure/repositories/supabase-activity-repository"
import { SupabaseDatabaseSetupRepository } from "@/lib/infrastructure/repositories/supabase-database-setup-repository"

// Singleton instances of repositories
const prizeRepository = new SupabasePrizeRepository()
const promoCodeRepository = new SupabasePromoCodeRepository()
const activityRepository = new SupabaseActivityRepository()
const databaseSetupRepository = new SupabaseDatabaseSetupRepository()

// Singleton instances of use cases
const prizeUseCases = new PrizeUseCases(prizeRepository)
const promoCodeUseCases = new PromoCodeUseCases(promoCodeRepository, activityRepository)
const activityUseCases = new ActivityUseCases(activityRepository)
const databaseSetupUseCases = new DatabaseSetupUseCases(databaseSetupRepository)

// Export the container
export const container = {
  prizeUseCases,
  promoCodeUseCases,
  activityUseCases,
  databaseSetupUseCases,
}

