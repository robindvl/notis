"use client"

import { useMemo, type ComponentProps } from "react"
import { Command, MessageSquare, StickyNote, Target } from "lucide-react"
import { useParams, usePathname } from "next/navigation"
import Link from "next/link"
import { useQuery } from "@tanstack/react-query"

import { NavUser } from "@/components/nav-user"
import { trpc } from "@/shared/api/trpc"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

export function AppSidebar({ ...props }: ComponentProps<typeof Sidebar>) {
  const params = useParams()
  const pathname = usePathname()
  const id = params?.id as string

  const { data: user } = useQuery(trpc.users.me.queryOptions())
  
  const navMain = useMemo(() => [
    {
      title: "Заметки",
      url: `/spaces/${id}/notes`,
      icon: StickyNote,
    },
    {
      title: "Трекер",
      url: `/spaces/${id}/tracker`,
      icon: Target,
    },
    {
      title: "Месседжер",
      url: `/spaces/${id}/messenger`,
      icon: MessageSquare,
    },
  ], [id])

  const userData = useMemo(() => {
    return {
      name: user?.name || "Loading...",
      email: user?.email || "...",
      avatar: "",
    }
  }, [user])

  return (
    <Sidebar
      collapsible="none"
      className="!w-[calc(var(--sidebar-width-icon)_+_1px)] border-r"
      {...props}
    >
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild className="md:h-8 md:p-0">
              <Link href={`/spaces/${id}`}>
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                  <Command className="size-4" />
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent className="px-1.5 md:px-0">
            <SidebarMenu>
              {navMain.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    tooltip={{
                      children: item.title,
                      hidden: false,
                    }}
                    asChild
                    isActive={pathname.startsWith(item.url)}
                    className="px-2.5 md:px-2"
                  >
                    <Link href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={userData} />
      </SidebarFooter>
    </Sidebar>
  )
}
