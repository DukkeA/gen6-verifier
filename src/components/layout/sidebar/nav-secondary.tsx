import * as React from 'react'
import { Link } from '@tanstack/react-router'
import type { LucideIcon } from 'lucide-react'

import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar'
import { AnimatedThemeToggler } from '@/components/ui/animated-theme-toggler'

export function NavSecondary({
  items,
  ...props
}: {
  items: Array<{
    title: string
    url: string
    icon: LucideIcon
  }>
} & React.ComponentPropsWithoutRef<typeof SidebarGroup>) {
  const themeToggler = AnimatedThemeToggler({})

  return (
    <SidebarGroup {...props}>
      <SidebarGroupContent>
        <SidebarMenu>
          {items.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton asChild size="sm">
                <Link to={item.url}>
                  <item.icon />
                  <span>{item.title}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
          <SidebarMenuItem key={'theme-toggle'}>
            <SidebarMenuButton
              size="sm"
              ref={themeToggler.buttonRef}
              onClick={themeToggler.toggleTheme}
              className="cursor-pointer"
            >
              <themeToggler.Icon />
              <span>{themeToggler.label}</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  )
}
