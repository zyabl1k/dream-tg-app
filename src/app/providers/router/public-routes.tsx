import type { RouteObject } from 'react-router-dom'
import { ROUTER_PATHS } from '@/shared/config/routes'
import { HomePage } from '@/pages/home'
import { DreamPage } from '@/pages/dream/dream.tsx'

const { NOT_FOUND, HOME, DREAM } = ROUTER_PATHS

export const publicRoutes: RouteObject[] = [
  {
    element: <HomePage />,
    path: HOME,
  },
  {
    element: <DreamPage />,
    path: DREAM,
  },
  {
    element: <div>Not found</div>,
    path: NOT_FOUND,
  },
]
