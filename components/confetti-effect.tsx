"use client"

import { useEffect, useCallback } from "react"
import confetti from "canvas-confetti"

interface ConfettiEffectProps {
  trigger: boolean
  onComplete?: () => void
}

export function ConfettiEffect({ trigger, onComplete }: ConfettiEffectProps) {
  const fireConfetti = useCallback(() => {
    // Create a canvas for the confetti
    const myCanvas = document.createElement("canvas")
    myCanvas.style.position = "fixed"
    myCanvas.style.inset = "0"
    myCanvas.style.width = "100%"
    myCanvas.style.height = "100%"
    myCanvas.style.pointerEvents = "none" // Make sure it doesn't interfere with clicks
    myCanvas.style.zIndex = "9999"
    document.body.appendChild(myCanvas)

    // Create the confetti instance
    const myConfetti = confetti.create(myCanvas, {
      resize: true,
      useWorker: true,
    })

    // Fire the confetti with custom colors matching our theme
    const colors = ["#3b82f6", "#60a5fa", "#93c5fd", "#f59e0b", "#fcd34d"]

    // First burst
    myConfetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors,
      disableForReducedMotion: true, // Accessibility consideration
    })

    // Second burst after a small delay
    setTimeout(() => {
      myConfetti({
        particleCount: 50,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors,
      })

      myConfetti({
        particleCount: 50,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors,
      })
    }, 250)

    // Clean up after animation completes
    setTimeout(() => {
      document.body.removeChild(myCanvas)
      if (onComplete) onComplete()
    }, 3000)
  }, [onComplete])

  useEffect(() => {
    if (trigger) {
      fireConfetti()
    }
  }, [trigger, fireConfetti])

  return null
}

