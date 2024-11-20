import type { RouteObject } from 'react-router-dom'
import { ROUTER_PATHS } from '@/shared/config/routes'
import { HomePage } from '@/pages/home'
import LifeDescription from '@/pages/life-description/life-description.tsx'
import { DreamPage } from '@/pages/dream/dream.tsx'

const { NOT_FOUND, HOME, LIFE, DREAM } = ROUTER_PATHS

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
    element: <LifeDescription />,
    path: LIFE,
  },
  {
    element: <div>Not found</div>,
    path: NOT_FOUND,
  },
]
