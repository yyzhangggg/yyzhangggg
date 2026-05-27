import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// GitHub Pages deploys this repo under /my_website/
// publicDir: 'docs' lets Vite serve docs/images & docs/assets during `npm run dev`
// build.outDir: 'docs' outputs the built site back into docs/ for GitHub Pages
// build.emptyOutDir: false preserves images/assets that aren't managed by Vite

export default defineConfig({
  plugins: [react()],
  base: '/my_website/',
  publicDir: 'docs',       // serve docs/ as static root in dev
  build: {
    outDir: 'docs',
    emptyOutDir: false,    // keep existing images / assets in docs/
  },
})
