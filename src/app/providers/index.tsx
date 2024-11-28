import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Router } from './router'
import { TelegramProvider } from '@/shared/lib/context/telegram.provider.tsx'
import { PositionProvider } from '@/shared/lib/context/use-position.provider.tsx'

const queryClient = new QueryClient()

export const Providers = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <TelegramProvider>
        <PositionProvider>
          <Router />
        </PositionProvider>
      </TelegramProvider>
    </QueryClientProvider>
  )
}
