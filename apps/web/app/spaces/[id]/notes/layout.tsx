"use client"

import React from 'react';
import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarHeader, SidebarInput, SidebarInset } from "@/components/ui/sidebar"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { SpaceSwitcher } from "@/components/space-switcher"
import { trpc } from '@/shared/api';
import { useQuery } from '@tanstack/react-query';
import {useParams} from "next/navigation";
import Link from "next/link";

export default function NotesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const notes = useQuery(
    trpc.notes.list.queryOptions({})
  );

  const params = useParams();

  console.log(notes)

  return (
    <>
      <Sidebar collapsible="none" className="hidden w-80 md:flex border-r">
        <SidebarHeader className="gap-3.5 border-b p-4">
          <div className="flex w-full items-center justify-between">
            <SpaceSwitcher />
            <Label className="flex items-center gap-2 text-sm">
              <span>Unreads</span>
              <Switch className="shadow-none" />
            </Label>
          </div>
          <SidebarInput placeholder="Type to search..." />
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup className="px-0">
            <SidebarGroupContent>
              {notes.data ?
                notes.data.map(note => (
                  <Link
                    key={note.id}
                    href={`/spaces/${params?.id}/notes/${note.id}`}
                    className="flex items-center p-2 hover:bg-muted cursor-pointer"
                  >
                    <span className="flex items-center gap-2 text-sm">
                      <span>{note.emoji}</span> {note.name}
                    </span>
                  </Link>
                ))
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
