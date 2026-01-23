import { useState } from 'react'
import { createFileRoute } from '@tanstack/react-router'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import type { IdentityFormData } from '@/packages/identity/types'
import type { ParsedIdentityData } from '@/packages/identity/utils/json-parser'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Spinner } from '@/components/ui/spinner'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { IdentityForm } from '@/packages/identity/components/identity-form'
import { VerificationResultDisplay } from '@/packages/identity/components/verification-result'
import { IdentitySummaryCard } from '@/packages/identity/components/identity-summary-card'
import { IdentityDataLoader } from '@/packages/identity/components/identity-data-loader'
import { useIdentityHash } from '@/packages/identity/hooks/useIdentityHash'
import { useIdentityVerification } from '@/packages/identity/hooks/useIdentityVerification'

export const Route = createFileRoute('/identity/')({
  component: RouteComponent,
})

const verificationSchema = z.object({
  address: z
    .string()
    .min(1, 'Address is required')
    .regex(/^[1-9A-HJ-NP-Za-km-z]+$/, 'Invalid Polkadot address format'),
})

type VerificationFormData = z.infer<typeof verificationSchema>

function RouteComponent() {
  const [identityData, setIdentityData] = useState<IdentityFormData | null>(
    null,
  )
  const [currentFormData, setCurrentFormData] =
    useState<IdentityFormData | null>(null)
  const [verifiedIdentity, setVerifiedIdentity] =
    useState<IdentityFormData | null>(null)
  const [loadedFormData, setLoadedFormData] = useState<IdentityFormData | null>(
    null,
  )
  const { hash, isCalculating } = useIdentityHash(identityData)
  const { verify, isVerifying, result } = useIdentityVerification()

  const form = useForm<VerificationFormData>({
    resolver: zodResolver(verificationSchema),
    defaultValues: {
      address: '',
    },
  })

  const handleFormChange = (data: IdentityFormData) => {
    setCurrentFormData(data)
  }

  const handleDataLoaded = (data: ParsedIdentityData) => {
    setLoadedFormData(data.formData)
    setCurrentFormData(data.formData)
    if (data.address) {
      form.setValue('address', data.address)
    }
  }

  const handleGenerateHash = () => {
    if (currentFormData) {
      setIdentityData(currentFormData)
    }
  }

  const handleVerification = async (data: VerificationFormData) => {
    if (!hash) return
    await verify(hash, data.address)
    if (result?.found) {
      setVerifiedIdentity(identityData)
    }
  }

  return (
    <div className="container mx-auto py-12">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Identity Verification</h1>
        <p className="mt-2 text-muted-foreground">
          Enter identity information to calculate its hash and verify it against
          blockchain data
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div className="flex flex-col gap-6">
          <IdentityDataLoader
            onDataLoaded={handleDataLoaded}
            disabled={isCalculating || isVerifying}
          />

          <Card>
            <CardHeader>
              <CardTitle>Identity Information</CardTitle>
              <CardDescription>
                Enter the identity details to generate verification hash
              </CardDescription>
            </CardHeader>
            <CardContent>
              <IdentityForm
                onFormChange={handleFormChange}
                initialData={loadedFormData}
              />
            </CardContent>
          </Card>
        </div>

        <div className="flex flex-col gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Verify On-Chain</CardTitle>
              <CardDescription>
                Enter the wallet address to verify identity on blockchain
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="rounded-md border bg-muted/50 p-3">
                  <p className="mb-2 text-xs font-medium">Steps:</p>
                  <ol className="space-y-1 text-xs text-muted-foreground">
                    <li>
                      1. Fill identity form → 2. Generate hash → 3. Enter wallet
                      address → 4. Verify
                    </li>
                  </ol>
                </div>

                <div>
                  <Button
                    type="button"
                    onClick={handleGenerateHash}
                    disabled={!currentFormData || isCalculating}
                    className="w-full"
                    variant="default"
                  >
                    {isCalculating ? (
                      <>
                        <Spinner className="mr-2" />
                        Calculating Hash...
                      </>
                    ) : (
                      'Generate Hash'
                    )}
                  </Button>

                  {hash && (
                    <div className="mt-4">
                      <label className="text-sm font-medium">
                        ✓ Hash Generated
                      </label>
                      <div className="mt-2 rounded-md bg-muted p-3">
                        <code className="break-all font-mono text-xs">
                          {hash}
                        </code>
                      </div>
                    </div>
                  )}

                  {!hash && currentFormData && !isCalculating && (
                    <p className="mt-2 text-xs text-muted-foreground">
                      Generate a hash from your identity data first
                    </p>
                  )}
                </div>

                <div className="h-px bg-border" />

                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(handleVerification)}
                    className="space-y-4"
                  >
                    <FormField
                      control={form.control}
                      name="address"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Gen6 Address</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="g6C5XMbPAFmYEF7y9t8xkKgMch8jdfVheZSSJaBL5S6GoUNos"
                              className="font-mono"
                              disabled={isVerifying}
                              {...field}
                            />
                          </FormControl>
                          <FormDescription>
                            Gen6 adddress to check identity
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <Button
                      type="submit"
                      disabled={isVerifying || !hash}
                      className="w-full"
                    >
                      {isVerifying ? (
                        <>
                          <Spinner className="mr-2" />
                          Verifying...
                        </>
                      ) : (
                        'Verify Identity'
                      )}
                    </Button>
                  </form>
                </Form>
              </div>

              {result && (
                <div className="mt-6">
                  <VerificationResultDisplay result={result} />
                </div>
              )}
            </CardContent>
          </Card>

          {result?.found && verifiedIdentity && (
            <IdentitySummaryCard identityData={verifiedIdentity} />
          )}
        </div>
      </div>
    </div>
  )
}
