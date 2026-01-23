import React from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Plus, X } from 'lucide-react'
import type { IdentityFormData } from '../types'
import { Button } from '@/components/ui/button'
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
import { Textarea } from '@/components/ui/textarea'

const formSchema = z.object({
  name: z.string().min(3, 'Name must be at least 3 characters').max(256),
  bio: z.string().max(512).optional(),
  email: z
    .string()
    .optional()
    .refine(
      (val) => !val || val === '' || z.string().email().safeParse(val).success,
      { message: 'Please enter a valid email or leave empty' },
    ),
  location: z.tuple([z.string(), z.string()]),
  website: z.string().max(256).optional(),
  telegram: z.string().max(256).optional(),
  x: z.string().max(256).optional(),
  linkedin: z.string().max(256).optional(),
  github: z.string().max(256).optional(),
  mastodon: z.string().max(256).optional(),
  instagram: z.string().max(256).optional(),
  youtube: z.string().max(256).optional(),
  profileType: z.string().optional(),
  expertise: z.array(z.string()),
  interests: z.array(z.string()),
  customFields: z
    .array(
      z.object({
        key: z.string(),
        value: z.string(),
      }),
    )
    .refine(
      (fields) => {
        return fields.every((field) => {
          const keyTrimmed = (field.key || '').trim()
          const valueTrimmed = (field.value || '').trim()
          if (keyTrimmed === '' && valueTrimmed === '') return true
          if (keyTrimmed !== '' && valueTrimmed === '') return false
          if (valueTrimmed !== '' && keyTrimmed === '') return false
          return true
        })
      },
      { message: 'Both key and value must be filled or both empty' },
    ),
})

interface IdentityFormProps {
  onFormChange?: (data: IdentityFormData) => void
  initialData?: IdentityFormData | null
}

export function IdentityForm({ onFormChange, initialData }: IdentityFormProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      bio: '',
      email: '',
      location: ['', ''],
      website: '',
      telegram: '',
      x: '',
      linkedin: '',
      github: '',
      mastodon: '',
      instagram: '',
      youtube: '',
      profileType: '',
      expertise: [],
      interests: [],
      customFields: [],
    },
  })

  const { watch, reset } = form
  const watchedValues = watch()

  React.useEffect(() => {
    if (initialData) {
      reset({
        name: initialData.name,
        bio: initialData.bio || '',
        email: initialData.email || '',
        location: initialData.location,
        website: initialData.website || '',
        telegram: initialData.telegram || '',
        x: initialData.x || '',
        linkedin: initialData.linkedin || '',
        github: initialData.github || '',
        mastodon: initialData.mastodon || '',
        instagram: initialData.instagram || '',
        youtube: initialData.youtube || '',
        profileType: initialData.profileType || '',
        expertise: initialData.expertise,
        interests: initialData.interests,
        customFields: initialData.customFields,
      })
    }
  }, [initialData, reset])

  React.useEffect(() => {
    if (onFormChange) {
      onFormChange(watchedValues as IdentityFormData)
    }
  }, [watchedValues, onFormChange])

  const addCustomField = () => {
    const current = form.getValues('customFields')
    form.setValue('customFields', [...current, { key: '', value: '' }])
  }

  const removeCustomField = (index: number) => {
    const current = form.getValues('customFields')
    form.setValue(
      'customFields',
      current.filter((_, i) => i !== index),
    )
  }

  const addExpertise = () => {
    const current = form.getValues('expertise')
    form.setValue('expertise', [...current, ''])
  }

  const removeExpertise = (index: number) => {
    const current = form.getValues('expertise')
    form.setValue(
      'expertise',
      current.filter((_, i) => i !== index),
    )
  }

  const addInterest = () => {
    const current = form.getValues('interests')
    form.setValue('interests', [...current, ''])
  }

  const removeInterest = (index: number) => {
    const current = form.getValues('interests')
    form.setValue(
      'interests',
      current.filter((_, i) => i !== index),
    )
  }

  return (
    <Form {...form}>
      <form className="space-y-6">
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Personal Information</h3>

          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name *</FormLabel>
                <FormControl>
                  <Input placeholder="Your name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="bio"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Bio</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Tell us about yourself"
                    className="resize-none"
                    {...field}
                  />
                </FormControl>
                <FormDescription>Maximum 512 characters</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input type="email" placeholder="your@email.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="location.0"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Country</FormLabel>
                  <FormControl>
                    <Input placeholder="Country" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="location.1"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>State/Region</FormLabel>
                  <FormControl>
                    <Input placeholder="State or region" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="website"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Website</FormLabel>
                <FormControl>
                  <Input placeholder="https://your-website.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* <FormField
            control={form.control}
            name="profileType"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Profile Type</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Individual, Organization, etc."
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          /> */}
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Social Links</h3>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <FormField
              control={form.control}
              name="github"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>GitHub</FormLabel>
                  <FormControl>
                    <Input placeholder="username" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="x"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>X (Twitter)</FormLabel>
                  <FormControl>
                    <Input placeholder="@username" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="linkedin"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>LinkedIn</FormLabel>
                  <FormControl>
                    <Input placeholder="username" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="telegram"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Telegram</FormLabel>
                  <FormControl>
                    <Input placeholder="@username" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="mastodon"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Mastodon</FormLabel>
                  <FormControl>
                    <Input placeholder="@username@instance" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="instagram"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Instagram</FormLabel>
                  <FormControl>
                    <Input placeholder="username" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="youtube"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>YouTube</FormLabel>
                  <FormControl>
                    <Input placeholder="channel" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Expertise</h3>
            <Button
              type="button"
              size="sm"
              variant="outline"
              onClick={addExpertise}
            >
              <Plus className="mr-2 size-4" />
              Add
            </Button>
          </div>

          {form.watch('expertise').map((_, index) => (
            <div key={index} className="flex gap-2">
              <FormField
                control={form.control}
                name={`expertise.${index}`}
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormControl>
                      <Input placeholder="e.g. Rust, Blockchain" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                type="button"
                size="icon"
                variant="ghost"
                onClick={() => removeExpertise(index)}
              >
                <X className="size-4" />
              </Button>
            </div>
          ))}
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Interests</h3>
            <Button
              type="button"
              size="sm"
              variant="outline"
              onClick={addInterest}
            >
              <Plus className="mr-2 size-4" />
              Add
            </Button>
          </div>

          {form.watch('interests').map((_, index) => (
            <div key={index} className="flex gap-2">
              <FormField
                control={form.control}
                name={`interests.${index}`}
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormControl>
                      <Input placeholder="e.g. DeFi, NFTs" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                type="button"
                size="icon"
                variant="ghost"
                onClick={() => removeInterest(index)}
              >
                <X className="size-4" />
              </Button>
            </div>
          ))}
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Custom Fields</h3>
            <Button
              type="button"
              size="sm"
              variant="outline"
              onClick={addCustomField}
            >
              <Plus className="mr-2 size-4" />
              Add Field
            </Button>
          </div>

          {form.watch('customFields').map((_, index) => (
            <div key={index} className="flex gap-2">
              <FormField
                control={form.control}
                name={`customFields.${index}.key`}
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormControl>
                      <Input placeholder="Field name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name={`customFields.${index}.value`}
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormControl>
                      <Input placeholder="Field value" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                type="button"
                size="icon"
                variant="ghost"
                onClick={() => removeCustomField(index)}
              >
                <X className="size-4" />
              </Button>
            </div>
          ))}
        </div>
      </form>
    </Form>
  )
}
