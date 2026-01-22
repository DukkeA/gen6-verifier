import { Link, createFileRoute } from '@tanstack/react-router'
import { ArrowRight, Shield, UserCheck } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

export const Route = createFileRoute('/')({
  component: App,
})

function App() {
  return (
    <div className="container mx-auto max-w-4xl space-y-12 py-12">
      <header className="space-y-4 text-center">
        <h1 className="text-4xl font-bold tracking-tight">Gen6 Verifier</h1>
        <p className="text-muted-foreground text-lg">
          Verify authenticity with cryptographic proof stored on-chain
        </p>
      </header>

      <section className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <div className="mb-2 flex items-center gap-2">
              <Shield className="size-5 text-primary" />
              <CardTitle>RealSeal Verification</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground text-sm">
              Verify document authenticity by checking file hashes against
              Gen6's blockchain storage. Get cryptographic proof that lasts
              forever.
            </p>
            <Button asChild className="w-full">
              <Link to="/real-seal">
                Verify Document
                <ArrowRight className="ml-2 size-4" />
              </Link>
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="mb-2 flex items-center gap-2">
              <UserCheck className="size-5 text-primary" />
              <CardTitle>Identity Verification</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground text-sm">
              Verify digital identities across Gen6 platforms by comparing with
              on-chain storage. Build trust through verifiable credentials.
            </p>
            <Button asChild className="w-full">
              <Link to="/identity">
                Verify Identity
                <ArrowRight className="ml-2 size-4" />
              </Link>
            </Button>
          </CardContent>
        </Card>
      </section>

      <footer className="text-muted-foreground space-y-2 text-center text-sm">
        <p>
          Powered by{' '}
          <a
            href="https://gen6.life"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-foreground font-medium underline underline-offset-4"
          >
            Gen6
          </a>{' '}
          blockchain infrastructure and web3 solutions
        </p>
        <p className="text-xs">
          A digital ecosystem built for truth, not trends
        </p>
      </footer>
    </div>
  )
}
