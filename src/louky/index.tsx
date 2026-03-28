import { Navigate, Route, Routes } from 'react-router-dom'
import { Layout } from './components/Layout'
import { BuilderScreen } from './screens/BuilderScreen'
import { DrillScreen } from './screens/DrillScreen'
import { HubScreen } from './screens/HubScreen'

export type LoukyProps = {
  /** URL segment for this module, e.g. `/louky`. Host should mount `<Louky />` at `${basePath}/*`. */
  basePath?: string
}

/**
 * Self-contained Louky routes. Mount from the host with a splat so subpaths resolve:
 * `<Route path="louky/*" element={<Louky basePath="/louky" />} />`
 * Use the same string for `basePath` (leading slash, no trailing slash).
 */
export default function Louky({ basePath = '/louky' }: LoukyProps) {
  const base = (basePath.startsWith('/') ? basePath : `/${basePath}`).replace(/\/$/, '')

  return (
    <Routes>
      <Route path={base} element={<Layout basePath={base} />}>
        <Route index element={<Navigate to="hub" replace />} />
        <Route path="hub" element={<HubScreen />} />
        <Route path="drill" element={<DrillScreen />} />
        <Route path="builder" element={<BuilderScreen />} />
      </Route>
    </Routes>
  )
}
