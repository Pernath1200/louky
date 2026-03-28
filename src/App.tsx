import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { Layout } from './louky/components/Layout'
import { BuilderScreen } from './louky/screens/BuilderScreen'
import { DrillScreen } from './louky/screens/DrillScreen'
import { HubScreen } from './louky/screens/HubScreen'

/** URL prefix for this feature (no trailing slash). Must match Vite `base` on GitHub Pages. */
const LOUKY_BASE = '/louky'

/**
 * Louky routes live in this single `<Routes>` tree. Nesting another `<Routes>` under
 * `louky/*` with `path="/louky"` breaks matching in React Router v7 (blank UI).
 */
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to={`${LOUKY_BASE}/hub`} replace />} />
        <Route path="louky" element={<Layout basePath={LOUKY_BASE} />}>
          <Route index element={<Navigate to="hub" replace />} />
          <Route path="hub" element={<HubScreen />} />
          <Route path="drill" element={<DrillScreen />} />
          <Route path="builder" element={<BuilderScreen />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
