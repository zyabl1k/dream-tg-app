export const __APPLICATION__: __APPLICATION_CONFIG__ = {
  baseApiUrl: import.meta.env.VITE_PUBLIC_URL,
  maxInputValues: 160,
  specialPaths: ['dream'],
  routes: {
    HOME: '/',
    DREAM: '/dream/:id',
    NOT_FOUND: '*',
  },
}
