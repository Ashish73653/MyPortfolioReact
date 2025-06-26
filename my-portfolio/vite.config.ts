import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    // Custom plugin to replace environment variables in HTML
    {
      name: 'html-env-replace',
      transformIndexHtml(html) {
        return html.replace(
          '%VITE_GA_TRACKING_ID%',
          process.env.VITE_GA_TRACKING_ID || ''
        );
      }
    }
  ],
  base: process.env.NODE_ENV === 'production' ? '/' : '/',
})
