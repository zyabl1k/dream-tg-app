import {
  RouterProvider,
  createBrowserRouter,
  createMemoryRouter,
} from 'react-router-dom'
import { RootLayout } from '@/app/layouts/root.layout.tsx'
import { publicRoutes } from './public-routes'

export const router: ReturnType<typeof createMemoryRouter> =
  createBrowserRouter(
    [
      {
        children: [...publicRoutes],
        element: <RootLayout />,
      },
    ],
    {
      future: {
        v7_skipActionErrorRevalidation: true,
        v7_partialHydration: true,
        v7_startTransition: true,
        v7_relativeSplatPath: true,
        v7_fetcherPersist: true,
        v7_normalizeFormMethod: true,
      },
    }
  )

export const Router = () => {
  return <RouterProvider router={router} />
}
