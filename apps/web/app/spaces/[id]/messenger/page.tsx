"use client";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";

import { trpc } from "@/shared/api";

export default function Page() {
  const params = useParams<{ pageId: string }>();

  const page = useQuery(
    trpc.pages.show.queryOptions({ id: params?.pageId || "" })
  );

  return page.data?.name;
}
