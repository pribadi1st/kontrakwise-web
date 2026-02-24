import { NextRequest, NextResponse } from "next/server"
import { cookies } from "next/headers"

export async function POST(req: NextRequest) {
    const session = await cookies()
    
    // Clear the bearer_token cookie
    session.delete("bearer_token")
    
    return NextResponse.json({ 
        success: true, 
        message: "Logged out successfully" 
    })
}
