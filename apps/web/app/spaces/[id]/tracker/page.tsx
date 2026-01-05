"use client";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";

import { trpc } from "@/shared/api";

export default function Page() {
  const params = useParams<{ noteId: string }>();

  const note = useQuery(
    trpc.notes.show.queryOptions({ id: params?.noteId || "" })
  );

  return note.data?.name;
}
