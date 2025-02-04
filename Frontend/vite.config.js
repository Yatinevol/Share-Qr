import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  server:{
    host: '0.0.0.0',  // Allows external access
    port: 5173,       // Change this if your app uses a different port
    strictPort: true, // Ensures it always uses the specified port
    allowedHosts: ['.ngrok-free.app'], // Allow Ngrok domain
  },
  plugins: [react(), tailwindcss()],

})
