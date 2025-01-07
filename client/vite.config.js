import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000, // Change this to your desired port number
    proxy: {
      '/api': {
        target: 'https://estate.theabacuses.com',
        changeOrigin: true,
      },
    },
  },
})
