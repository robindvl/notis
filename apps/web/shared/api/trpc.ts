import { httpBatchLink, createTRPCClient } from "@trpc/client";

import { createTRPCOptionsProxy } from "@trpc/tanstack-react-query";
import { QueryClient } from "@tanstack/react-query";

import type { AppRouter } from "@repo/gateway/src/processors/trpc/trpc.router";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false, // отключает refetch при возвращении фокуса на окно/вкладку
      refetchOnReconnect: false, // отключает refetch при восстановлении сетевого соединения
    },
  },
});

export const trpcClient = createTRPCClient<AppRouter>({
  links: [
    httpBatchLink({
      url: `${process.env.NEXT_PUBLIC_NESTJS_SERVER}/trpc`,
    }),
  ],
});

export const trpc = createTRPCOptionsProxy<AppRouter>({
  client: trpcClient,
  queryClient,
});
