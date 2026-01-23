import { useRef, useState } from 'react'
import { QrCode } from 'lucide-react'
import jsQR from 'jsqr'
import { parseIdentityJSON, validateIdentityJSON } from '../utils/json-parser'
import type { ParsedIdentityData } from '../utils/json-parser'
import { Button } from '@/components/ui/button'
import { Alert, AlertDescription } from '@/components/ui/alert'

interface QRImageUploadProps {
  onDataLoaded: (data: ParsedIdentityData) => void
  disabled?: boolean
}

export function QRImageUpload({ onDataLoaded, disabled }: QRImageUploadProps) {
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const decodeQRFromImage = async (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()

      reader.onload = (e) => {
        const img = new Image()
        img.onload = () => {
          const canvas = document.createElement('canvas')
          const ctx = canvas.getContext('2d')

          if (!ctx) {
            reject(new Error('Failed to get canvas context'))
            return
          }

          canvas.width = img.width
          canvas.height = img.height
          ctx.drawImage(img, 0, 0)

          const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
          const code = jsQR(imageData.data, imageData.width, imageData.height)

          if (code && code.data) {
            resolve(code.data)
          } else {
            reject(new Error('No QR code found in image'))
          }
        }

        img.onerror = () => reject(new Error('Failed to load image'))
        img.src = e.target?.result as string
      }

      reader.onerror = () => reject(new Error('Failed to read file'))
      reader.readAsDataURL(file)
    })
  }

  const handleFileSelect = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0]
    if (!file) return

    setError(null)
    setIsLoading(true)

    try {
      if (!file.type.startsWith('image/')) {
        throw new Error('Please select an image file')
      }

      const qrData = await decodeQRFromImage(file)

      const validation = validateIdentityJSON(qrData)
      if (!validation.valid) {
        throw new Error(validation.error || 'Invalid data in QR code')
      }

      const parsedData = parseIdentityJSON(qrData)
      onDataLoaded(parsedData)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to read QR code')
    } finally {
      setIsLoading(false)
      if (fileInputRef.current) {
        fileInputRef.current.value = ''
      }
    }
  }

  const handleButtonClick = () => {
    fileInputRef.current?.click()
  }

  return (
    <div className="space-y-3">
      <Button
        type="button"
        variant="outline"
        onClick={handleButtonClick}
        disabled={disabled || isLoading}
        className="w-full"
      >
        <QrCode className="mr-2 size-4" />
        {isLoading ? 'Reading QR...' : 'Upload QR Image'}
      </Button>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileSelect}
        className="hidden"
      />

      {error && (
        <Alert variant="destructive">
          <AlertDescription className="text-xs">{error}</AlertDescription>
        </Alert>
      )}
    </div>
  )
}
