import { JSONUpload } from './json-upload'
import { QRImageUpload } from './qr-image-upload'
import { QRCameraScanner } from './qr-camera-scanner'
import type { ParsedIdentityData } from '../utils/json-parser'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

interface IdentityDataLoaderProps {
  onDataLoaded: (data: ParsedIdentityData) => void
  disabled?: boolean
}

export function IdentityDataLoader({
  onDataLoaded,
  disabled,
}: IdentityDataLoaderProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Load Identity Data</CardTitle>
        <CardDescription>
          Import identity information from JSON file or QR code
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        <JSONUpload onDataLoaded={onDataLoaded} disabled={disabled} />
        <QRImageUpload onDataLoaded={onDataLoaded} disabled={disabled} />
        <QRCameraScanner onDataLoaded={onDataLoaded} disabled={disabled} />

        <div className="pt-3">
          <p className="text-xs text-muted-foreground">
            Upload a JSON file or scan a QR code containing identity data. The
            form will be automatically filled with the loaded information.
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
