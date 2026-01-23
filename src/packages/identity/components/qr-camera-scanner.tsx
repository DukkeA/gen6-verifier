import { useEffect, useRef, useState } from 'react'
import { Camera, X } from 'lucide-react'
import jsQR from 'jsqr'
import { parseIdentityJSON, validateIdentityJSON } from '../utils/json-parser'
import type { ParsedIdentityData } from '../utils/json-parser'
import { Button } from '@/components/ui/button'
import { Alert, AlertDescription } from '@/components/ui/alert'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'

interface QRCameraScannerProps {
  onDataLoaded: (data: ParsedIdentityData) => void
  disabled?: boolean
}

export function QRCameraScanner({
  onDataLoaded,
  disabled,
}: QRCameraScannerProps) {
  const [isScanning, setIsScanning] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const streamRef = useRef<MediaStream | null>(null)
  const animationFrameRef = useRef<number | null>(null)

  const stopCamera = () => {
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current)
      animationFrameRef.current = null
    }

    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop())
      streamRef.current = null
    }

    if (videoRef.current) {
      videoRef.current.srcObject = null
    }
  }

  const scanQRCode = () => {
    if (!videoRef.current || !canvasRef.current) return

    const video = videoRef.current
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')

    if (!ctx || video.readyState !== video.HAVE_ENOUGH_DATA) {
      animationFrameRef.current = requestAnimationFrame(scanQRCode)
      return
    }

    canvas.width = video.videoWidth
    canvas.height = video.videoHeight
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height)

    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
    const code = jsQR(imageData.data, imageData.width, imageData.height)

    if (code && code.data) {
      try {
        const validation = validateIdentityJSON(code.data)
        if (!validation.valid) {
          throw new Error(validation.error || 'Invalid data in QR code')
        }

        const parsedData = parseIdentityJSON(code.data)
        onDataLoaded(parsedData)
        stopCamera()
        setIsScanning(false)
        setError(null)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to parse QR data')
        stopCamera()
        setIsScanning(false)
      }
      return
    }

    animationFrameRef.current = requestAnimationFrame(scanQRCode)
  }

  const startCamera = async () => {
    setError(null)
    setIsScanning(true)

    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'environment' },
      })

      streamRef.current = stream

      if (videoRef.current) {
        videoRef.current.srcObject = stream
        videoRef.current.play()
        animationFrameRef.current = requestAnimationFrame(scanQRCode)
      }
    } catch (err) {
      setError(
        err instanceof Error
          ? `Camera access denied: ${err.message}`
          : 'Failed to access camera',
      )
      setIsScanning(false)
    }
  }

  const handleClose = () => {
    stopCamera()
    setIsScanning(false)
    setError(null)
  }

  useEffect(() => {
    return () => {
      stopCamera()
    }
  }, [])

  return (
    <>
      <Button
        type="button"
        variant="outline"
        onClick={startCamera}
        disabled={disabled || isScanning}
        className="w-full"
      >
        <Camera className="mr-2 size-4" />
        Scan QR with Camera
      </Button>

      <Dialog open={isScanning} onOpenChange={handleClose}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Scan QR Code</DialogTitle>
          </DialogHeader>

          <div className="space-y-4">
            <div className="relative aspect-square overflow-hidden rounded-lg bg-black">
              <video
                ref={videoRef}
                className="size-full object-cover"
                playsInline
                muted
              />
              <canvas ref={canvasRef} className="hidden" />
            </div>

            <p className="text-center text-sm text-muted-foreground">
              Position the QR code within the camera view
            </p>

            <Button
              type="button"
              variant="outline"
              onClick={handleClose}
              className="w-full"
            >
              <X className="mr-2 size-4" />
              Cancel
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {error && !isScanning && (
        <Alert variant="destructive">
          <AlertDescription className="text-xs">{error}</AlertDescription>
        </Alert>
      )}
    </>
  )
}
