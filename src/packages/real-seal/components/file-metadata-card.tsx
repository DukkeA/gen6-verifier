import { Copy } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  formatFileSize,
  getFileExtension,
} from '@/packages/real-seal/utils/file-utils'

interface FileMetadataCardProps {
  file: File
  hash?: string
}

export function FileMetadataCard({ file, hash }: FileMetadataCardProps) {
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>File Metadata</CardTitle>
        <CardDescription>Information about the uploaded file</CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        <div>
          <p className="text-sm font-semibold text-muted-foreground">
            File Name
          </p>
          <p className="break-all text-sm">{file.name}</p>
        </div>

        <div>
          <p className="text-sm font-semibold text-muted-foreground">
            File Size
          </p>
          <p className="text-sm">{formatFileSize(file.size)}</p>
        </div>

        <div>
          <p className="text-sm font-semibold text-muted-foreground">
            File Type
          </p>
          <p className="text-sm">{file.type || 'Unknown'}</p>
        </div>

        <div>
          <p className="text-sm font-semibold text-muted-foreground">
            File Extension
          </p>
          <p className="text-sm">{getFileExtension(file.name) || 'None'}</p>
        </div>

        <div>
          <p className="text-sm font-semibold text-muted-foreground">
            Last Modified
          </p>
          <p className="text-sm">
            {new Date(file.lastModified).toLocaleString()}
          </p>
        </div>

        {hash && (
          <div>
            <div className="mb-1 flex items-center justify-between">
              <p className="text-sm font-semibold text-muted-foreground">
                Blake2 Hash
              </p>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => copyToClipboard(hash)}
                className="h-6 px-2"
              >
                <Copy className="size-3" />
              </Button>
            </div>
            <p className="break-all font-mono text-xs">{hash}</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
