/**
 * Barrel export for all API service modules.
 * Import any API function from a single clean path:
 *   import { getCampaigns, getCampaignById } from '@/lib/api'
 */
export * from './campaigns'
export * from './gallery'
export * from './donations'
export { default as apiClient } from './client'
