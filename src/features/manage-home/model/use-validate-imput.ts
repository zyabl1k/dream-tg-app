import { useState } from 'react'

export const useValidationCard = (value: string) => {
  const [isEmpty, setIsEmpty] = useState(false)
  const validateDream = () => {
    if (!value.length) {
      setIsEmpty(true)
      setTimeout(() => setIsEmpty(false), 2000)
    }
    return value.length > 0
  }
  return { isEmpty, validateDream }
}
