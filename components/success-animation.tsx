"use client"

import { useEffect, useState } from "react"
import { CheckCircle } from "lucide-react"
import { cn } from "@/lib/utils"

interface SuccessAnimationProps {
  show: boolean
  onComplete?: () => void
  className?: string
}

export function SuccessAnimation({ show, onComplete, className }: SuccessAnimationProps) {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (show) {
      setVisible(true)
      const timer = setTimeout(() => {
        setVisible(false)
        if (onComplete) onComplete()
      }, 2000)
      return () => clearTimeout(timer)
    }
  }, [show, onComplete])

  if (!show && !visible) return null

  return (
    <div
      className={cn(
        "fixed inset-0 flex items-center justify-center z-50 bg-black/20 backdrop-blur-sm transition-opacity",
        visible ? "opacity-100" : "opacity-0",
        className,
      )}
      style={{ pointerEvents: "none" }}
    >
      <div className="bg-white dark:bg-gray-800 rounded-full p-6 shadow-lg animate-bounce">
        <CheckCircle className="h-16 w-16 text-green-500" />
      </div>
    </div>
  )
}

