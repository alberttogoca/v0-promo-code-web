export interface DatabaseSetupRepository {
  setupDatabase(): Promise<boolean>
  isDatabaseSetupNeeded(): Promise<boolean>
}

