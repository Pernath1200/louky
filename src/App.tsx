import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import Louky from './louky'

/**
 * Louky host wiring
 *
 * - Wrap the tree in `<BrowserRouter>` (or your existing router).
 * - Mount the module at a splat route: `path="louky/*"` → `<Louky basePath="/louky" />`.
 * - `basePath` must match the URL prefix (no trailing slash).
 * - To embed under another path, e.g. `/study/louky`, use:
 *   `<Route path="study/louky/*" element={<Louky basePath="/study/louky" />} />`
 *
 * Full spreadsheet / CSV data: see comments in `src/louky/wordPartsData.ts`.
 */
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/louky/hub" replace />} />
        <Route path="louky/*" element={<Louky basePath="/louky" />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
