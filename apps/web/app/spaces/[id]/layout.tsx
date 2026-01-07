import React from 'react';
import { AppSidebar } from "@/components/app-sidebar"

export default function SpaceLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <AppSidebar />
      {children}
    </>
  );
}
