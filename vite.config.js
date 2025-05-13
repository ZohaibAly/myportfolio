import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import postcssMediaMinmax from 'postcss-media-minmax'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  css: {
    postcss: {
      plugins: [
        postcssMediaMinmax()
      ]
    }
  }
})