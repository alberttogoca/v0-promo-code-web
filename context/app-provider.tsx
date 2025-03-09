"use client"

import { createContext, useContext, useState, useEffect } from "react"
import type { ReactNode } from "react"
import type { Prize, Activity } from "@/lib/core/entities/types"
import { getUserPrizes, getRecentActivity, clearAllActivities, isDatabaseSetupNeeded } from "@/lib/application/actions"
import { useToast } from "@/components/ui/use-toast"
import { useTranslation } from "@/context/translation-provider"
import { DatabaseSetup } from "@/components/database-setup"

interface AppContextType {
  prizes: Prize[]
  activities: Activity[]
  isLoadingPrizes: boolean
  isLoadingActivities: boolean
  databaseError: boolean
  addPrize: (prize: Prize) => void
  updatePrize: (prize: Prize) => void
  addActivity: (activity: Activity) => void
  clearActivities: () => void
  refreshPrizes: () => Promise<void>
  refreshActivities: () => Promise<void>
  setupDatabase: () => Promise<void>
}

const AppContext = createContext<AppContextType | undefined>(undefined)

export function AppProvider({ children }: { children: ReactNode }) {
  const [prizes, setPrizes] = useState<Prize[]>([])
  const [activities, setActivities] = useState<Activity[]>([])
  const [isLoadingPrizes, setIsLoadingPrizes] = useState(true)
  const [isLoadingActivities, setIsLoadingActivities] = useState(true)
  const [databaseError, setDatabaseError] = useState(false)
  const [showDatabaseSetup, setShowDatabaseSetup] = useState(false)
  const { toast } = useToast()
  const { t } = useTranslation()

  const refreshPrizes = async () => {
    setIsLoadingPrizes(true)
    try {
      const data = await getUserPrizes()
      setPrizes(data)
      setDatabaseError(false)
    } catch (error) {
      console.error("Failed to fetch prizes:", error)
      setDatabaseError(true)

      // Use mock data in development mode
      if (process.env.NODE_ENV === "development") {
        console.log("Using mock prize data in development mode")
        setPrizes([
          {
            id: "mock-prize-1",
            name: "Mock Discount Coupon",
            description: "This is a mock prize for development",
            category: "discount",
            value: 10,
            redeemed: false,
            createdAt: new Date().toISOString(),
          },
          {
            id: "mock-prize-2",
            name: "Mock Free Shipping",
            description: "This is another mock prize for development",
            category: "discount",
            value: 5,
            redeemed: true,
            redeemedAt: new Date().toISOString(),
            createdAt: new Date(Date.now() - 86400000).toISOString(),
          },
        ])
      } else {
        toast({
          title: t("error"),
          description: t("failedToLoadPrizes"),
          variant: "destructive",
        })
      }
    } finally {
      setIsLoadingPrizes(false)
    }
  }

  const refreshActivities = async () => {
    setIsLoadingActivities(true)
    try {
      const data = await getRecentActivity()
      setActivities(data)
      setDatabaseError(false)
    } catch (error) {
      console.error("Failed to fetch activities:", error)
      setDatabaseError(true)

      // Use mock data in development mode
      if (process.env.NODE_ENV === "development") {
        console.log("Using mock activity data in development mode")
        setActivities([
          {
            id: "mock-activity-1",
            code: "MOCKCODE",
            success: true,
            timestamp: new Date().toISOString(),
            prizeName: "Mock Prize",
          },
          {
            id: "mock-activity-2",
            code: "INVALID",
            success: false,
            timestamp: new Date(Date.now() - 3600000).toISOString(),
          },
        ])
      } else {
        toast({
          title: t("error"),
          description: t("failedToLoadActivities"),
          variant: "destructive",
        })
      }
    } finally {
      setIsLoadingActivities(false)
    }
  }

  const addPrize = (prize: Prize) => {
    setPrizes((prevPrizes) => [...prevPrizes, prize])
  }

  const updatePrize = (updatedPrize: Prize) => {
    setPrizes((prevPrizes) => prevPrizes.map((prize) => (prize.id === updatedPrize.id ? updatedPrize : prize)))
  }

  const addActivity = (activity: Activity) => {
    setActivities((prevActivities) => [activity, ...prevActivities])
  }

  const clearActivities = async () => {
    setIsLoadingActivities(true)
    try {
      const success = await clearAllActivities()
      if (success) {
        setActivities([])
        toast({
          title: t("success"),
          description: t("activitiesCleared"),
        })
      } else {
        toast({
          title: t("error"),
          description: t("failedToClearActivities"),
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error("Failed to clear activities:", error)
      toast({
        title: t("error"),
        description: t("failedToClearActivities"),
        variant: "destructive",
      })
    } finally {
      setIsLoadingActivities(false)
    }
  }

  const handleDatabaseSetup = async () => {
    setShowDatabaseSetup(true)
  }

  const handleSetupComplete = () => {
    setShowDatabaseSetup(false)
    toast({
      title: t("success"),
      description: t("databaseSetupComplete"),
    })
    refreshPrizes()
    refreshActivities()
  }

  // Initial data loading
  useEffect(() => {
    const loadData = async () => {
      try {
        // Check if database setup is needed
        const setupNeeded = await isDatabaseSetupNeeded()
        if (setupNeeded) {
          setDatabaseError(true)
        } else {
          await refreshPrizes()
          await refreshActivities()
        }
      } catch (error) {
        console.error("Error loading initial data:", error)
        setDatabaseError(true)
      }
    }

    loadData()
  }, [])

  // If there's a database error and we're showing the setup UI
  if (showDatabaseSetup) {
    return (
      <div className="container mx-auto px-4 py-12">
        <DatabaseSetup onSetupComplete={handleSetupComplete} />
      </div>
    )
  }

  const value: AppContextType = {
    prizes,
    activities,
    isLoadingPrizes,
    isLoadingActivities,
    databaseError,
    addPrize,
    updatePrize,
    addActivity,
    clearActivities,
    refreshPrizes,
    refreshActivities,
    setupDatabase: handleDatabaseSetup,
  }

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}

export function useAppContext() {
  const context = useContext(AppContext)
  if (!context) {
    throw new Error("useAppContext must be used within an AppProvider")
  }
  return context
}

