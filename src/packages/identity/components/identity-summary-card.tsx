import type { IdentityFormData } from '@/packages/identity/types'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

interface IdentitySummaryCardProps {
  identityData: IdentityFormData | null
}

export function IdentitySummaryCard({
  identityData,
}: IdentitySummaryCardProps) {
  if (!identityData) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Identity Information</CardTitle>
          <CardDescription>
            Verified identity details will appear here after successful
            verification
          </CardDescription>
        </CardHeader>
      </Card>
    )
  }

  const hasPersonalInfo =
    identityData.name ||
    identityData.bio ||
    identityData.email ||
    identityData.location[0] ||
    identityData.website

  const hasSocialLinks =
    identityData.github ||
    identityData.x ||
    identityData.linkedin ||
    identityData.telegram ||
    identityData.mastodon ||
    identityData.instagram ||
    identityData.youtube

  const hasCustomFields = identityData.customFields.some(
    (f) => f.key && f.value,
  )
  const hasExpertise = identityData.expertise.length > 0
  const hasInterests = identityData.interests.length > 0

  return (
    <Card>
      <CardHeader>
        <CardTitle>Identity Information</CardTitle>
        <CardDescription>Verified identity details</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {hasPersonalInfo && (
          <div>
            <h3 className="mb-2 font-semibold">Personal Information</h3>
            <div className="space-y-1 text-sm">
              {identityData.name && (
                <p>
                  <span className="font-medium">Name:</span> {identityData.name}
                </p>
              )}
              {identityData.bio && (
                <p>
                  <span className="font-medium">Bio:</span> {identityData.bio}
                </p>
              )}
              {identityData.email && (
                <p>
                  <span className="font-medium">Email:</span>{' '}
                  {identityData.email}
                </p>
              )}
              {identityData.location[0] && (
                <p>
                  <span className="font-medium">Location:</span>{' '}
                  {identityData.location[0]}
                  {identityData.location[1] && `, ${identityData.location[1]}`}
                </p>
              )}
              {identityData.website && (
                <p>
                  <span className="font-medium">Website:</span>{' '}
                  <a
                    href={identityData.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline dark:text-blue-400"
                  >
                    {identityData.website}
                  </a>
                </p>
              )}
              {identityData.profileType && (
                <p>
                  <span className="font-medium">Profile Type:</span>{' '}
                  {identityData.profileType}
                </p>
              )}
            </div>
          </div>
        )}

        {hasSocialLinks && (
          <div>
            <h3 className="mb-2 font-semibold">Social Links</h3>
            <div className="space-y-1 text-sm">
              {identityData.github && (
                <p>
                  <span className="font-medium">GitHub:</span>{' '}
                  {identityData.github}
                </p>
              )}
              {identityData.x && (
                <p>
                  <span className="font-medium">X (Twitter):</span>{' '}
                  {identityData.x}
                </p>
              )}
              {identityData.linkedin && (
                <p>
                  <span className="font-medium">LinkedIn:</span>{' '}
                  {identityData.linkedin}
                </p>
              )}
              {identityData.telegram && (
                <p>
                  <span className="font-medium">Telegram:</span>{' '}
                  {identityData.telegram}
                </p>
              )}
              {identityData.mastodon && (
                <p>
                  <span className="font-medium">Mastodon:</span>{' '}
                  {identityData.mastodon}
                </p>
              )}
              {identityData.instagram && (
                <p>
                  <span className="font-medium">Instagram:</span>{' '}
                  {identityData.instagram}
                </p>
              )}
              {identityData.youtube && (
                <p>
                  <span className="font-medium">YouTube:</span>{' '}
                  {identityData.youtube}
                </p>
              )}
            </div>
          </div>
        )}

        {hasExpertise && (
          <div>
            <h3 className="mb-2 font-semibold">Expertise</h3>
            <div className="flex flex-wrap gap-2">
              {identityData.expertise.map((skill, index) => (
                <span
                  key={index}
                  className="rounded-full bg-blue-100 px-3 py-1 text-xs dark:bg-blue-900"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        )}

        {hasInterests && (
          <div>
            <h3 className="mb-2 font-semibold">Interests</h3>
            <div className="flex flex-wrap gap-2">
              {identityData.interests.map((interest, index) => (
                <span
                  key={index}
                  className="rounded-full bg-purple-100 px-3 py-1 text-xs dark:bg-purple-900"
                >
                  {interest}
                </span>
              ))}
            </div>
          </div>
        )}

        {hasCustomFields && (
          <div>
            <h3 className="mb-2 font-semibold">Custom Fields</h3>
            <div className="space-y-1 text-sm">
              {identityData.customFields
                .filter((field) => field.key && field.value)
                .map((field, index) => (
                  <p key={index}>
                    <span className="font-medium">{field.key}:</span>{' '}
                    {field.value}
                  </p>
                ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
