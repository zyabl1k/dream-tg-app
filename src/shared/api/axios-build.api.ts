import axios from 'axios'

export const $api = axios.create({
  baseURL: `${import.meta.env.VITE_PUBLIC_URL}/api/`,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
  params: {
    telegram_user_id: 1347606553,
  },
})
