import { createFileRoute } from '@tanstack/react-router'
import { Construction } from 'lucide-react'
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from '@/components/ui/empty'

export const Route = createFileRoute('/identity/')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div className="container mx-auto p-6">
      <Empty>
        <EmptyHeader>
          <EmptyMedia variant="icon">
            <Construction />
          </EmptyMedia>
          <EmptyTitle>Work In Progress</EmptyTitle>
          <EmptyDescription>
            Identity functionality is currently under development. Soon you'll
            be able to manage and verify digital identities.
          </EmptyDescription>
        </EmptyHeader>
        <EmptyContent>
          <p className="text-muted-foreground text-xs">
            In the meantime, you can explore{' '}
            <a href="/real-seal" className="font-medium">
              Real Seal
            </a>{' '}
            functionality to verify documents.
          </p>
        </EmptyContent>
      </Empty>
    </div>
  )
}
