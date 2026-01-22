export const FILE_CONSTRAINTS = {
  maxSize: 20 * 1024 * 1024,
  supportedPreviewTypes: {
    images: [
      'image/jpeg',
      'image/png',
      'image/gif',
      'image/webp',
      'image/svg+xml',
    ],
    documents: ['application/pdf'],
    video: ['video/mp4', 'video/webm', 'video/ogg'],
    audio: ['audio/mpeg', 'audio/wav', 'audio/ogg', 'audio/mp3'],
  },
} as const

export type FileType = 'image' | 'pdf' | 'video' | 'audio' | 'other'

export interface FileValidationResult {
  valid: boolean
  error?: string
}

export function validateFile(file: File): FileValidationResult {
  if (file.size > FILE_CONSTRAINTS.maxSize) {
    return {
      valid: false,
      error: `File size exceeds ${formatFileSize(FILE_CONSTRAINTS.maxSize)} limit`,
    }
  }

  return { valid: true }
}

function isTypeInArray<T extends string>(
  arr: ReadonlyArray<T>,
  value: string,
): value is T {
  return arr.includes(value as T)
}

export function getFileType(file: File): FileType {
  const { type } = file

  if (isTypeInArray(FILE_CONSTRAINTS.supportedPreviewTypes.images, type)) {
    return 'image'
  }

  if (isTypeInArray(FILE_CONSTRAINTS.supportedPreviewTypes.documents, type)) {
    return 'pdf'
  }

  if (isTypeInArray(FILE_CONSTRAINTS.supportedPreviewTypes.video, type)) {
    return 'video'
  }

  if (isTypeInArray(FILE_CONSTRAINTS.supportedPreviewTypes.audio, type)) {
    return 'audio'
  }

  return 'other'
}

export function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 Bytes'

  const k = 1024
  const sizes = ['Bytes', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))

  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`
}

export function getFileExtension(filename: string): string {
  const parts = filename.split('.')
  return parts.length > 1 ? parts[parts.length - 1].toLowerCase() : ''
}
