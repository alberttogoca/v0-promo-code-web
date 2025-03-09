export enum ErrorType {
  DATABASE_CONNECTION = "DATABASE_CONNECTION",
  AUTHENTICATION = "AUTHENTICATION",
  VALIDATION = "VALIDATION",
  NOT_FOUND = "NOT_FOUND",
  PERMISSION = "PERMISSION",
  UNKNOWN = "UNKNOWN",
}

// Error interface
export interface AppError {
  type: ErrorType
  message: string
  details?: any
}

// Function to handle database errors
export function handleDatabaseError(error: any): AppError {
  console.error("Database error:", error)

  // Check for specific Supabase error codes
  if (error?.code === "PGRST301") {
    return {
      type: ErrorType.DATABASE_CONNECTION,
      message: "Database connection error",
      details: error,
    }
  }

  if (error?.code === "42P01") {
    return {
      type: ErrorType.NOT_FOUND,
      message: "Table not found",
      details: error,
    }
  }

  if (error?.code === "23505") {
    return {
      type: ErrorType.VALIDATION,
      message: "Duplicate entry",
      details: error,
    }
  }

  if (error?.code?.startsWith("P")) {
    return {
      type: ErrorType.PERMISSION,
      message: "Permission denied",
      details: error,
    }
  }

  return {
    type: ErrorType.UNKNOWN,
    message: "An unknown database error occurred",
    details: error,
  }
}

// Simple error logging function that doesn't rely on hooks
export function logError(error: AppError) {
  console.error(`${error.type} Error:`, error.details || error.message)
  return error.message
}

