import { NextResponse } from "next/server"
import { NextRequest } from "next/server"

const API_BASE_URL = process.env.API_BASE_URL || "http://localhost:8080"

export async function GET(request: NextRequest) {
  try {
    // Get pagination and sorting parameters from query string
    const searchParams = request.nextUrl.searchParams
    const page = searchParams.get('page') || '0'
    const size = searchParams.get('size') || '10'
    const sort = searchParams.get('sort') || 'title,asc'

    // Fetch books with pagination and sorting
    const response = await fetch(
      `${API_BASE_URL}/books?page=${page}&size=${size}&sort=${sort}`,
      { cache: 'no-store' }
    )

    if (!response.ok) {
      throw new Error(`API responded with status: ${response.status}`)
    }

    const data = await response.json()

    // Return the full response to include pagination metadata
    return NextResponse.json(data, {
      headers: {
        'Cache-Control': 'no-cache, no-store, must-revalidate'
      }
    })
  } catch (error) {
    console.error("Error fetching books:", error)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}