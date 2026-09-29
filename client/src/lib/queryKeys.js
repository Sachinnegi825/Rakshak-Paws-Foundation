/**
 * Centralised Query Key factory.
 * Prevents typos, makes invalidation predictable, and keeps keys DRY.
 *
 * Usage:
 *   queryKeys.campaigns.all()          → ['campaigns']
 *   queryKeys.campaigns.list(1, 7)     → ['campaigns', 'list', { page: 1, limit: 7 }]
 *   queryKeys.campaigns.detail('slug') → ['campaigns', 'detail', 'slug']
 */
export const queryKeys = {
  campaigns: {
    all: () => ['campaigns'],
    list: (page, limit) => ['campaigns', 'list', { page, limit }],
    detail: (id) => ['campaigns', 'detail', id],
    // home preview (top-3) — separate key so it caches independently
    preview: () => ['campaigns', 'preview'],
  },
  gallery: {
    all: () => ['gallery'],
    list: (page, limit) => ['gallery', 'list', { page, limit }],
    // home preview (top-4)
    preview: () => ['gallery', 'preview'],
  },
  donations: {
    all: () => ['donations'],
    list: (page, limit) => ['donations', 'list', { page, limit }],
  },
  admin: {
    dashboard: () => ['admin', 'dashboard'],
  },
}
