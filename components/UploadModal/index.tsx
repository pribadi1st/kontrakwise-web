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

interface UploadFile {
  id: string
  name: string
  size: string
  progress: number
  status: 'uploading' | 'completed' | 'error'
  type: 'pdf' | 'docx'
}

interface UploadModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function UploadModal({ isOpen, onClose }: UploadModalProps) {
  const [files, setFiles] = useState<UploadFile[]>([
    {
      id: '1',
      name: 'Partnership_Agreement.pdf',
      size: '8.5 MB',
      progress: 60,
      status: 'uploading',
      type: 'pdf'
    },
    {
      id: '2',
      name: 'NDA_Draft.docx',
      size: '2.1 MB',
      progress: 100,
      status: 'completed',
      type: 'docx'
    }
  ])
  const [documentType, setDocumentType] = useState('')

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const uploadedFiles = event.target.files
    if (!uploadedFiles) return

    const newFiles: UploadFile[] = Array.from(uploadedFiles).map((file, index) => ({
      id: `file-${Date.now()}-${index}`,
      name: file.name,
      size: `${(file.size / (1024 * 1024)).toFixed(1)} MB`,
      progress: 0,
      status: 'uploading' as const,
      type: file.name.endsWith('.pdf') ? 'pdf' : 'docx'
    }))

    setFiles(prev => [...prev, ...newFiles])

    // Simulate upload progress
    newFiles.forEach(file => {
      const interval = setInterval(() => {
        setFiles(prev => prev.map(f => {
          if (f.id === file.id) {
            const newProgress = Math.min(f.progress + Math.random() * 30, 100)
            const newStatus = newProgress === 100 ? 'completed' : 'uploading'
            return { ...f, progress: newProgress, status: newStatus }
          }
          return f
        }))
      }, 500)

      // Clean up interval when complete
      setTimeout(() => clearInterval(interval), 5000)
    })
  }

  const getFileIcon = (type: string) => {
    if (type === 'pdf') {
      return <FileText size={20} className="text-primary" />
    }
    return <File size={20} className="text-blue-600" />
  }

  const getProgressColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-500'
      case 'uploading':
        return 'bg-primary'
      case 'error':
        return 'bg-red-500'
      default:
        return 'bg-gray-300'
    }
  }

  const handleStartAnalysis = () => {
    console.log('Starting analysis for files:', files.filter(f => f.status === 'completed'))
    onClose()
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
              multiple
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
          {/* {files.length > 0 && (
            <div className="mt-8">
              <h4 className="text-gray-500 text-xs font-bold uppercase tracking-wider mb-4">
                Files to be uploaded
              </h4>
              <div className="space-y-4">
                {files.map((file) => (
                  <div key={file.id} className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-3">
                        {getFileIcon(file.type)}
                        <span className="text-sm font-bold text-gray-900">{file.name}</span>
                      </div>
                      {file.status === 'completed' ? (
                        <CheckCircle size={20} className="text-green-500" />
                      ) : (
                        <span className="text-xs font-bold text-primary">
                          {Math.round(file.progress)}%
                        </span>
                      )}
                    </div>
                    <div className="w-full bg-gray-200 h-1.5 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all duration-300 ${getProgressColor(file.status)}`}
                        style={{ width: `${file.progress}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )} */}

          {/* Document Type Selection */}
          <div className="mt-8 grid grid-cols-1 gap-6">
            <div>
              <label className="block text-sm font-bold text-gray-600 mb-2">
                Document Type
              </label>
              <Select value={documentType} onValueChange={setDocumentType}>
                <SelectTrigger className="w-full bg-white border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none">
                  <SelectValue placeholder="Select document type" />
                </SelectTrigger>
                <SelectContent className='bg-white'>
                  <SelectItem value="nda">Non-Disclosure Agreement (NDA)</SelectItem>
                  <SelectItem value="msa">Master Service Agreement (MSA)</SelectItem>
                  <SelectItem value="sow">Statement of Work (SOW)</SelectItem>
                  <SelectItem value="employment">Employment Contract</SelectItem>
                  <SelectItem value="vendor">Vendor Agreement</SelectItem>
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
            className='text-white'
          >
            Upload
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
