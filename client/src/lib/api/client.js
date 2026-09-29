/**
 * Axios HTTP client instance.
 * All requests in this app go through this singleton.
 * Configure base URL, timeouts, auth headers, and interceptors here.
 */
import axios from 'axios'

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
  timeout: 15_000,
  headers: {
    'Content-Type': 'application/json',
  },
})

// ─── Request Interceptor ──────────────────────────────────────────────────────
apiClient.interceptors.request.use(
  (config) => {
    // Attach auth token if available
    const token = localStorage.getItem('rakshak_admin_token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => Promise.reject(error),
)

// ─── Response Interceptor ─────────────────────────────────────────────────────
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    // Global error handling — e.g., redirect on 401
    if (error.response?.status === 401) {
      localStorage.removeItem('rakshak_admin_token')
    }
    return Promise.reject(error)
  },
)

export default apiClient
