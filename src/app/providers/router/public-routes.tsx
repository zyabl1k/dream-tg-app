import type { RouteObject } from 'react-router-dom'
import { HomePage } from '@/pages/home'
import { DreamPage } from '@/pages/dream'
import { __APPLICATION__ } from '@/shared/config'

const { NOT_FOUND, HOME, DREAM } = __APPLICATION__.routes

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
