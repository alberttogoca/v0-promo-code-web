import { NextResponse } from "next/server"
import { setupDatabase } from "@/lib/application/actions"

export async function GET() {
  try {
    const success = await setupDatabase()

    return NextResponse.json({
      success,
      message: success ? "Database setup completed successfully" : "Failed to set up database",
    })
  } catch (error) {
    console.error("Error in setup-database route:", error)
    return NextResponse.json(
      {
        success: false,
        error: "An unexpected error occurred",
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 },
    )
  }
}

