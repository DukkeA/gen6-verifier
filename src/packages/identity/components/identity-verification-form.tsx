import { useEffect } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
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

export type IdentityVerificationFormData = z.infer<typeof verificationSchema>

interface IdentityVerificationFormProps {
  hash: string
  onSubmit: (data: IdentityVerificationFormData) => void
  isVerifying?: boolean
}

export function IdentityVerificationForm({
  hash,
  onSubmit,
  isVerifying,
}: IdentityVerificationFormProps) {
  const form = useForm<IdentityVerificationFormData>({
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
        <CardTitle>Verify On-Chain</CardTitle>
        <CardDescription>
          Verify the identity hash against blockchain data
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="hash"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Identity Hash</FormLabel>
                  <FormControl>
                    <Input
                      className="font-mono text-sm"
                      placeholder="0x..."
                      disabled={isVerifying}
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Blake2 hash calculated from identity data
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
                  <FormLabel>Polkadot Address</FormLabel>
                  <FormControl>
                    <Input
                      className="font-mono text-sm"
                      placeholder="5..."
                      disabled={isVerifying}
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Address that stored the identity on-chain
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" disabled={isVerifying} className="w-full">
              {isVerifying && <Spinner className="mr-2 size-4" />}
              {isVerifying ? 'Verifying...' : 'Verify Identity'}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}
