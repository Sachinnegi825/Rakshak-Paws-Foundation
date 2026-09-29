/**
 * Campaign API service layer.
 * Pure async functions — no React, no hooks, no side effects.
 * These are the single source of truth for all campaign-related HTTP calls.
 */
import apiClient from './client'

/**
 * @typedef {Object} PaginationParams
 * @property {number} [page=1]
 * @property {number} [limit=7]
 */

/**
 * Fetch a paginated list of campaigns.
 * @param {PaginationParams} params
 */
export const getCampaigns = async ({ page = 1, limit = 7 } = {}) => {
  const { data } = await apiClient.get(`/campaigns?page=${page}&limit=${limit}`)
  return data
}

/**
 * Fetch a single campaign by its slug or ID.
 * @param {string} id  - slug or MongoDB ObjectId
 */
export const getCampaignById = async (id) => {
  const { data } = await apiClient.get(`/campaigns/${id}`)
  return data.data
}

/**
 * Create a new campaign (admin only).
 * @param {Object} payload
 */
export const createCampaign = async (payload) => {
  const { data } = await apiClient.post('/campaigns', payload)
  return data
}

/**
 * Update an existing campaign (admin only).
 * @param {string} id
 * @param {Object} payload
 */
export const updateCampaign = async ({ id, payload }) => {
  const { data } = await apiClient.put(`/campaigns/${id}`, payload)
  return data
}

/**
 * Delete a campaign by ID (admin only).
 * @param {string} id
 */
export const deleteCampaign = async (id) => {
  const { data } = await apiClient.delete(`/campaigns/${id}`)
  return data
}
