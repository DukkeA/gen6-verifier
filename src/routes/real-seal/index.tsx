import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/real-seal/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/real-seal/"!</div>
}
