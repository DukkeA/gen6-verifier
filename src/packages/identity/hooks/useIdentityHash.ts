import { useEffect, useState } from 'react'
import { deterministicObjectBlake2Hash } from '../utils/deterministicHash'
import { transformFormToIdentity } from '../utils/identity-utils'
import type { IdentityFormData } from '../types'

export function useIdentityHash(formData: IdentityFormData | null) {
  const [hash, setHash] = useState<string>('')
  const [isCalculating, setIsCalculating] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!formData) {
      setHash('')
      return
    }

    const timeoutId = setTimeout(() => {
      try {
        setIsCalculating(true)
        setError(null)

        const identity = transformFormToIdentity(formData)
        const calculatedHash = deterministicObjectBlake2Hash(identity)
        setHash(calculatedHash)
      } catch (err) {
        setError(
          err instanceof Error ? err.message : 'Failed to calculate hash',
        )
        setHash('')
      } finally {
        setIsCalculating(false)
      }
    }, 300)

    return () => clearTimeout(timeoutId)
  }, [formData])

  return { hash, isCalculating, error }
}
