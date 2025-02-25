import { NextResponse } from "next/server"

const API_BASE_URL = process.env.API_BASE_URL || "http://localhost:8080"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const query = searchParams.get("q")

  if (!query) {
    return NextResponse.json({ error: "Search query is required" }, { status: 400 })
  }

  try {
    const response = await fetch(`${API_BASE_URL}/books/search?q=${encodeURIComponent(query)}`)
    const data = await response.json()
    return NextResponse.json(data)
  } catch (error) {
    console.error("Error searching books:", error)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}

