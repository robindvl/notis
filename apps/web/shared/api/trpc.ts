import { httpBatchLink, createTRPCClient } from "@trpc/client";

import { createTRPCOptionsProxy } from "@trpc/tanstack-react-query";
import { QueryClient } from "@tanstack/react-query";
import superjson from 'superjson';

import type { AppRouter } from "@repo/api/src/processors/trpc/trpc.router";

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
      transformer: superjson,
      headers() {
        if (typeof window !== 'undefined') {
          const token = document.cookie
            .split('; ')
            .find((row) => row.startsWith('token='))
            ?.split('=')[1];
          if (token) return { Authorization: `Bearer ${token}` };
        }
        return {};
      },
      fetch(url, options) {
        return fetch(url, {
          ...options,
          credentials: 'include',
        });
      },
    }),
  ],
});

export const trpc = createTRPCOptionsProxy<AppRouter>({
  client: trpcClient,
  queryClient,
});
