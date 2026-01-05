"use client";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";

import { trpc } from "@/shared/api";

export default function Page() {
    const params = useParams<{ pageUuid: string }>();

    const page = useQuery(
        trpc.pages.show.queryOptions({ uuid: params?.pageUuid || "" })
    );

    return <>
        {page.data?.name}
    </>;
}
