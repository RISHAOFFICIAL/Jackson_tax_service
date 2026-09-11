import { QueryClient } from "@tanstack/react-query";
import { httpBatchLink, httpLink, splitLink } from "@trpc/client";
import { createTRPCReact } from "@trpc/react-query";
import type { AppRouter } from "../../../server/src/index.js";

export const trpc = createTRPCReact<AppRouter>();

export function getTrpcClient(token?: string | null) {
  const headers: Record<string, string> = {};
  if (token) {
    headers["authorization"] = `Bearer ${token}`;
  }

  return trpc.createClient({
    links: [
      splitLink({
        condition: (op) => op.type === "query",
        true: httpBatchLink({
          url: "/api/trpc",
          headers,
        }),
        false: httpLink({
          url: "/api/trpc",
          headers,
        }),
      }),
    ],
  });
}

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000,
      retry: 1,
    },
  },
});