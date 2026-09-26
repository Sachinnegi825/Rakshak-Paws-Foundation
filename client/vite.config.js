import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vite'
import { fileURLToPath, URL } from 'node:url'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  build: {
    chunkSizeWarningLimit: 1500, // Increase warning limit to 1.5MB
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            // Split out framer-motion into its own chunk
            if (id.includes('framer-motion')) {
              return 'vendor-framer-motion'
            }
            // Split out react and react-dom
            if (id.includes('react') || id.includes('react-dom')) {
              return 'vendor-react'
            }
            // All other node_modules go to a generic vendor chunk
            return 'vendor'
          }
        }
      }
    }
  }
})
