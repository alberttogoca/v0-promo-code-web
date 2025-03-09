import "@/app/globals.css"
import { SiteFooter } from "@/components/site-footer"
import { SiteHeader } from "@/components/site-header"
import { Toaster } from "@/components/ui/toaster"
import { AppProvider } from "@/context/app-provider"
import { ThemeProvider } from "@/context/theme-provider"
import { TranslationProvider } from "@/context/translation-provider"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import type React from "react"

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
              <main className="flex-1">{children}</main>
              <SiteFooter />
              <Toaster />
            </AppProvider>
          </TranslationProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}

