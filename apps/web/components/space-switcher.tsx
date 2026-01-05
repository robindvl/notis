"use client"

import * as React from "react"
import { ChevronDown, Plus, Globe } from "lucide-react"
import { useParams, useRouter, usePathname } from "next/navigation"
import { useQuery } from "@tanstack/react-query"
import { trpc } from "@/shared/api"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

export function SpaceSwitcher() {
  const params = useParams()
  const router = useRouter()
  const pathname = usePathname()
  const currentId = params?.id as string

  const { data: spaces } = useQuery(trpc.spaces.list.queryOptions())

  const activeSpace = React.useMemo(() => 
    spaces?.find(s => s.id === currentId) || spaces?.[0], 
    [spaces, currentId]
  )

  if (!activeSpace || !spaces) {
    return null
  }

  const handleSpaceChange = (spaceId: string) => {
    // Сохраняем текущий подраздел (notes, tracker, messenger) при переключении space
    const segments = pathname.split('/')
    const currentSection = segments[3]
    const validSections = ['notes', 'tracker', 'messenger']
    const section = validSections.includes(currentSection) ? currentSection : 'notes'
    
    router.push(`/spaces/${spaceId}/${section}`)
  }

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton className="w-fit px-1.5 hover:bg-transparent active:bg-transparent">
              <div className="flex aspect-square size-5 items-center justify-center rounded-md bg-sidebar-primary text-sidebar-primary-foreground">
                <Globe className="size-3" />
              </div>
              <span className="truncate font-semibold">{activeSpace.name}</span>
              <ChevronDown className="opacity-50" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-64 rounded-lg"
            align="start"
            side="bottom"
            sideOffset={4}
          >
            <DropdownMenuLabel className="text-xs text-muted-foreground">
              Spaces
            </DropdownMenuLabel>
            {spaces.map((space, index) => (
              <DropdownMenuItem
                key={space.id}
                onClick={() => handleSpaceChange(space.id)}
                className="gap-2 p-2"
              >
                <div className="flex size-6 items-center justify-center rounded-sm border">
                  <Globe className="size-4 shrink-0" />
                </div>
                {space.name}
                <DropdownMenuShortcut>⌘{index + 1}</DropdownMenuShortcut>
              </DropdownMenuItem>
            ))}
            <DropdownMenuSeparator />
            <DropdownMenuItem className="gap-2 p-2">
              <div className="flex size-6 items-center justify-center rounded-md border bg-background">
                <Plus className="size-4" />
              </div>
              <div className="font-medium text-muted-foreground">Add space</div>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}

