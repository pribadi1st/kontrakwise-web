import { downloadDocumentFile } from "@/utils/queries/document/query"
import { NextRequest, NextResponse } from "next/server"
import { cookies } from "next/headers"

export async function GET(request: NextRequest, { params }: { params: Promise<{ documentID: string }> }) {
    const cookie = await cookies()
    const isDownload = request.nextUrl.searchParams.get('download')
    const { documentID } = await params

    const token = cookie.get('bearer_token')?.value
    if (!token) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
    const backendRes = await downloadDocumentFile(token, documentID)

    if (!backendRes.ok) {
        return NextResponse.json({ error: 'Failed to fetch file' }, { status: backendRes.status })
    }

    // 2. Stream the binary body directly to the client
    // We use backendRes.body which is a ReadableStream
    return new Response(backendRes.body, {
        headers: {
            "Content-Type": "application/pdf",
            // This header triggers the "Save As" dialog in the browser
            "Content-Disposition": `attachment; filename="document_${documentID}.pdf"`,
        },
    })
}