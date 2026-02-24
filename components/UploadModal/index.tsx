"use client"
import { useState } from 'react'
import { CloudUpload, FileText, File, CheckCircle } from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Button } from '../ui/button'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { getDocumentTypes, uploadDocument } from '@/utils/queries/document/query'
import { toast } from 'sonner'

interface UploadModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function UploadModal({ isOpen, onClose }: UploadModalProps) {
  const [files, setFiles] = useState<File[]>([])
  const [selectedDocumentTypeId, setSelectedDocumentTypeId] = useState<number | null>(null)
  const queryClient = useQueryClient()

  // Fetch document types from API
  const { data: documentTypes = [], isLoading: isLoadingTypes } = useQuery({
    queryKey: ['document-types'],
    queryFn: getDocumentTypes
  })

  // Upload mutation
  const { mutateAsync: uploadDoc, isPending } = useMutation({
    mutationFn: ({ file, documentTypeId, filename }: { file: File; documentTypeId: number; filename: string }) =>
      uploadDocument(file, documentTypeId, filename),
  })

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const uploadedFiles = event.target.files
    if (!uploadedFiles) return

    // const newFiles: UploadFile[] = Array.from(uploadedFiles).map((file, index) => ({
    //   id: `file-${Date.now()}-${index}`,
    //   name: file.name,
    //   size: `${(file.size / (1024 * 1024)).toFixed(1)} MB`,
    //   progress: 0,
    //   status: 'uploading' as const,
    //   type: file.name.endsWith('.pdf') ? 'pdf' : 'docx'
    // }))

    setFiles(prev => [...uploadedFiles])
  }

  const getFileIcon = (type: string) => {
    if (type === 'pdf') {
      return <FileText size={20} className="text-primary" />
    }
    return <File size={20} className="text-blue-600" />
  }

  const handleStartAnalysis = async () => {
    // Refresh documents list
    console.log(files[0])
    const resp = await uploadDoc({
      file: files[0],
      documentTypeId: selectedDocumentTypeId!,
      filename: files[0].name
    })
    if (resp) {
      toast.success('Document uploaded successfully')
      queryClient.invalidateQueries({ queryKey: ['documents'] })
      setFiles([])
      onClose()
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] flex flex-col bg-white">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-gray-900">
            Upload Contracts
          </DialogTitle>
          <DialogDescription className="text-gray-500 text-sm">
            Add your legal documents for AI-powered analysis.
          </DialogDescription>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto py-6">
          {/* Drop Zone */}
          <div className="border-2 border-dashed border-primary/30 rounded-xl bg-primary/5 p-12 flex flex-col items-center justify-center text-center group hover:border-primary hover:bg-primary/10 transition-all cursor-pointer relative">
            <input
              type="file"
              accept=".pdf,.docx"
              onChange={handleFileUpload}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
            />
            {/* <div className="w-16 h-16 rounded-full bg-white shadow-sm flex items-center justify-center text-primary mb-4 group-hover:scale-110 transition-transform"> */}
            <CloudUpload size={32} className='text-primary mb-4' />
            {/* </div> */}
            <p className="text-gray-900 font-bold text-lg">Drag and drop files here</p>
            <p className="text-gray-500 text-sm mt-1">
              or <span className="text-primary font-bold">browse</span> your local files
            </p>
            <p className="text-gray-500 text-xs mt-4 uppercase tracking-widest font-bold">
              Max file size: 25MB (PDF, DOCX)
            </p>
          </div>

          {/* Files List */}
          {files.length > 0 && (
            <div className="mt-8">
              <h4 className="text-gray-500 text-xs font-bold uppercase tracking-wider mb-4">
                Files to be uploaded
              </h4>
              <div className="space-y-4">
                {files.map((file) => (
                  <div key={file.name} className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-3">
                        {getFileIcon(file.name.endsWith('.pdf') ? 'pdf' : 'docx')}
                        <span className="text-sm font-bold text-gray-900">{file.name}</span>
                      </div>
                      {/* {file.status === 'completed' ? (
                        <CheckCircle size={20} className="text-green-500" />
                      ) : file.status === 'error' ? (
                        <span className="text-xs font-bold text-red-500">Error</span>
                      ) : (
                        <span className="text-xs font-bold text-primary">
                          {Math.round(file.progress)}%
                        </span>
                      )} */}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Document Type Selection */}
          <div className="mt-8 grid grid-cols-1 gap-6">
            <div>
              <label className="block text-sm font-bold text-gray-600 mb-2">
                Document Type
              </label>
              <Select value={selectedDocumentTypeId?.toString() || ''} onValueChange={(value) => setSelectedDocumentTypeId(parseInt(value))}>
                <SelectTrigger className="w-full bg-white border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none">
                  <SelectValue placeholder="Select document type" />
                </SelectTrigger>
                <SelectContent className='bg-white'>
                  {isLoadingTypes ? (
                    <SelectItem value="loading" disabled>
                      Loading document types...
                    </SelectItem>
                  ) : documentTypes.length > 0 ? (
                    documentTypes.map((type) => (
                      <SelectItem key={type.id} value={type.id.toString()}>
                        {type.name}
                      </SelectItem>
                    ))
                  ) : (
                    <SelectItem value="none" disabled>
                      No document types available
                    </SelectItem>
                  )}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        <DialogFooter className="py-4 border-t border-gray-200 bg-white flex items-center justify-end gap-3">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>

          <Button
            onClick={handleStartAnalysis}
            disabled={files.length === 0 || !selectedDocumentTypeId || isPending}
            className='text-white'
          >
            {isPending ? 'Uploading...' : 'Upload'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
