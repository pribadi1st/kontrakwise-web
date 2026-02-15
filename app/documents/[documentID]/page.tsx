import { notFound } from 'next/navigation'
import { getDocumentFile } from '@/utils/queries/document/query'
import { Document } from '@/types/document'
import { cookies } from 'next/headers'
import DocumentDetailClient from '@/components/DocumentDetail/DocumentPage'

export default async function DocumentDetailPage({ params }: { params: Promise<{ documentID: string }> }) {
    const { documentID } = await params
    const cookieStore = await cookies()
    const token = cookieStore.get('bearer_token')?.value
    if (!token) {
        notFound()
    }
    try {
        const document: Document = await getDocumentFile(token, documentID)
        if (!document) {
            notFound()
        }

        return (
            // <Suspense fallback={<LoadingComponent />}>
            <DocumentDetailClient document={document} />
            // </Suspense>
        )
    } catch (error) {
        notFound()
    }
}