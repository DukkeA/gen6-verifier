import type { CustomFieldInput, Identity, IdentityFormData } from '../types'

export function validatePolkadotAddress(address: string): boolean {
  if (!address || typeof address !== 'string') return false
  return /^[1-9A-HJ-NP-Za-km-z]+$/.test(address) && address.length >= 47
}

export function isValidEmail(email: string): boolean {
  if (!email) return true
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

export function formatCustomFields(
  fields: Array<CustomFieldInput>,
): Array<CustomFieldInput> {
  return fields
    .filter((field) => field.key.trim() !== '' && field.value.trim() !== '')
    .map((field) => ({
      key: field.key.trim(),
      value: field.value.trim(),
    }))
}

export function transformFormToIdentity(formData: IdentityFormData): Identity {
  const customFields: { [key: string]: string } = {
    profile_type: formData.profileType || '',
    state: formData.location[1] || '',
    expertise: JSON.stringify(formData.expertise || []),
    interests: JSON.stringify(formData.interests || []),
  }

  const filteredCustomFields = formatCustomFields(formData.customFields)
  filteredCustomFields.forEach((field) => {
    customFields[field.key] = field.value
  })

  const identity: Identity = {
    name: formData.name,
    bio: formData.bio || '',
    location: formData.location[0] || '',
    email: formData.email || '',
    telegram: formData.telegram || '',
    x: formData.x || '',
    linkedin: formData.linkedin || '',
    mastodon: formData.mastodon || '',
    instagram: formData.instagram || '',
    website: formData.website || '',
    youtube: formData.youtube || '',
    git: formData.github || '',
    custom_fields: customFields,
  }

  return identity
}
