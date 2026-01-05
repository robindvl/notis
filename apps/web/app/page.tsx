"use client";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";

import { trpc } from "@/shared/api";
import {Button} from "@/components/ui/button";
import {AppSidebar} from "@/components/app-sidebar";

export default function Page() {
  const params = useParams<{ noteId: string }>();

  const note = useQuery(
    trpc.notes.show.queryOptions({ id: params?.noteId || "" })
  );

  return <>
    {note.data?.title}
    {note.data?.body && <p>{note.data.body}</p>}
    <Button>Edit</Button>
    <AppSidebar/>
  </>;
}
