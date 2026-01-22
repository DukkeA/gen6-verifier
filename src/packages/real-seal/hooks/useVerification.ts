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
        throw new Error('Blockchain API not connected')
      }

      if (!api.isConnected) {
        throw new Error('Blockchain connection lost')
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
          message: 'No data points found for this address',
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
          message: `Hash verified! Found at index ${match.index}`,
        })
      } else {
        setResult({
          found: false,
          message: 'Hash not found in address data points',
        })
      }
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : 'Verification failed'
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
