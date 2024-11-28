import axios from 'axios'
import { __APPLICATION__ } from '@/shared/config'

export const $api = axios.create({
  baseURL: `${__APPLICATION__.baseApiUrl}/api/`,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
})
