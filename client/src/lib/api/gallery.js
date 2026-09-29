/**
 * Gallery API service layer.
 * Pure async functions — no React, no hooks, no side effects.
 */
import apiClient from './client'

/**
 * Fetch a paginated list of gallery items.
 * @param {{ page?: number, limit?: number }} params
 */
export const getGallery = async ({ page = 1, limit = 20 } = {}) => {
  const { data } = await apiClient.get(`/gallery?page=${page}&limit=${limit}`)
  return data
}

/**
 * Create a new gallery item (admin only).
 * @param {Object} payload
 */
export const createGalleryItem = async (payload) => {
  const { data } = await apiClient.post('/gallery', payload)
  return data
}

/**
 * Delete a gallery item (admin only).
 * @param {string} id
 */
export const deleteGalleryItem = async (id) => {
  const { data } = await apiClient.delete(`/gallery/${id}`)
  return data
}
