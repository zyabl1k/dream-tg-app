import { TelegramProvider } from '@/shared/lib/telegram.provider.tsx'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Router } from './router'

const queryClient = new QueryClient()

export const Providers = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <TelegramProvider>
        <Router />
      </TelegramProvider>
    </QueryClientProvider>
  )
}
