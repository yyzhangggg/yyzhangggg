import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Vercel serves from root (/), so base is just '/'.
// publicDir: 'docs' lets Vite serve docs/images & docs/assets during `npm run dev`.
// build.outDir: 'dist' is the standard Vite output folder Vercel expects.

export default defineConfig({
  plugins: [react()],
  base: '/',
  publicDir: 'docs',       // serve docs/images, docs/assets in dev
  build: {
    outDir: 'dist',
    emptyOutDir: true,
  },
})
