import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: '../backend/dist/frontend', // важное место сохранения
    emptyOutDir: true
  },
  server: {
    proxy: {
      '/api': 'http://localhost:3001' // 👈 API на Express
    }
  }
})
