import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import photoManifest from './vite-plugins/photoManifest.js'

// Vercel serves from root (/), so base is just '/'.
// build.outDir: 'dist' is the standard Vite output folder Vercel expects.

export default defineConfig({
  plugins: [react(), photoManifest()],
  base: '/',
  publicDir: 'public',
  build: {
    outDir: 'dist',
    emptyOutDir: true,
  },
})
