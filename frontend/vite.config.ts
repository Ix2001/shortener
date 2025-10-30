import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    proxy: {
      '/api': 'http://localhost:8080',
      '/swagger-ui': 'http://localhost:8080',
      '/api-docs': 'http://localhost:8080'
    }
  }
})
