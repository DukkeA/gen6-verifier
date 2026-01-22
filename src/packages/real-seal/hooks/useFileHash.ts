import { useState } from 'react'
import { blake2AsHex } from '@polkadot/util-crypto'

interface UseFileHashResult {
  hash: string
  isHashing: boolean
  error: string | null
  generateHash: (file: File) => Promise<void>
  reset: () => void
}

export function useFileHash(): UseFileHashResult {
  const [hash, setHash] = useState<string>('')
  const [isHashing, setIsHashing] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const generateHash = async (file: File) => {
    setIsHashing(true)
    setError(null)
    setHash('')

    try {
      const arrayBuffer = await file.arrayBuffer()
      const uint8Array = new Uint8Array(arrayBuffer)
      const fileHash = blake2AsHex(uint8Array)
      setHash(fileHash)
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to generate hash'
      setError(errorMessage)
      console.error('Hash generation failed:', err)
    } finally {
      setIsHashing(false)
    }
  }

  const reset = () => {
    setHash('')
    setError(null)
    setIsHashing(false)
  }

  return {
    hash,
    isHashing,
    error,
    generateHash,
    reset,
  }
}
