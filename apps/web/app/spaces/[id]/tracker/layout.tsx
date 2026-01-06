"use client"

import React from 'react';
import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarHeader, SidebarInput, SidebarInset } from "@/components/ui/sidebar"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { SpaceSwitcher } from "@/components/space-switcher"
import {useParams} from "next/navigation";
import {useQuery} from "@tanstack/react-query";
import {trpc} from "@/shared/api";
import Link from "next/link";

export default function TrackerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const params = useParams();
  const ownerId = params?.id as string;

  const projects = useQuery(
      trpc.projects.list.queryOptions({ ownerId })
  );

  console.log('projects', projects);

  return (
    <>
      <Sidebar collapsible="none" className="hidden w-80 md:flex border-r">
        <SidebarHeader className="gap-3.5 border-b p-4">
          <div className="flex w-full items-center justify-between">
            <SpaceSwitcher />
          </div>
          <SidebarInput placeholder="Type to search..." />
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup className="px-0">
            <SidebarGroupContent>
              {projects.data ?
                  projects.data.map(project => (
                    <Link
                        key={project.id}
                        href={`/spaces/${params?.id}/projects/${project.id}`}
                        className="flex items-center p-2 hover:bg-muted cursor-pointer"
                    >
                      <span className="flex items-center gap-2 text-sm">
                        {project.name}
                      </span>
                    </Link>
                  ))
                  : projects.isLoading ?
                      <div className="p-4 text-sm text-muted-foreground">Загрузка...</div>
                      : projects.isError ?
                          <div className="p-4 text-sm text-destructive">Ошибка загрузки</div>
                          :
                          <div className="p-4 text-sm text-muted-foreground">Список проектов пуст</div>
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

