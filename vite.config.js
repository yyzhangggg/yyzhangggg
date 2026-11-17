import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Vercel serves from root (/), so base is just '/'.
// build.outDir: 'dist' is the standard Vite output folder Vercel expects.

export default defineConfig({
  plugins: [react()],
  base: '/',
  publicDir: 'public',
  build: {
    outDir: 'dist',
    emptyOutDir: true,
  },
})
