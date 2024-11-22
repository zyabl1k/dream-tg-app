import { TelegramProvider } from '@/shared/lib/telegram.provider.tsx'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Router } from './router'
import { CardPositionProvider } from '@/shared/lib/use-position.provider.tsx'

const queryClient = new QueryClient()

export const Providers = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <TelegramProvider>
        <CardPositionProvider>
          <Router />
        </CardPositionProvider>
      </TelegramProvider>
    </QueryClientProvider>
  )
}
