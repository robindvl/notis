"use client";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";

import { trpc } from "@/shared/api";
import {Button} from "@/components/ui/button";
import {Select} from "@/components/ui/select";
import {AppSidebar} from "@/components/app-sidebar";

export default function Page() {
  const params = useParams<{ pageUuid: string }>();

  const page = useQuery(
      trpc.blocks.show.queryOptions({ uuid: params?.pageUuid || "" })
  );

  return <>
    {page.data?.name}
    <Button>Edit</Button>
    <AppSidebar/>
  </>;
}
