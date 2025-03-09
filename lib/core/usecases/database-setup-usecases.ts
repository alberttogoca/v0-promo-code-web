import type { DatabaseSetupRepository } from "../repositories/database-setup-repository"

export class DatabaseSetupUseCases {
  constructor(private databaseSetupRepository: DatabaseSetupRepository) {}

  async setupDatabase(): Promise<boolean> {
    return this.databaseSetupRepository.setupDatabase()
  }

  async isDatabaseSetupNeeded(): Promise<boolean> {
    return this.databaseSetupRepository.isDatabaseSetupNeeded()
  }
}

