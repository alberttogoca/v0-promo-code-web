"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Clock, CheckCircle, XCircle, Trash2, ChevronLeft, ChevronRight } from "lucide-react"
import { useAppContext } from "@/context/app-provider"
import { useTranslation } from "@/context/translation-provider"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

const ITEMS_PER_PAGE = 5

export function RecentActivity() {
  const { activities, isLoadingActivities, clearActivities } = useAppContext()
  const { t } = useTranslation()
  const [currentPage, setCurrentPage] = useState(1)
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  // Reset to first page when activities change
  useEffect(() => {
    setCurrentPage(1)
  }, [activities.length])

  const totalPages = Math.ceil(activities.length / ITEMS_PER_PAGE)
  const paginatedActivities = activities.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE)

  const handleClearActivities = () => {
    clearActivities()
    setIsDialogOpen(false)
  }

  return (
    <Card className="shadow-lg">
      <CardHeader className="bg-primary/5">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5" />
            {t("recentActivity")}
          </CardTitle>

          <AlertDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <AlertDialogTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8"
                disabled={activities.length === 0 || isLoadingActivities}
              >
                <Trash2 className="h-4 w-4" />
                <span className="sr-only">{t("clearActivity")}</span>
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>{t("clearActivityHistory")}</AlertDialogTitle>
                <AlertDialogDescription>{t("clearActivityConfirmation")}</AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>{t("cancel")}</AlertDialogCancel>
                <AlertDialogAction onClick={handleClearActivities}>{t("clearHistory")}</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
        <CardDescription>{t("recentPromoCodeRedemptionHistory")}</CardDescription>
      </CardHeader>
      <CardContent className="pt-6">
        {isLoadingActivities ? (
          <div className="flex justify-center py-4">
            <div className="h-6 w-6 rounded-full border-2 border-primary border-t-transparent animate-spin" />
          </div>
        ) : paginatedActivities.length > 0 ? (
          <div className="space-y-4">
            {paginatedActivities.map((activity) => (
              <div key={activity.id} className="flex items-center gap-3 text-sm">
                <div className="flex-shrink-0">
                  {activity.success ? (
                    <CheckCircle className="h-5 w-5 text-green-500" />
                  ) : (
                    <XCircle className="h-5 w-5 text-red-500" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium">
                    {activity.success
                      ? `${t("redeemedCode")}: ${activity.code}`
                      : `${t("failedToRedeem")}: ${activity.code}`}
                  </p>
                  {activity.success && activity.prizeName && (
                    <p className="text-muted-foreground text-xs">
                      {t("earned")}: {activity.prizeName}
                    </p>
                  )}
                </div>
                <div className="text-xs text-muted-foreground whitespace-nowrap">
                  {formatTimeAgo(activity.timestamp, t)}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-6 text-muted-foreground">
            <p>{t("noRecentActivity")}</p>
            <p className="text-sm mt-1">{t("redeemFirstCodeToSeeHere")}</p>
          </div>
        )}
      </CardContent>
      {totalPages > 1 && (
        <CardFooter className="flex justify-between items-center border-t p-4">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            <ChevronLeft className="h-4 w-4 mr-1" />
            {t("previous")}
          </Button>
          <span className="text-sm text-muted-foreground">
            {t("page")} {currentPage} {t("of")} {totalPages}
          </span>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
          >
            {t("next")}
            <ChevronRight className="h-4 w-4 ml-1" />
          </Button>
        </CardFooter>
      )}
    </Card>
  )
}

function formatTimeAgo(timestamp: string, t: (key: string) => string): string {
  const now = new Date()
  const past = new Date(timestamp)
  const diffInSeconds = Math.floor((now.getTime() - past.getTime()) / 1000)

  if (diffInSeconds < 60) return `${diffInSeconds} ${t("secondsAgo")}`
  if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} ${t("minutesAgo")}`
  if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} ${t("hoursAgo")}`
  return `${Math.floor(diffInSeconds / 86400)} ${t("daysAgo")}`
}

