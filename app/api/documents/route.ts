import { getDocuments } from "@/utils/queries/document/query"
import { NextRequest, NextResponse } from "next/server"
import { cookies } from "next/headers"

export async function GET(request: NextRequest) {
    const cookie = await cookies()
    const token = cookie.get('bearer_token')?.value
    if (!token) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
    const response = await getDocuments(token)
    return NextResponse.json(response)
}