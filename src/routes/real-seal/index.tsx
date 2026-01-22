import { useState } from 'react'
import { createFileRoute } from '@tanstack/react-router'
import type { VerificationFormData } from '@/packages/real-seal/components/verification-form'
import { FileMetadataCard } from '@/packages/real-seal/components/file-metadata-card'
import { FilePreview } from '@/packages/real-seal/components/file-preview'
import { FileUploadZone } from '@/packages/real-seal/components/file-upload-zone'
import { VerificationForm } from '@/packages/real-seal/components/verification-form'
import { VerificationResultDisplay } from '@/packages/real-seal/components/verification-result'
import { useFileHash } from '@/packages/real-seal/hooks/useFileHash'
import { useVerification } from '@/packages/real-seal/hooks/useVerification'

export const Route = createFileRoute('/real-seal/')({
  component: RouteComponent,
})

function RouteComponent() {
  const [file, setFile] = useState<File | null>(null)
  const { hash, isHashing, generateHash, reset: resetHash } = useFileHash()
  const {
    result,
    isVerifying,
    verify,
    reset: resetVerification,
  } = useVerification()

  const handleFileSelect = async (selectedFile: File) => {
    setFile(selectedFile)
    resetHash()
    resetVerification()
    await generateHash(selectedFile)
  }

  const handleVerification = async (data: VerificationFormData) => {
    await verify(data.hash, data.address)
  }

  return (
    <div className="container mx-auto p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Real Seal Verification</h1>
        <p className="mt-2 text-muted-foreground">
          Upload a file to generate its hash and verify it against blockchain
          data
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div className="flex flex-col gap-6">
          <FileUploadZone
            onFileSelect={handleFileSelect}
            disabled={isHashing}
          />
          {file && <FilePreview file={file} />}
        </div>

        <div className="flex flex-col gap-6">
          <VerificationForm
            hash={hash}
            onSubmit={handleVerification}
            isVerifying={isVerifying}
          />

          {result && <VerificationResultDisplay result={result} />}

          {file && <FileMetadataCard file={file} hash={hash} />}
        </div>
      </div>
    </div>
  )
}
