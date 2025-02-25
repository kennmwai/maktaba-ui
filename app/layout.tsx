"use client"

import type React from "react"

import "./globals.css"
import { Inter } from "next/font/google"
import Navbar from "@/components/Navbar"
import { ThemeProvider } from "next-themes"

const inter = Inter({ subsets: ["latin"] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="data-theme" defaultTheme="light">
          <Navbar />
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}



import './globals.css'

