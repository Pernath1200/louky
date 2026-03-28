import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
// Dev: base `/` so http://localhost:5173/ works. Build: `/louky/` for GitHub Pages project URLs.
export default defineConfig(({ command }) => ({
  base: command === 'build' ? '/louky/' : '/',
  plugins: [react(), tailwindcss()],
}))
