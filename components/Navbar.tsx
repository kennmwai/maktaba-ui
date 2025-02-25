"use client"

import Link from "next/link"
import { Book, Sun, Moon } from "lucide-react"
import { useTheme } from "next-themes"
import { useEffect, useState } from "react"

export default function Navbar() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <div className="navbar bg-base-100 shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex-1">
          <Link href="/" className="btn btn-ghost items-center gap-1 px-1 font-semibold">
            <Book className="h-6 w-6" />
            <span>Maktaba</span>
          </Link>
        </div>
        <div className="flex-none">
          <ul className="menu menu-horizontal px-1">
            <li>
              <Link href="/">Home</Link>
            </li>
            <li>
              <Link href="/about">About</Link>
            </li>
          </ul>
          {mounted && (
            <label className="swap swap-rotate ml-4">
              <input
                type="checkbox"
                checked={theme === "dark"}
                onChange={() => setTheme(theme === "dark" ? "light" : "dark")}
              />
              <Sun className="swap-on h-5 w-5" />
              <Moon className="swap-off h-5 w-5" />
            </label>
          )}
        </div>
      </div>
    </div>
  )
}

