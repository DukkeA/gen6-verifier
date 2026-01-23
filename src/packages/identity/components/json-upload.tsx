import { useRef, useState } from 'react'
import { FileJson } from 'lucide-react'
import { parseIdentityJSON, validateIdentityJSON } from '../utils/json-parser'
import type { ParsedIdentityData } from '../utils/json-parser'
import { Button } from '@/components/ui/button'
import { Alert, AlertDescription } from '@/components/ui/alert'

interface JSONUploadProps {
  onDataLoaded: (data: ParsedIdentityData) => void
  disabled?: boolean
}

export function JSONUpload({ onDataLoaded, disabled }: JSONUploadProps) {
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const handleFileSelect = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0]
    if (!file) return

    setError(null)
    setIsLoading(true)

    try {
      if (!file.name.endsWith('.json')) {
        throw new Error('Please select a JSON file')
      }

      const text = await file.text()

      const validation = validateIdentityJSON(text)
      if (!validation.valid) {
        throw new Error(validation.error || 'Invalid JSON format')
      }

      const parsedData = parseIdentityJSON(text)
      onDataLoaded(parsedData)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load JSON file')
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
        <FileJson className="mr-2 size-4" />
        {isLoading ? 'Loading...' : 'Upload JSON File'}
      </Button>

      <input
        ref={fileInputRef}
        type="file"
        accept=".json,application/json"
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
