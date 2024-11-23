import { StrictMode, Suspense } from 'react'
import { createRoot } from 'react-dom/client'
import { Providers } from './providers'
import './css/global.css'
import './css/animation.css'
// import '@fontsource/inter/400.css'
// import '@fontsource/inter/500.css'
// import '@fontsource/inter/600.css'
// import '@fontsource/inter/700.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Suspense>
      <Providers />
    </Suspense>
  </StrictMode>
)
