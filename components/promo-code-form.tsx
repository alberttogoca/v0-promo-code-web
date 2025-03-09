"use client"

import type React from "react"

import { useState, useRef } from "react"
import { useToast } from "@/components/ui/use-toast"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Gift, Sparkles, X } from "lucide-react"
import { redeemPromoCode } from "@/lib/application/actions"
import { ConfettiEffect } from "@/components/confetti-effect"
import { SuccessAnimation } from "@/components/success-animation"
import { useAppContext } from "@/context/app-provider"
import { useTranslation } from "@/context/translation-provider"
import { v4 as uuidv4 } from "uuid"

export default function PromoCodeForm() {
  const [code, setCode] = useState("")
  const [isRedeeming, setIsRedeeming] = useState(false)
  const { toast } = useToast()
  const [showConfetti, setShowConfetti] = useState(false)
  const [showSuccessAnimation, setShowSuccessAnimation] = useState(false)
  const { addPrize, addActivity, updatePrize } = useAppContext()
  const { t } = useTranslation()
  const formRef = useRef<HTMLDivElement>(null)

  // Make the form ref available to parent components
  if (formRef.current) {
    formRef.current.id = "redeem-form"
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()

    if (!code.trim()) {
      toast({
        title: t("error"),
        description: t("enterValidCode"),
        variant: "destructive",
      })
      return
    }

    setIsRedeeming(true)

    try {
      const result = await redeemPromoCode(code)

      if (result.success && result.prize) {
        // Update the prize in our collection
        const updatedPrize = {
          ...result.prize,
          redeemed: true,
          redeemedAt: new Date().toISOString(),
        }

        // Add to prize collection or update if it already exists
        updatePrize(updatedPrize)

        // Add to activity feed
        addActivity({
          id: uuidv4(),
          code: code.toUpperCase().trim(),
          success: true,
          timestamp: new Date().toISOString(),
          prizeName: result.prize.name,
        })

        toast({
          title: t("success"),
          description: `${t("youveEarned")}: ${result.prize.name}`,
          variant: "default",
        })

        setCode("")
        setShowConfetti(true)
        setShowSuccessAnimation(true)
      } else {
        // Add failed attempt to activity feed
        addActivity({
          id: uuidv4(),
          code: code.toUpperCase().trim(),
          success: false,
          timestamp: new Date().toISOString(),
        })

        toast({
          title: t("invalidCode"),
          description: result.message || t("codeInvalidOrRedeemed"),
          variant: "destructive",
        })
      }
    } catch (error) {
      toast({
        title: t("error"),
        description: t("somethingWentWrong"),
        variant: "destructive",
      })
    } finally {
      setIsRedeeming(false)
    }
  }

  const handleClearInput = () => {
    setCode("")
  }

  return (
    <Card className="shadow-lg">
      <CardHeader className="bg-primary/5">
        <CardTitle className="flex items-center gap-2">
          <Gift className="h-5 w-5" />
          {t("redeemYourCode")}
        </CardTitle>
        <CardDescription>{t("enterPromoCodeToClaimPrize")}</CardDescription>
      </CardHeader>
      <CardContent className="pt-6">
        <div ref={formRef}>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <div className="relative">
                <Input
                  type="text"
                  placeholder={t("enterPromoCodePlaceholder")}
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  className="text-center uppercase tracking-wider pr-10"
                  maxLength={16}
                />
                {code && (
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute right-0 top-0 h-full w-10 px-3 py-0"
                    onClick={handleClearInput}
                    aria-label={t("clearInput")}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                )}
              </div>
              <p className="text-xs text-muted-foreground text-center">{t("codesAreCaseInsensitive")}</p>
            </div>
            <Button type="submit" className="w-full group" disabled={isRedeeming}>
              {isRedeeming ? (
                t("redeeming")
              ) : (
                <span className="flex items-center justify-center gap-2">
                  {t("redeemNow")}
                  <Sparkles className="h-4 w-4 group-hover:animate-pulse" />
                </span>
              )}
            </Button>
          </form>
        </div>
      </CardContent>
      <CardFooter className="flex justify-center border-t bg-muted/20 px-6 py-4">
        <p className="text-xs text-center text-muted-foreground">
          {t("promoCodesCanOnlyBeRedeemedOnce")}
          <br />
          {t("seeOur")}{" "}
          <a href="#" className="underline hover:text-primary">
            {t("termsAndConditions")}
          </a>{" "}
          {t("forMoreDetails")}
        </p>
      </CardFooter>
      <SuccessAnimation show={showSuccessAnimation} onComplete={() => setShowSuccessAnimation(false)} />
      <ConfettiEffect trigger={showConfetti} onComplete={() => setShowConfetti(false)} />
    </Card>
  )
}

