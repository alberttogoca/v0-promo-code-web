import { createClient } from "@supabase/supabase-js"
import fs from "fs"
import dotenv from 'dotenv';

// Load env variables into process.env
dotenv.config({ path: ['.env.local', '.env'] });

// Read the SQL file
const sqlContent = fs.readFileSync("./supabase/schema.sql", "utf8")

async function seedDatabase() {
  // Initialize Supabase client
  const supabaseUrl = process.env.SUPABASE_URL
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY

  if (!supabaseUrl || !supabaseKey) {
    console.error("Missing Supabase environment variables")
    process.exit(1)
  }

  const supabase = createClient(supabaseUrl, supabaseKey)

  try {
    console.log("Starting database seeding...")

    // Execute the SQL script
    const { error } = await supabase.rpc("exec_sql", { sql: sqlContent })

    if (error) {
      throw error
    }

    console.log("Database seeded successfully!")
  } catch (error) {
    console.error("Error seeding database:", error)
    process.exit(1)
  }
}

seedDatabase()

