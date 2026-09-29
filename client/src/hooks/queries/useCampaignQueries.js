/**
 * Campaign query hooks.
 * These are the ONLY React-aware layer for campaign data fetching.
 * Pages and components must use these hooks — never call the API directly.
 */
import { useQuery } from '@tanstack/react-query'
import { getCampaigns, getCampaignById } from '../../lib/api'
import { queryKeys } from '../../lib/queryKeys'

/**
 * Paginated campaign list (used by CampaignsList page).
 * @param {{ page?: number, limit?: number }} params
 */
export function useCampaigns({ page = 1, limit = 7 } = {}) {
  return useQuery({
    queryKey: queryKeys.campaigns.list(page, limit),
    queryFn: () => getCampaigns({ page, limit }),
    placeholderData: (previousData) => previousData, // keep previous page visible while next loads
  })
}

/**
 * Home-page campaign preview — top 3 only.
 * Uses a dedicated cache key so it doesn't pollute the paginated list cache.
 */
export function useCampaignsPreview() {
  return useQuery({
    queryKey: queryKeys.campaigns.preview(),
    queryFn: () => getCampaigns({ page: 1, limit: 10 }),
    select: (data) => ({
      ...data,
      data: data.data?.slice(0, 3) ?? [],
    }),
    staleTime: 10 * 60 * 1000, // preview is static-ish; keep 10 min stale time
  })
}

/**
 * Single campaign detail (used by CampaignDetail page).
 * @param {string} id - slug or ObjectId
 */
export function useCampaignDetail(id) {
  return useQuery({
    queryKey: queryKeys.campaigns.detail(id),
    queryFn: () => getCampaignById(id),
    enabled: !!id, // don't fire if id is undefined/null
  })
}
