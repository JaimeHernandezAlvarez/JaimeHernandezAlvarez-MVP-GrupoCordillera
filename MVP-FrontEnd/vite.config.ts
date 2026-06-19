import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite' // 1. Importamos el plugin de Tailwind v4

export default defineConfig({
  plugins: [
    react(), 
    tailwindcss() // 2. Lo agregamos aquí para que procese tus estilos corporativos
  ],
  server: {
    proxy: {
      // Intercepta el Login
      '/auth': {
        target: 'http://localhost:8080',
        changeOrigin: true,
        secure: false,
      },
      // Intercepta las llamadas del Dashboard y cualquier otra API
      '/api': {
        target: 'http://localhost:8080',
        changeOrigin: true,
        secure: false,
      }
    }
  }
})