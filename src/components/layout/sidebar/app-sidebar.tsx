import * as React from 'react'
import {
  // BookOpen,
  // Bot,
  Command,
  Frame,
  // LifeBuoy,
  Map,
  PieChart,
  // Send,
  // Settings2,
  SquareTerminal,
} from 'lucide-react'

import { Link } from '@tanstack/react-router'
import { NavMain } from '@/components/layout/sidebar/nav-main'
// import { NavProjects } from '@/components/layout/sidebar/nav-projects'
import { NavSecondary } from '@/components/layout/sidebar/nav-secondary'
// import { NavUser } from '@/components/layout/sidebar/nav-user'
import {
  Sidebar,
  SidebarContent,
  // SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar'

const data = {
  user: {
    name: 'shadcn',
    email: 'm@example.com',
    avatar: '/avatars/shadcn.jpg',
  },
  navMain: [
    {
      title: 'Playground',
      url: '/',
      icon: SquareTerminal,
      isActive: true,
      items: [
        {
          title: 'Real Seal',
          url: '/real-seal',
        },
        {
          title: 'Identity',
          url: '/identity',
        },
      ],
    },
    // {
    //   title: 'Documentation',
    //   url: '#',
    //   icon: BookOpen,
    //   items: [
    //     {
    //       title: 'Introduction',
    //       url: '#',
    //     },
    //     {
    //       title: 'Get Started',
    //       url: '#',
    //     },
    //     {
    //       title: 'Tutorials',
    //       url: '#',
    //     },
    //     {
    //       title: 'Changelog',
    //       url: '#',
    //     },
    //   ],
    // },
  ],
  navSecondary: [
    // {
    //   title: 'Support',
    //   url: '#',
    //   icon: LifeBuoy,
    // },
    // {
    //   title: 'Feedback',
    //   url: '#',
    //   icon: Send,
    // },
  ],
  projects: [
    {
      name: 'Design Engineering',
      url: '#',
      icon: Frame,
    },
    {
      name: 'Sales & Marketing',
      url: '#',
      icon: PieChart,
    },
    {
      name: 'Travel',
      url: '#',
      icon: Map,
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link to="/">
                <img
                  src="/AppImages/android/android-launchericon-192-192.png"
                  alt="Gen6 Logo"
                  className="size-8"
                />
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">Gen6</span>
                  <span className="truncate text-xs">Web3 Solutions</span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        {/* <NavProjects projects={data.projects} /> */}
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      {/* <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter> */}
    </Sidebar>
  )
}
