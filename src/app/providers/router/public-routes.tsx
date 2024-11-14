import type { RouteObject } from 'react-router-dom'
import { ROUTER_PATHS } from '@/shared/config/routes'
import { HomePage } from '@/pages/home'

const { NOT_FOUND, HOME } = ROUTER_PATHS

export const publicRoutes: RouteObject[] = [
  {
    element: <HomePage />,
    path: HOME,
  },
  {
    element: <div>Not found</div>,
    path: NOT_FOUND,
  },
]
