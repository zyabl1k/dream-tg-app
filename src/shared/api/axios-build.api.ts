import axios from 'axios'

const $api = axios.create({
  baseURL: `${import.meta.env.STRAPI_API_URL}/api/`,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
  params: { pLevel: 5 },
})
