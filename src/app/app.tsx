import { StrictMode, Suspense } from 'react'
import { createRoot } from 'react-dom/client'
import { Providers } from './providers'
import './css/global.css'
import './css/animation.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Suspense>
      <Providers />
    </Suspense>
  </StrictMode>
)
