import { NextRequest, NextResponse } from "next/server"
import { loginAPIInternal } from "@/utils/queries/login_register/query"
import { cookies } from "next/headers"

export async function POST(req: NextRequest) {
    const { email, password } = await req.json()
    const response = await loginAPIInternal({ email, password })

    if (response.error) {
        return NextResponse.json(response, { status: 401 })
    }
    const session = await cookies()
    session.set("bearer_token", response.detail.access_token, {
        httpOnly: true,
        secure: true,
        sameSite: "strict",
        maxAge: 60 * 60 * 24 * 7
    })
    return Response.json(response)
}