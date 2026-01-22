import { useEffect } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Spinner } from '@/components/ui/spinner'

const verificationSchema = z.object({
  hash: z
    .string()
    .min(1, 'Hash is required')
    .regex(/^0x[0-9a-f]{64}$/i, 'Invalid Blake2 hash format'),
  address: z
    .string()
    .min(1, 'Address is required')
    .regex(/^[1-9A-HJ-NP-Za-km-z]+$/, 'Invalid Polkadot address format'),
})

export type VerificationFormData = z.infer<typeof verificationSchema>

interface VerificationFormProps {
  hash: string
  onSubmit: (data: VerificationFormData) => void
  isVerifying?: boolean
}

export function VerificationForm({ hash, onSubmit, isVerifying }: VerificationFormProps) {
  const form = useForm<VerificationFormData>({
    resolver: zodResolver(verificationSchema),
    defaultValues: {
      hash: '',
      address: '',
    },
  })

  useEffect(() => {
    if (hash) {
      form.setValue('hash', hash)
    }
  }, [hash, form])

  return (
    <Card>
      <CardHeader>
        <CardTitle>Verification</CardTitle>
        <CardDescription>Verify the file hash against blockchain data</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="hash"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>File Hash</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="0x..."
                      className="font-mono"
                      disabled={isVerifying}
                    />
                  </FormControl>
                  <FormDescription>
                    Blake2 hash (auto-filled from uploaded file or enter manually)
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>User Address</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Enter Polkadot address"
                      className="font-mono"
                      disabled={isVerifying}
                    />
                  </FormControl>
                  <FormDescription>
                    Polkadot address to verify against blockchain data
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" className="w-full" disabled={isVerifying}>
              {isVerifying ? (
                <>
                  <Spinner className="mr-2" />
                  Verifying...
                </>
              ) : (
                'Verify'
              )}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}
