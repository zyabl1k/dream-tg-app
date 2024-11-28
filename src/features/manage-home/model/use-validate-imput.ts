import { useState } from 'react'
import { dreamStore } from '@/features/manage-home'

export const useValidationCard = () => {
  const [isEmpty, setIsEmpty] = useState(false)
  const validateDream = () => {
    if (!dreamStore.value.length) {
      setIsEmpty(true)
      setTimeout(() => setIsEmpty(false), 2000)
    }
    return dreamStore.value.length > 0
  }
  return { isEmpty, validateDream }
}
