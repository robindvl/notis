// components/notes-tree.tsx
"use client"

import * as React from "react"
import { ChevronRight, File, Folder } from "lucide-react"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
} from "@/components/ui/sidebar"
import { Note } from "@repo/domain"
import Link from "next/link"
import { useParams } from "next/navigation"
import { ButtonCreateNote } from "./button-create-note/button-create-note"

export type TreeItem = {
  id: string
  title: string
  emoji?: string
  type: 'section' | 'note'
  children: TreeItem[]
}

interface NotesTreeProps {
  notes: Note[]
}

export function NotesTree({ notes }: NotesTreeProps) {
  const params = useParams()

  const tree = React.useMemo(() => {
    const itemMap = new Map<string, TreeItem>()
    const topLevel: TreeItem[] = []

    // 1. Convert all notes to TreeItems
    notes.forEach(note => {
      const item: TreeItem = {
        id: note.id,
        title: note.title,
        emoji: note.emoji,
        type: note.type === 'section' ? 'section' : 'note',
        children: []
      }
      itemMap.set(note.id, item)
    })

    // 2. Build hierarchy
    notes.forEach(note => {
      const item = itemMap.get(note.id)!

      if (note.parentId && itemMap.has(note.parentId)) {
        itemMap.get(note.parentId)!.children.push(item)
      } else if (note.sectionId && itemMap.has(note.sectionId)) {
        itemMap.get(note.sectionId)!.children.push(item)
      } else {
        // If it has no parent and no sectionId, it's a top-level item
        topLevel.push(item)
      }
    })

    return topLevel
  }, [notes])

  return (
      <SidebarMenu>
        {tree.map((item) => (
            <Tree key={item.id} item={item} spaceId={params?.id as string} />
        ))}
      </SidebarMenu>
  )
}

function Tree({ item, spaceId }: { item: TreeItem; spaceId: string }) {
  const params = useParams()
  const currentNoteId = params?.noteId as string
  const hasChildren = item.children.length > 0
  const isActive = item.id === currentNoteId

  if (!hasChildren && item.type === 'note') {
    return (
        <SidebarMenuItem>
          <SidebarMenuButton asChild isActive={isActive}>
            <Link href={`/spaces/${spaceId}/notes/${item.id}`}>
              <div className="flex items-center gap-2 min-w-0">
                {item.emoji ? <span className="shrink-0">{item.emoji}</span> : <File className="size-4 shrink-0" />}
                <span className="truncate max-w-[180px]">{item.title}</span>
              </div>
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>
    )
  }

  return (
      <SidebarMenuItem>
        <Collapsible
            className="group/collapsible [&[data-state=open]>button>svg:first-child]:rotate-90"
            defaultOpen={item.type === 'section' || item.children.some(child => child.id === currentNoteId)}
        >
          <div className="flex items-center justify-between">
            <CollapsibleTrigger asChild className="flex-1">
              <SidebarMenuButton isActive={isActive} className="flex-1">
                <ChevronRight className="transition-transform size-4 shrink-0" />
                {item.type === 'section' ? <Folder className="size-4 shrink-0" /> : (item.emoji ? <span className="shrink-0">{item.emoji}</span> : <File className="size-4 shrink-0" />)}
                <span className="truncate max-w-[150px] flex-1 text-left">{item.title}</span>
              </SidebarMenuButton>
            </CollapsibleTrigger>

            {/* Кнопка создания внутри секции */}
            {item.type === 'section' && (
                <ButtonCreateNote
                    sectionId={item.id}
                    className="mr-2"
                />
            )}
          </div>

          <CollapsibleContent>
            <SidebarMenuSub>
              {item.children.map((subItem) => (
                  <Tree key={subItem.id} item={subItem} spaceId={spaceId} />
              ))}
            </SidebarMenuSub>
          </CollapsibleContent>
        </Collapsible>
      </SidebarMenuItem>
  )
}
