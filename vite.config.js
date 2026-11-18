import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'node:path'

export default defineConfig({
  plugins: [react()],
  build: {
    // Two pages: the main site and the standalone /kebutuhan/ form.
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        kebutuhan: resolve(__dirname, 'kebutuhan/index.html'),
      },
    },
  },
})
