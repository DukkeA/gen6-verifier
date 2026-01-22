import { useState } from 'react'
import { useGen6 } from 'gen6-context'

export interface VerificationResult {
  found: boolean
  hash?: string
  index?: number
  message: string
}

interface UseVerificationResult {
  result: VerificationResult | null
  isVerifying: boolean
  error: string | null
  verify: (hash: string, address: string) => Promise<void>
  reset: () => void
}

export function useVerification(): UseVerificationResult {
  const { api } = useGen6()
  const [result, setResult] = useState<VerificationResult | null>(null)
  const [isVerifying, setIsVerifying] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const verify = async (hash: string, address: string) => {
    setIsVerifying(true)
    setError(null)
    setResult(null)

    try {
      if (!api) {
        throw new Error(
          'Unable to connect to the verification network. Please try again.',
        )
      }

      if (!api.isConnected) {
        throw new Error(
          'Connection to the verification network was lost. Please refresh and try again.',
        )
      }

      const projectId = 886
      // Use .entries() to get all data points for this address and projectId
      const entries = await api.query.dataRegistry.dataPoints.entries(
        address,
        projectId,
      )

      if (!entries || entries.length === 0) {
        setResult({
          found: false,
          message:
            'No records found for this user. Please verify the wallet address is correct.',
        })
        return
      }

      // Parse entries: each entry is [StorageKey, Codec]
      const dataPointsArray = entries.map(([key, value]) => {
        const keyArgs = key.args // [address, projectId, index]
        const hash = value.toHex() // The stored hash
        return {
          address: keyArgs[0].toString(),
          projectId: Number(keyArgs[1].toString()),
          index: Number(keyArgs[2].toString()),
          hash: hash,
        }
      })

      const normalizedFileHash = hash.toLowerCase()
      const match = dataPointsArray.find(
        (dataPoint) => dataPoint.hash.toLowerCase() === normalizedFileHash,
      )

      if (match) {
        setResult({
          found: true,
          hash: match.hash,
          index: match.index,
          message: `Document verified successfully! This file is authentic and registered.`,
        })
      } else {
        setResult({
          found: false,
          message:
            'No matching record found for this file with the provided user. The document authenticity could not be verified.',
        })
      }
    } catch (err) {
      const errorMessage =
        err instanceof Error
          ? err.message
          : 'Verification failed. Please try again or contact support.'
      setError(errorMessage)
      setResult({
        found: false,
        message: errorMessage,
      })
    } finally {
      setIsVerifying(false)
    }
  }

  const reset = () => {
    setResult(null)
    setError(null)
    setIsVerifying(false)
  }

  return {
    result,
    isVerifying,
    error,
    verify,
    reset,
  }
}
