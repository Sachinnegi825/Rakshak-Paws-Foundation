/**
 * Campaign mutation hooks.
 * Handles create / update / delete with automatic cache invalidation.
 */
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createCampaign, updateCampaign, deleteCampaign } from '../../lib/api'
import { queryKeys } from '../../lib/queryKeys'

/**
 * Create a campaign. On success, invalidates the entire campaigns list cache.
 */
export function useCreateCampaign() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: createCampaign,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: queryKeys.campaigns.all() })
    },
  })
}

/**
 * Update a campaign. On success, invalidates the specific detail AND list caches.
 * @param {string} id - the campaign being updated
 */
export function useUpdateCampaign(id) {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: updateCampaign,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: queryKeys.campaigns.detail(id) })
      qc.invalidateQueries({ queryKey: queryKeys.campaigns.all() })
    },
  })
}

/**
 * Delete a campaign. On success, invalidates the entire campaigns list.
 */
export function useDeleteCampaign() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: deleteCampaign,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: queryKeys.campaigns.all() })
    },
  })
}
