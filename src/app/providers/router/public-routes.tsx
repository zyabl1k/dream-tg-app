import type { RouteObject } from 'react-router-dom'
import { ROUTER_PATHS } from '@/shared/config/routes'
import { HomePage } from '@/pages/home'
import { LifeDescription } from '@/pages/life-description/life-description.tsx'

const { NOT_FOUND, HOME, LIFE } = ROUTER_PATHS

export const publicRoutes: RouteObject[] = [
  {
    element: <HomePage />,
    path: HOME,
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
