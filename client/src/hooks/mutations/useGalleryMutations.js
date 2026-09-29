/**
 * Gallery mutation hooks.
 */
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createGalleryItem, deleteGalleryItem } from '../../lib/api'
import { queryKeys } from '../../lib/queryKeys'

export function useCreateGalleryItem() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: createGalleryItem,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: queryKeys.gallery.all() })
    },
  })
}

export function useDeleteGalleryItem() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: deleteGalleryItem,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: queryKeys.gallery.all() })
    },
  })
}
