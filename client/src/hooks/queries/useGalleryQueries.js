/**
 * Gallery query hooks.
 */
import { useQuery } from '@tanstack/react-query'
import { getGallery } from '../../lib/api'
import { queryKeys } from '../../lib/queryKeys'

/**
 * Paginated gallery list (used by GalleryPage).
 * @param {{ page?: number, limit?: number }} params
 */
export function useGallery({ page = 1, limit = 20 } = {}) {
  return useQuery({
    queryKey: queryKeys.gallery.list(page, limit),
    queryFn: () => getGallery({ page, limit }),
    placeholderData: (previousData) => previousData,
  })
}

/**
 * Home-page gallery preview — top 4 items.
 */
export function useGalleryPreview() {
  return useQuery({
    queryKey: queryKeys.gallery.preview(),
    queryFn: () => getGallery({ page: 1, limit: 4 }),
    select: (data) => data.data?.slice(0, 4) ?? [],
    staleTime: 10 * 60 * 1000,
  })
}
