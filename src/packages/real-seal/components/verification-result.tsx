import { CheckCircle2, XCircle } from 'lucide-react'
import type { VerificationResult } from '@/packages/real-seal/hooks/useVerification'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'

interface VerificationResultProps {
  result: VerificationResult
}

export function VerificationResultDisplay({ result }: VerificationResultProps) {
  if (result.found) {
    return (
      <Alert className="border-green-500 bg-green-50 dark:bg-green-500/10">
        <CheckCircle2 className="size-4 text-green-800! dark:text-green-300" />
        <AlertTitle className="text-green-800 dark:text-green-300">
          Verification Successful
        </AlertTitle>
        <AlertDescription className="text-green-700 dark:text-green-300">
          <p className="mb-2">{result.message}</p>
          {result.index !== undefined && result.hash && (
            <details className="mt-3">
              <summary className="cursor-pointer text-sm font-medium hover:underline">
                View verification details
              </summary>
              <div className="mt-2 space-y-1 rounded-md bg-green-100/50 p-2 dark:bg-green-900/20">
                <p className="text-xs">
                  <span className="font-semibold">Record ID:</span>{' '}
                  {result.index}
                </p>
                <p className="break-all font-mono text-xs">
                  <span className="font-semibold">File Fingerprint:</span>{' '}
                  {result.hash}
                </p>
              </div>
            </details>
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
