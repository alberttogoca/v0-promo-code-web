"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Dialog, DialogContent, DialogDescription, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Trophy, Gift, Award, Star, Calendar, Clock, CheckCircle, X, ExternalLink } from "lucide-react"
import { formatDistanceToNow, format } from "date-fns"
import type { Prize } from "@/lib/types"

interface PrizeDetailModalProps {
  prize: Prize | null
  isOpen: boolean
  onClose: () => void
  onRedeemClick?: () => void
  onDetailsClick?: () => void
}

export function PrizeDetailModal({ prize, isOpen, onClose, onRedeemClick, onDetailsClick }: PrizeDetailModalProps) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null
  if (!prize) return null

  const getIconForCategory = (category: string) => {
    switch (category.toLowerCase()) {
      case "discount":
        return <Gift className="h-6 w-6" />
      case "reward":
        return <Trophy className="h-6 w-6" />
      case "special":
        return <Award className="h-6 w-6" />
      default:
        return <Star className="h-6 w-6" />
    }
  }

  // Default image if none provided
  const imageUrl = prize.imageUrl || `/placeholder.svg?height=400&width=400&text=${encodeURIComponent(prize.name)}`

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[500px] p-0 overflow-hidden">
        <div className="relative w-full h-48">
          <Image src={imageUrl || "/placeholder.svg"} alt={prize.name} fill className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
            <div className="p-4 text-white">
              <Badge className="mb-2" variant={prize.category === "special" ? "destructive" : "default"}>
                {prize.category}
              </Badge>
              <h2 className="text-2xl font-bold">{prize.name}</h2>
            </div>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-2 right-2 rounded-full bg-black/20 hover:bg-black/40 text-white"
            onClick={onClose}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>

        <div className="p-6">
          <div className="flex items-start gap-4 mb-6">
            <div className="bg-primary/10 p-3 rounded-full">{getIconForCategory(prize.category)}</div>
            <div>
              <DialogDescription className="text-base mb-2">{prize.description}</DialogDescription>
              <div className="flex items-center gap-2">
                <Badge variant={prize.redeemed ? "outline" : "secondary"}>
                  {prize.redeemed ? "Redeemed" : "Available"}
                </Badge>
                {prize.value > 0 && (
                  <Badge variant="outline" className="font-semibold">
                    Value: {typeof prize.value === "number" ? `$${prize.value.toFixed(2)}` : prize.value}
                  </Badge>
                )}
              </div>
            </div>
          </div>

          <div className="space-y-3 text-sm">
            {prize.redeemed && prize.redeemedAt && (
              <div className="flex items-center gap-2 text-muted-foreground">
                <CheckCircle className="h-4 w-4" />
                <span>
                  Redeemed {formatDistanceToNow(new Date(prize.redeemedAt), { addSuffix: true })}
                  <span className="text-xs ml-1">({format(new Date(prize.redeemedAt), "MMM d, yyyy")})</span>
                </span>
              </div>
            )}

            {prize.expiresAt && (
              <div className="flex items-center gap-2 text-muted-foreground">
                <Calendar className="h-4 w-4" />
                <span>
                  Expires {formatDistanceToNow(new Date(prize.expiresAt), { addSuffix: true })}
                  <span className="text-xs ml-1">({format(new Date(prize.expiresAt), "MMM d, yyyy")})</span>
                </span>
              </div>
            )}

            <div className="flex items-center gap-2 text-muted-foreground">
              <Clock className="h-4 w-4" />
              <span>
                Added {formatDistanceToNow(new Date(prize.redeemedAt || Date.now() - 86400000), { addSuffix: true })}
              </span>
            </div>
          </div>
        </div>

        <DialogFooter className="bg-muted/30 px-6 py-4">
          {prize.redeemed ? (
            <Button className="w-full" variant="outline" onClick={onDetailsClick}>
              View Details
              <ExternalLink className="ml-2 h-4 w-4" />
            </Button>
          ) : (
            <Button className="w-full" onClick={onRedeemClick}>
              Redeem Now
              <CheckCircle className="ml-2 h-4 w-4" />
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

