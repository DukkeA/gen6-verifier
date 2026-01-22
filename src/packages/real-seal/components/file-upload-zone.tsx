import { useRef, useState } from 'react'
import { Upload } from 'lucide-react'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import { validateFile } from '@/packages/real-seal/utils/file-utils'

interface FileUploadZoneProps {
  onFileSelect: (file: File) => void
  disabled?: boolean
}

export function FileUploadZone({
  onFileSelect,
  disabled,
}: FileUploadZoneProps) {
  const [isDragging, setIsDragging] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleDragEnter = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (!disabled) {
      setIsDragging(true)
    }
  }

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(false)
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(false)

    if (disabled) return

    const files = Array.from(e.dataTransfer.files)
    if (files.length > 0) {
      handleFile(files[0])
    }
  }

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files && files.length > 0) {
      handleFile(files[0])
    }
  }

  const handleFile = (file: File) => {
    setError(null)

    const validation = validateFile(file)
    if (!validation.valid) {
      setError(validation.error || 'Invalid file')
      return
    }

    onFileSelect(file)
  }

  const handleClick = () => {
    if (!disabled) {
      fileInputRef.current?.click()
    }
  }

  return (
    <Card>
      <CardContent className="p-6">
        <div
          className={cn(
            'flex flex-col items-center justify-center rounded-lg border-2 border-dashed p-12 text-center transition-colors',
            isDragging && 'border-primary bg-primary/5',
            !isDragging &&
              'border-muted-foreground/25 hover:border-muted-foreground/50',
            disabled && 'cursor-not-allowed opacity-50',
            !disabled && 'cursor-pointer',
          )}
          onDragEnter={handleDragEnter}
          onDragLeave={handleDragLeave}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          onClick={handleClick}
        >
          <Upload className="mb-4 size-12 text-muted-foreground" />
          <h3 className="mb-2 text-lg font-semibold">Upload a file</h3>
          <p className="mb-4 text-sm text-muted-foreground">
            Drag and drop your file here, or click to browse
          </p>
          <Button type="button" variant="outline" disabled={disabled}>
            Select File
          </Button>
          <p className="mt-4 text-xs text-muted-foreground">
            Maximum file size: 50MB
          </p>
        </div>

        <input
          ref={fileInputRef}
          type="file"
          className="hidden"
          onChange={handleFileInput}
          disabled={disabled}
        />

        {error && (
          <Alert variant="destructive" className="mt-4">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
      </CardContent>
    </Card>
  )
}
