/**
 * Donations API service layer.
 * Pure async functions — no React, no hooks, no side effects.
 */
import apiClient from './client'

/**
 * Fetch all donations (admin only).
 * @param {{ page?: number, limit?: number }} params
 */
export const getDonations = async ({ page = 1, limit = 20 } = {}) => {
  const { data } = await apiClient.get(`/donations?page=${page}&limit=${limit}`)
  return data
}

/**
 * Initiate a Razorpay donation order.
 * @param {{ campaignId: string, amount: number }} payload
 */
export const createDonationOrder = async (payload) => {
  const { data } = await apiClient.post('/donations/create-order', payload)
  return data
}

/**
 * Verify a completed Razorpay payment.
 * @param {Object} payload - Razorpay verification fields
 */
export const verifyDonation = async (payload) => {
  const { data } = await apiClient.post('/donations/verify', payload)
  return data
}
