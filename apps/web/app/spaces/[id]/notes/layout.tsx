// app/spaces/[id]/notes/layout.tsx
"use client"

import React from 'react';
import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarHeader, SidebarInput, SidebarInset } from "@/components/ui/sidebar"
import { SpaceSwitcher } from "@/components/space-switcher"
import { trpc } from '@/shared/api';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import { NotesTree } from "@/components/notes-tree";
import { ButtonCreateNote } from "@/components/button-create-note/button-create-note";

export default function NotesLayout({
                                      children,
                                    }: {
  children: React.ReactNode;
}) {
  const params = useParams();
  const spaceId = params?.id as string;

  const notes = useQuery(
      trpc.notes.list.queryOptions({ spaceId })
  );

  return (
      <>
        <Sidebar collapsible="none" className="hidden w-80 md:flex border-r">
          <SidebarHeader className="gap-3.5 border-b p-4">
            <div className="flex w-full items-center justify-between">
              <SpaceSwitcher />
              <ButtonCreateNote variant="text" />
            </div>
            <SidebarInput placeholder="Type to search..." />
          </SidebarHeader>
          <SidebarContent>
            <SidebarGroup className="px-0">
              <SidebarGroupContent>
                {notes.data ?
                    <NotesTree
                        notes={notes.data as any}
                    />
                    : notes.isLoading ?
                        <div className="p-4 text-sm text-muted-foreground">Загрузка...</div>
                        : notes.isError ?
                            <div className="p-4 text-sm text-destructive">Ошибка загрузки</div>
                            :
                            <div className="p-4 text-sm text-muted-foreground">Список заметок пуст</div>
                }
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
        </Sidebar>
        <SidebarInset>
          {children}
        </SidebarInset>
      </>
  );
}
