import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { ThemeProvider } from "@/components/ThemeProvider"
import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { getSiteConfig } from "@/lib/config"
import { DevToolbar } from "@/components/DevToolbar"
import { Analytics } from "@vercel/analytics/react"
import "./globals.css"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

const siteConfig = getSiteConfig()
const siteName = process.env.NODE_ENV === "development"
  ? `${siteConfig.name}(개발 중)`
  : siteConfig.name

export const metadata: Metadata = {
  title: {
    default: siteName,
    template: `%s | ${siteName}`,
  },
  description: siteConfig.description,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="ko"
      className={`${geistSans.variable} ${geistMono.variable}`}
      suppressHydrationWarning
    >
      <body className="min-h-screen flex flex-col bg-white text-zinc-900 antialiased dark:bg-zinc-950 dark:text-zinc-100">
        <ThemeProvider>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
          {process.env.NODE_ENV === "development" && <DevToolbar />}
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  )
}
