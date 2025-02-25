import { NextResponse } from "next/server"

const API_BASE_URL = process.env.API_BASE_URL || "http://localhost:8080"

export async function GET(request: Request, { params }: { params: { id: string } }) {
  const id = params.id
  try {
    const response = await fetch(`${API_BASE_URL}/books/${id}/ai-insights`)
    if (!response.ok) {
      return NextResponse.json({ error: "Failed to fetch AI insights" }, { status: response.status })
    }
    const data = await response.json()
    return NextResponse.json(data)
  } catch (error) {
    console.error("Error fetching AI insights:", error)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}

