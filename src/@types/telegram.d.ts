export interface ITelegramUser {
  id: number
  first_name: string
  last_name: string
  username: string
  language_code: string
}

export interface IWebApp {
  expand: () => void
  disableVerticalSwipes: () => void
  setHeaderColor: (color: string) => void
  initDataUnsafe: {
    query_id: string
    user: ITelegramUser
    auth_date: string
    hash: string
  }
}
