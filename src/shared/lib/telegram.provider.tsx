import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react'
import { ITelegramUser, IWebApp } from '@/@types/telegram'

interface ITelegramContext {
  webApp?: IWebApp
  user?: ITelegramUser
  unsafeData?: {
    query_id: string
    user: ITelegramUser
    auth_date: string
    hash: string
  }
}

export const TelegramContext = createContext<ITelegramContext>({})

export const TelegramProvider = ({ children }: { children: ReactNode }) => {
  const [webApp, setWebApp] = useState<IWebApp | null>(null)

  useEffect(() => {
    const loadScript = () => {
      const script = document.createElement('script')
      script.src = 'https://telegram.org/js/telegram-web-app.js'
      script.async = true
      script.onload = () => {
        const app = (window as any).Telegram?.WebApp
        if (app) {
          app.ready()
          setWebApp(app)
          app.expand()
          app.disableVerticalSwipes()
        }
      }
      document.body.appendChild(script)

      return () => {
        document.body.removeChild(script)
      }
    }

    loadScript()
  }, [])

  const value = useMemo(() => {
    return webApp
      ? {
          webApp,
          unsafeData: webApp.initDataUnsafe,
          user: webApp.initDataUnsafe.user,
        }
      : {}
  }, [webApp])

  return (
    <TelegramContext.Provider value={value}>
      {children}
    </TelegramContext.Provider>
  )
}

export const useTelegram = () => useContext(TelegramContext)
