"use client"

import Link from "next/link"
import { Book, Sun, Moon, Loader } from "lucide-react"
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
      {/* Left side - Dropdown menu */}
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h7"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
            <li><Link href="/">Home</Link></li>
            <li><Link href="/about">About</Link></li>
          </ul>
        </div>
      </div>

      {/* Center - Logo */}
      <div className="navbar-center">
        <Link href="/" className="btn btn-ghost text-xl gap-2">
          <Loader className="h-6 w-6" />
          <span className="hidden sm:inline">Maktaba</span>
        </Link>
      </div>

      {/* Right side - Theme toggle */}
      <div className="navbar-end">
        {mounted && (
          <button
            className="btn btn-ghost btn-circle"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          >
            {theme === "dark" ? (
              <Sun className="h-5 w-5" />
            ) : (
              <Moon className="h-5 w-5" />
            )}
          </button>
        )}
      </div>
    </div>
  )
}