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

type DataPointTuple = [[string, number, number], string]

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
      const dataPoints = await api.query.dataRegistry.dataPoints(address, projectId)
      const dataPointsJson = dataPoints.toJSON() as Array<DataPointTuple>

      if (!dataPointsJson || dataPointsJson.length === 0) {
        setResult({
          found: false,
          message: 'No data points found for this address',
        })
        return
      }

      const normalizedFileHash = hash.toLowerCase()
      const match = dataPointsJson.find(([[_addr, _projId, _idx], storedHash]) => {
        return storedHash.toLowerCase() === normalizedFileHash
      })

      if (match) {
        const [[_matchAddr, _matchProjId, matchIdx], matchHash] = match
        setResult({
          found: true,
          hash: matchHash,
          index: matchIdx,
          message: `Hash verified! Found at index ${matchIdx}`,
        })
      } else {
        setResult({
          found: false,
          message: 'Hash not found in address data points',
        })
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Verification failed'
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
