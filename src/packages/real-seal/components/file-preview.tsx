import { useEffect, useState } from 'react'
import { File, FileAudio, FileImage, FileText, FileVideo } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { getFileType } from '@/packages/real-seal/utils/file-utils'

interface FilePreviewProps {
  file: File
}

function ImagePreview({ file }: { file: File }) {
  const [url, setUrl] = useState<string | null>(null)

  useEffect(() => {
    const objectUrl = URL.createObjectURL(file)
    setUrl(objectUrl)
    return () => URL.revokeObjectURL(objectUrl)
  }, [file])

  return (
    <div className="flex items-center justify-center rounded-lg bg-muted p-4">
      {url && (
        <img
          src={url}
          alt={file.name}
          className="max-h-96 w-full object-contain"
        />
      )}
    </div>
  )
}

function PDFPreview({ file }: { file: File }) {
  const [url, setUrl] = useState<string | null>(null)

  useEffect(() => {
    const objectUrl = URL.createObjectURL(file)
    setUrl(objectUrl)
    return () => URL.revokeObjectURL(objectUrl)
  }, [file])

  return (
    <div className="flex items-center justify-center rounded-lg bg-muted">
      {url && (
        <iframe
          src={url}
          className="size-full min-h-96 w-full"
          title={file.name}
        />
      )}
    </div>
  )
}

function VideoPreview({ file }: { file: File }) {
  const [url, setUrl] = useState<string | null>(null)

  useEffect(() => {
    const objectUrl = URL.createObjectURL(file)
    setUrl(objectUrl)
    return () => URL.revokeObjectURL(objectUrl)
  }, [file])

  return (
    <div className="flex items-center justify-center rounded-lg bg-muted p-4">
      {url && (
        <video src={url} controls className="max-h-96 w-full">
          Your browser does not support the video tag.
        </video>
      )}
    </div>
  )
}

function AudioPreview({ file }: { file: File }) {
  const [url, setUrl] = useState<string | null>(null)

  useEffect(() => {
    const objectUrl = URL.createObjectURL(file)
    setUrl(objectUrl)
    return () => URL.revokeObjectURL(objectUrl)
  }, [file])

  return (
    <div className="flex items-center justify-center rounded-lg bg-muted p-8">
      {url && (
        <audio src={url} controls className="w-full">
          Your browser does not support the audio tag.
        </audio>
      )}
    </div>
  )
}

function GenericFilePreview({ file }: { file: File }) {
  const getIcon = () => {
    const type = getFileType(file)

    switch (type) {
      case 'image':
        return <FileImage className="size-16 text-muted-foreground" />
      case 'pdf':
        return <FileText className="size-16 text-muted-foreground" />
      case 'video':
        return <FileVideo className="size-16 text-muted-foreground" />
      case 'audio':
        return <FileAudio className="size-16 text-muted-foreground" />
      default:
        return <File className="size-16 text-muted-foreground" />
    }
  }

  return (
    <div className="flex flex-col items-center justify-center rounded-lg bg-muted p-12">
      {getIcon()}
      <p className="mt-4 text-sm text-muted-foreground">
        Preview not available
      </p>
    </div>
  )
}

export function FilePreview({ file }: FilePreviewProps) {
  const fileType = getFileType(file)

  const renderPreview = () => {
    switch (fileType) {
      case 'image':
        return <ImagePreview file={file} />
      case 'pdf':
        return <PDFPreview file={file} />
      case 'video':
        return <VideoPreview file={file} />
      case 'audio':
        return <AudioPreview file={file} />
      default:
        return <GenericFilePreview file={file} />
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>File Preview</CardTitle>
      </CardHeader>
      <CardContent>{renderPreview()}</CardContent>
    </Card>
  )
}
