export interface Identity {
  name?: string
  bio?: string
  location?: string
  email?: string
  website?: string
  x?: string
  telegram?: string
  linkedin?: string
  instagram?: string
  youtube?: string
  git?: string
  mastodon?: string
  custom_fields?: { [key: string]: string }
}

export interface CustomFieldInput {
  key: string
  value: string
}

export interface IdentityFormData {
  name: string
  bio?: string
  email?: string
  location: [string, string]
  website?: string
  telegram?: string
  x?: string
  linkedin?: string
  github?: string
  mastodon?: string
  instagram?: string
  youtube?: string
  profileType?: string
  expertise: Array<string>
  interests: Array<string>
  customFields: Array<CustomFieldInput>
}

export interface VerificationResult {
  found: boolean
  hash?: string
  index?: number
  message: string
}

export interface DataPoint {
  address: string
  projectId: number
  index: number
  hash: string
}
