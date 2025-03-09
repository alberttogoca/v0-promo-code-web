"use client"

import { Button } from "@/components/ui/button"
import { Database, RefreshCw } from "lucide-react"
import { useAppContext } from "@/context/app-provider"
import { useTranslation } from "@/context/translation-provider"
import { useState } from "react"

export function DatabaseSetupButton() {
  const { databaseError, setupDatabase } = useAppContext()
  const { t } = useTranslation()
  const [isLoading, setIsLoading] = useState(false)

  if (!databaseError) {
    return null
  }

  const handleSetupClick = async () => {
    setIsLoading(true)
    await setupDatabase()
    setIsLoading(false)
  }

  return (
    <div className="mt-4">
      <Button
        variant="outline"
        onClick={handleSetupClick}
        disabled={isLoading}
        className="bg-yellow-50 text-yellow-800 border-yellow-300 hover:bg-yellow-100 dark:bg-yellow-900/20 dark:text-yellow-400 dark:border-yellow-800 dark:hover:bg-yellow-900/30"
      >
        {isLoading ? (
          <>
            <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
            {t("settingUpDatabase")}
          </>
        ) : (
          <>
            <Database className="h-4 w-4 mr-2" />
            {t("setupDatabase")}
          </>
        )}
      </Button>
      <p className="text-sm text-muted-foreground mt-2">{t("databaseSetupRequired")}</p>
    </div>
  )
}

