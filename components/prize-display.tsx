"use client"

import { useState, useRef, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Trophy, Gift, Award, Star, Filter, ArrowUpDown, Search, ChevronLeft, ChevronRight } from "lucide-react"
import { useAppContext } from "@/context/app-provider"
import { useTranslation } from "@/context/translation-provider"
import { PrizeDetailModal } from "@/components/prize-detail-modal"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import type { Prize } from "@/lib/types"

type SortOption = "name" | "date" | "value" | "category"
type SortDirection = "asc" | "desc"
type FilterOption = "all" | "available" | "redeemed" | "discount" | "reward" | "special"

const ITEMS_PER_PAGE = 5

export default function PrizeDisplay() {
  const { prizes, isLoadingPrizes } = useAppContext()
  const { t } = useTranslation()
  const [selectedPrize, setSelectedPrize] = useState<Prize | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [sortBy, setSortBy] = useState<SortOption>("date")
  const [sortDirection, setSortDirection] = useState<SortDirection>("desc")
  const [filterBy, setFilterBy] = useState<FilterOption>("all")
  const [currentPage, setCurrentPage] = useState(1)
  const redeemFormRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    // Find the redeem form element
    redeemFormRef.current = document.getElementById("redeem-form") as HTMLDivElement
  }, [])

  // Reset to first page when filters change
  useEffect(() => {
    setCurrentPage(1)
  }, [searchQuery, sortBy, sortDirection, filterBy])

  const handlePrizeClick = (prize: Prize) => {
    setSelectedPrize(prize)
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
    // Small delay to avoid visual glitches during animation
    setTimeout(() => setSelectedPrize(null), 300)
  }

  const scrollToRedeemForm = () => {
    closeModal()
    setTimeout(() => {
      if (redeemFormRef.current) {
        redeemFormRef.current.scrollIntoView({ behavior: "smooth", block: "center" })
      }
    }, 300)
  }

  const openRickRoll = () => {
    window.open("https://www.youtube.com/watch?v=dQw4w9WgXcQ", "_blank")
  }

  const getIconForCategory = (category: string) => {
    switch (category.toLowerCase()) {
      case "discount":
        return <Gift className="h-5 w-5" />
      case "reward":
        return <Trophy className="h-5 w-5" />
      case "special":
        return <Award className="h-5 w-5" />
      default:
        return <Star className="h-5 w-5" />
    }
  }

  const toggleSortDirection = () => {
    setSortDirection(sortDirection === "asc" ? "desc" : "asc")
  }

  // Filter prizes
  const filteredPrizes = prizes.filter((prize) => {
    // Search query filter
    if (
      searchQuery &&
      !prize.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !prize.description.toLowerCase().includes(searchQuery.toLowerCase())
    ) {
      return false
    }

    // Category/status filter
    switch (filterBy) {
      case "available":
        return !prize.redeemed
      case "redeemed":
        return prize.redeemed
      case "discount":
      case "reward":
      case "special":
        return prize.category.toLowerCase() === filterBy
      default:
        return true
    }
  })

  // Sort prizes
  const sortedPrizes = [...filteredPrizes].sort((a, b) => {
    let comparison = 0

    switch (sortBy) {
      case "name":
        comparison = a.name.localeCompare(b.name)
        break
      case "date":
        const dateA = a.redeemedAt ? new Date(a.redeemedAt).getTime() : Date.now()
        const dateB = b.redeemedAt ? new Date(b.redeemedAt).getTime() : Date.now()
        comparison = dateA - dateB
        break
      case "value":
        comparison = a.value - b.value
        break
      case "category":
        comparison = a.category.localeCompare(b.category)
        break
    }

    return sortDirection === "asc" ? comparison : -comparison
  })

  // Pagination
  const totalPages = Math.ceil(sortedPrizes.length / ITEMS_PER_PAGE)
  const paginatedPrizes = sortedPrizes.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE)

  return (
    <>
      <Card className="shadow-lg h-full">
        <CardHeader className="bg-primary/5">
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Trophy className="h-5 w-5" />
              {t("yourPrizeCollection")}
            </div>
            <div className="flex items-center gap-2">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <Filter className="h-4 w-4" />
                    <span className="sr-only">{t("filterPrizes")}</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel>{t("filterPrizes")}</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuGroup>
                    <DropdownMenuItem
                      onClick={() => setFilterBy("all")}
                      className={filterBy === "all" ? "bg-muted" : ""}
                    >
                      {t("allPrizes")}
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => setFilterBy("available")}
                      className={filterBy === "available" ? "bg-muted" : ""}
                    >
                      {t("availableOnly")}
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => setFilterBy("redeemed")}
                      className={filterBy === "redeemed" ? "bg-muted" : ""}
                    >
                      {t("redeemedOnly")}
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                  <DropdownMenuSeparator />
                  <DropdownMenuLabel>{t("byCategory")}</DropdownMenuLabel>
                  <DropdownMenuGroup>
                    <DropdownMenuItem
                      onClick={() => setFilterBy("discount")}
                      className={filterBy === "discount" ? "bg-muted" : ""}
                    >
                      <Gift className="mr-2 h-4 w-4" />
                      {t("discounts")}
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => setFilterBy("reward")}
                      className={filterBy === "reward" ? "bg-muted" : ""}
                    >
                      <Trophy className="mr-2 h-4 w-4" />
                      {t("rewards")}
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => setFilterBy("special")}
                      className={filterBy === "special" ? "bg-muted" : ""}
                    >
                      <Award className="mr-2 h-4 w-4" />
                      {t("special")}
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                </DropdownMenuContent>
              </DropdownMenu>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <ArrowUpDown className="h-4 w-4" />
                    <span className="sr-only">{t("sortPrizes")}</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel>{t("sortBy")}</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuGroup>
                    <DropdownMenuItem
                      onClick={() => {
                        setSortBy("date")
                        toggleSortDirection()
                      }}
                      className={sortBy === "date" ? "bg-muted" : ""}
                    >
                      {t("date")}{" "}
                      {sortBy === "date" &&
                        (sortDirection === "asc" ? `(${t("oldestFirst")})` : `(${t("newestFirst")})`)}
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => {
                        setSortBy("name")
                        toggleSortDirection()
                      }}
                      className={sortBy === "name" ? "bg-muted" : ""}
                    >
                      {t("name")} {sortBy === "name" && (sortDirection === "asc" ? "(A-Z)" : "(Z-A)")}
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => {
                        setSortBy("value")
                        toggleSortDirection()
                      }}
                      className={sortBy === "value" ? "bg-muted" : ""}
                    >
                      {t("value")}{" "}
                      {sortBy === "value" && (sortDirection === "asc" ? `(${t("lowToHigh")})` : `(${t("highToLow")})`)}
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => {
                        setSortBy("category")
                        toggleSortDirection()
                      }}
                      className={sortBy === "category" ? "bg-muted" : ""}
                    >
                      {t("category")}
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </CardTitle>
          <div className="flex items-center gap-2 mt-2">
            <Search className="h-4 w-4 text-muted-foreground" />
            <Input
              placeholder={t("searchPrizes")}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="h-8"
            />
          </div>
          <CardDescription className="mt-2">
            {filterBy !== "all" && (
              <Badge variant="outline" className="mr-2">
                {t(filterBy)}
              </Badge>
            )}
            {sortedPrizes.length} {sortedPrizes.length === 1 ? t("prizeFound") : t("prizesFound")}
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          {isLoadingPrizes ? (
            <div className="flex flex-col items-center justify-center py-8 space-y-4">
              <div className="h-8 w-8 rounded-full border-4 border-primary border-t-transparent animate-spin" />
              <p className="text-sm text-muted-foreground">{t("loadingYourPrizes")}</p>
            </div>
          ) : paginatedPrizes.length > 0 ? (
            <ul className="space-y-4">
              {paginatedPrizes.map((prize) => (
                <li
                  key={prize.id}
                  className="flex items-start gap-3 p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors cursor-pointer"
                  onClick={() => handlePrizeClick(prize)}
                >
                  <div className="bg-primary/10 p-2 rounded-full">{getIconForCategory(prize.category)}</div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <h3 className="font-medium text-sm">{prize.name}</h3>
                      <Badge variant={prize.redeemed ? "outline" : "default"}>
                        {prize.redeemed ? t("redeemed") : t("available")}
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{prize.description}</p>
                    {prize.expiresAt && (
                      <p className="text-xs text-muted-foreground mt-2">
                        {t("expires")}: {new Date(prize.expiresAt).toLocaleDateString()}
                      </p>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <div className="flex flex-col items-center justify-center py-12 space-y-4 text-center">
              <div className="bg-muted/50 p-4 rounded-full">
                <Gift className="h-8 w-8 text-muted-foreground" />
              </div>
              <div>
                <h3 className="font-medium">{t("noPrizesFound")}</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  {searchQuery ? t("tryDifferentSearchTerm") : t("redeemPromoCodeToEarnFirstPrize")}
                </p>
                {filterBy !== "all" && (
                  <Button variant="link" onClick={() => setFilterBy("all")} className="mt-2">
                    {t("clearFilters")}
                  </Button>
                )}
              </div>
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

      <PrizeDetailModal
        prize={selectedPrize}
        isOpen={isModalOpen}
        onClose={closeModal}
        onRedeemClick={scrollToRedeemForm}
        onDetailsClick={openRickRoll}
      />
    </>
  )
}

