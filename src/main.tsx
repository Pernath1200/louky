import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
// Louky feature: `src/louky/`. Routes: nested under `path="louky"` in `App.tsx`.
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
