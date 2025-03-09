"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertCircle, Database, RefreshCw, ExternalLink } from "lucide-react"
import { useTranslation } from "@/context/translation-provider"
import { isSupabaseConfigured } from "@/lib/infrastructure/supabase/client"
import { setupDatabase } from "@/lib/application/actions"

export function DatabaseSetup({ onSetupComplete }: { onSetupComplete: () => void }) {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const { t } = useTranslation()
  const supabaseConfigured = isSupabaseConfigured()

  const handleSetupDatabase = async () => {
    setIsLoading(true)
    setError(null)

    try {
      if (!supabaseConfigured) {
        throw new Error("Supabase is not properly configured. Please check your environment variables.")
      }

      const success = await setupDatabase()

      if (success) {
        onSetupComplete()
      } else {
        throw new Error("Failed to set up database")
      }
    } catch (err) {
      setError("Failed to set up database. Please try refreshing the page or use the manual setup option.")
      console.error("Error setting up database:", err)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Database className="h-5 w-5" />
          {t("databaseSetup")}
        </CardTitle>
        <CardDescription>{t("databaseSetupDescription")}</CardDescription>
      </CardHeader>
      <CardContent>
        {!supabaseConfigured && (
          <div className="bg-destructive/10 p-4 rounded-md mb-4 flex items-start gap-3">
            <AlertCircle className="h-5 w-5 text-destructive shrink-0 mt-0.5" />
            <div>
              <p className="font-medium text-destructive">Supabase Configuration Error</p>
              <p className="text-sm text-destructive/80">
                Supabase environment variables are missing. Please check your .env.local file and make sure you have set
                up:
              </p>
              <ul className="text-sm text-destructive/80 list-disc list-inside mt-2">
                <li>NEXT_PUBLIC_SUPABASE_URL</li>
                <li>NEXT_PUBLIC_SUPABASE_ANON_KEY</li>
                <li>SUPABASE_SERVICE_ROLE_KEY (for admin operations)</li>
              </ul>
            </div>
          </div>
        )}

        {error && (
          <div className="bg-destructive/10 p-4 rounded-md mb-4 flex items-start gap-3">
            <AlertCircle className="h-5 w-5 text-destructive shrink-0 mt-0.5" />
            <div>
              <p className="font-medium text-destructive">{t("setupError")}</p>
              <p className="text-sm text-destructive/80">{error}</p>
            </div>
          </div>
        )}
        <p className="text-muted-foreground mb-4">{t("databaseSetupInstructions")}</p>

        <div className="bg-muted p-4 rounded-md mt-6">
          <h3 className="text-sm font-medium mb-2">{t("manualSetupOption")}</h3>
          <p className="text-xs text-muted-foreground mb-2">{t("manualSetupDescription")}</p>
          <Button
            variant="outline"
            size="sm"
            className="w-full text-xs"
            onClick={() => window.open("/SUPABASE_SETUP.md", "_blank")}
          >
            {t("viewSetupInstructions")}
            <ExternalLink className="h-3 w-3 ml-2" />
          </Button>
        </div>
      </CardContent>
      <CardFooter>
        <Button onClick={handleSetupDatabase} disabled={isLoading || !supabaseConfigured} className="w-full">
          {isLoading ? (
            <>
              <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
              {t("settingUpDatabase")}
            </>
          ) : (
            t("setupDatabase")
          )}
        </Button>
      </CardFooter>
    </Card>
  )
}

