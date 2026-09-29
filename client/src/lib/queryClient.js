/**
 * TanStack Query client configuration.
 * Centralised cache & retry defaults for the entire application.
 *
 * Defaults chosen for a public-facing NGO site:
 *  - staleTime  5 min  → cached data shown instantly on back-navigation; API only
 *                         re-hit after 5 minutes of inactivity.
 *  - gcTime    10 min  → garbage-collect unused queries after 10 minutes.
 *  - retry       2     → retry failed requests twice before surfacing an error.
 *  - refetchOnWindowFocus false → prevents unnecessary re-fetches when the user
 *                                 alt-tabs back (good for static campaign pages).
 */
import { QueryClient } from '@tanstack/react-query'

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000,        // 5 minutes
      gcTime: 10 * 60 * 1000,          // 10 minutes (formerly cacheTime)
      retry: 2,
      refetchOnWindowFocus: false,
      refetchOnReconnect: true,
    },
    mutations: {
      retry: 0,                          // mutations should not auto-retry
    },
  },
})
