import type React from "react"
import "@/app/globals.css"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { Toaster } from "@/components/ui/toaster"
import { SiteHeader } from "@/components/site-header"
import { AppProvider } from "@/context/app-provider"
import { TranslationProvider } from "@/context/translation-provider"
import { ThemeProvider } from "@/components/theme-provider"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Promo Code Rewards",
  description: "Redeem promo codes and earn exciting prizes",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <TranslationProvider>
            <AppProvider>
              <SiteHeader />
              {children}
              <Toaster />
            </AppProvider>
          </TranslationProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}

