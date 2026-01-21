import { SidebarIcon } from 'lucide-react'
import { Link, useMatches } from '@tanstack/react-router'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { useSidebar } from '@/components/ui/sidebar'

// Mapeo de rutas a títulos legibles
const routeTitles: Record<string, string> = {
  '/': 'Home',
  '/identity': 'Identity',
  '/real-seal': 'Real Seal',
}

export function SiteHeader() {
  const { toggleSidebar } = useSidebar()
  const matches = useMatches()

  // Obtener la ruta actual
  const currentPath = matches[matches.length - 1]?.pathname || '/'

  // Generar breadcrumbs basados en la ruta
  const breadcrumbs = currentPath
    .split('/')
    .filter(Boolean)
    .reduce<Array<{ path: string; title: string }>>(
      (acc, segment, index, array) => {
        const path = '/' + array.slice(0, index + 1).join('/')
        const title =
          routeTitles[path] ||
          segment.charAt(0).toUpperCase() + segment.slice(1)
        acc.push({ path, title })
        return acc
      },
      [],
    )

  return (
    <header className="bg-background sticky top-0 z-50 flex w-full items-center border-b">
      <div className="flex h-(--header-height) w-full items-center gap-2 px-4">
        <Button
          className="h-8 w-8 cursor-pointer"
          variant="ghost"
          size="icon"
          onClick={toggleSidebar}
        >
          <SidebarIcon />
        </Button>
        <Separator orientation="vertical" className="mr-2 h-4" />
        <Breadcrumb className="hidden sm:block">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link to="/">Home</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            {breadcrumbs.length > 0 && (
              <>
                {breadcrumbs.map((crumb, index) => (
                  <div key={crumb.path} className="contents">
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                      {index === breadcrumbs.length - 1 ? (
                        <BreadcrumbPage>{crumb.title}</BreadcrumbPage>
                      ) : (
                        <BreadcrumbLink asChild>
                          <Link to={crumb.path}>{crumb.title}</Link>
                        </BreadcrumbLink>
                      )}
                    </BreadcrumbItem>
                  </div>
                ))}
              </>
            )}
          </BreadcrumbList>
        </Breadcrumb>
      </div>
    </header>
  )
}
