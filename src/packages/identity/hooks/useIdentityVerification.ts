import { useState } from 'react'
import { useGen6 } from 'gen6-context'
import type { DataPoint, VerificationResult } from '../types'

export function useIdentityVerification() {
  const { api } = useGen6()
  const [isVerifying, setIsVerifying] = useState(false)
  const [result, setResult] = useState<VerificationResult | null>(null)
  const [error, setError] = useState<string | null>(null)

  const verify = async (hash: string, address: string) => {
    setIsVerifying(true)
    setError(null)
    setResult(null)

    try {
      if (!api) {
        throw new Error(
          'Unable to connect to verification network. Please try again.',
        )
      }

      if (!api.isConnected) {
        throw new Error(
          'Connection lost. Please check your network and try again.',
        )
      }

      const projectId = 20250923
      const entries = await api.query.dataRegistry.dataPoints.entries(
        address,
        projectId,
      )

      if (!entries || entries.length === 0) {
        setResult({
          found: false,
          message: 'No identity records found for this address.',
        })
        return
      }

      const dataPointsArray: Array<DataPoint> = entries.map(([key, value]) => {
        const keyArgs = key.args
        const hash = value.toHex()
        return {
          address: keyArgs[0].toString(),
          projectId: Number(keyArgs[1].toString()),
          index: Number(keyArgs[2].toString()),
          hash: hash,
        }
      })

      const normalizedHash = hash.toLowerCase()
      const match = dataPointsArray.find(
        (dataPoint) => dataPoint.hash.toLowerCase() === normalizedHash,
      )

      if (match) {
        setResult({
          found: true,
          hash: match.hash,
          index: match.index,
          message: 'Identity verified successfully!',
        })
      } else {
        setResult({
          found: false,
          message: 'No matching identity record found for this data.',
        })
      }
    } catch (err) {
      const errorMessage =
        err instanceof Error
          ? err.message
          : 'Verification failed. Please try again.'
      setError(errorMessage)
      setResult({
        found: false,
        message: errorMessage,
      })
    } finally {
      setIsVerifying(false)
    }
  }

  return { verify, isVerifying, result, error }
}
