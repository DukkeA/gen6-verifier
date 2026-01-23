import type { IdentityFormData } from '../types'

export interface IdentityJSON {
  name: string
  bio?: string
  email?: string
  location?: {
    country: string
    state?: string
  }
  website?: string
  telegram?: string
  x?: string
  linkedin?: string
  github?: string
  mastodon?: string
  instagram?: string
  youtube?: string
  profileType?: string
  expertise?: Array<string>
  interests?: Array<string>
  customFields?: Array<{ key: string; value: string }>
  address?: string
}

export interface ParsedIdentityData {
  formData: IdentityFormData
  address?: string
}

export function parseIdentityJSON(jsonString: string): ParsedIdentityData {
  try {
    const data = JSON.parse(jsonString) as IdentityJSON

    if (!data.name || typeof data.name !== 'string') {
      throw new Error('Invalid JSON: "name" field is required')
    }

    const formData: IdentityFormData = {
      name: data.name,
      bio: data.bio || '',
      email: data.email || '',
      location: [data.location?.country || '', data.location?.state || ''] as [
        string,
        string,
      ],
      website: data.website || '',
      telegram: data.telegram || '',
      x: data.x || '',
      linkedin: data.linkedin || '',
      github: data.github || '',
      mastodon: data.mastodon || '',
      instagram: data.instagram || '',
      youtube: data.youtube || '',
      profileType: data.profileType || '',
      expertise: Array.isArray(data.expertise) ? data.expertise : [],
      interests: Array.isArray(data.interests) ? data.interests : [],
      customFields: Array.isArray(data.customFields)
        ? data.customFields.map((field) => ({
            key: field.key || '',
            value: field.value || '',
          }))
        : [],
    }

    return {
      formData,
      address: data.address,
    }
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Failed to parse JSON: ${error.message}`)
    }
    throw new Error('Failed to parse JSON: Unknown error')
  }
}

export function validateIdentityJSON(jsonString: string): {
  valid: boolean
  error?: string
} {
  try {
    const data = JSON.parse(jsonString)

    if (!data.name || typeof data.name !== 'string') {
      return { valid: false, error: 'Missing or invalid "name" field' }
    }

    if (data.name.length < 3 || data.name.length > 256) {
      return {
        valid: false,
        error: 'Name must be between 3 and 256 characters',
      }
    }

    if (data.email && typeof data.email === 'string' && data.email !== '') {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(data.email)) {
        return { valid: false, error: 'Invalid email format' }
      }
    }

    return { valid: true }
  } catch (error) {
    return { valid: false, error: 'Invalid JSON format' }
  }
}

export function createIdentityJSON(
  formData: IdentityFormData,
  address?: string,
): string {
  const json: IdentityJSON = {
    name: formData.name,
    ...(formData.bio && { bio: formData.bio }),
    ...(formData.email && { email: formData.email }),
    ...(formData.location[0] && {
      location: {
        country: formData.location[0],
        ...(formData.location[1] && { state: formData.location[1] }),
      },
    }),
    ...(formData.website && { website: formData.website }),
    ...(formData.telegram && { telegram: formData.telegram }),
    ...(formData.x && { x: formData.x }),
    ...(formData.linkedin && { linkedin: formData.linkedin }),
    ...(formData.github && { github: formData.github }),
    ...(formData.mastodon && { mastodon: formData.mastodon }),
    ...(formData.instagram && { instagram: formData.instagram }),
    ...(formData.youtube && { youtube: formData.youtube }),
    ...(formData.profileType && { profileType: formData.profileType }),
    ...(formData.expertise.length > 0 && { expertise: formData.expertise }),
    ...(formData.interests.length > 0 && { interests: formData.interests }),
    ...(formData.customFields.length > 0 && {
      customFields: formData.customFields.filter((f) => f.key && f.value),
    }),
    ...(address && { address }),
  }

  return JSON.stringify(json, null, 2)
}
