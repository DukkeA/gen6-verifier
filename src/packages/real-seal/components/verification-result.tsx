import { CheckCircle2, XCircle } from 'lucide-react'
import type { VerificationResult } from '@/packages/real-seal/hooks/useVerification'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'

interface VerificationResultProps {
  result: VerificationResult
}

export function VerificationResultDisplay({ result }: VerificationResultProps) {
  if (result.found) {
    return (
      <Alert className="border-green-500 bg-green-50 dark:bg-green-950">
        <CheckCircle2 className="size-4 text-green-600 dark:text-green-400" />
        <AlertTitle className="text-green-800 dark:text-green-300">
          Verification Successful
        </AlertTitle>
        <AlertDescription className="text-green-700 dark:text-green-400">
          <p className="mb-2">{result.message}</p>
          {result.index !== undefined && (
            <p className="text-sm">
              <span className="font-semibold">Data Point Index:</span>{' '}
              {result.index}
            </p>
          )}
          {result.hash && (
            <p className="mt-1 break-all font-mono text-xs">
              <span className="font-semibold">Hash:</span> {result.hash}
            </p>
          )}
        </AlertDescription>
      </Alert>
    )
  }

  return (
    <Alert variant="destructive">
      <XCircle className="size-4" />
      <AlertTitle>Verification Failed</AlertTitle>
      <AlertDescription>{result.message}</AlertDescription>
    </Alert>
  )
}
