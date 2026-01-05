"use client"

import React from 'react';
import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarHeader, SidebarInput, SidebarInset } from "@/components/ui/sidebar"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { SpaceSwitcher } from "@/components/space-switcher"

export default function MessengerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
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
              <div className="p-4 text-sm text-muted-foreground">
                Диалоги не найдены
              </div>
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

