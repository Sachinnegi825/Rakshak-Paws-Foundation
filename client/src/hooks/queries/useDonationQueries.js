/**
 * Donations query hooks (admin-facing).
 */
import { useQuery } from '@tanstack/react-query'
import { getDonations } from '../../lib/api'
import { queryKeys } from '../../lib/queryKeys'

/**
 * Paginated donations list (admin only).
 * @param {{ page?: number, limit?: number }} params
 */
export function useDonations({ page = 1, limit = 20 } = {}) {
  return useQuery({
    queryKey: queryKeys.donations.list(page, limit),
    queryFn: () => getDonations({ page, limit }),
    placeholderData: (previousData) => previousData,
  })
}

/**
 * All donations (for dashboard aggregation).
 * High limit so we can compute chart data on the client.
 */
export function useAllDonations() {
  return useQuery({
    queryKey: queryKeys.donations.all(),
    queryFn: () => getDonations({ page: 1, limit: 1000 }),
    staleTime: 2 * 60 * 1000, // dashboard refreshes every 2 min
  })
}
