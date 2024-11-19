import { useState } from 'react'
import { stepsStore } from '@/features/manage-home'
import { useStore } from '@nanostores/react'
import { lifeStore } from '@/features/manage-home/model/dream.store.ts'
import { useNavigate } from 'react-router-dom'

export const LifeDescription = () => {
  const lifeValue = useStore(lifeStore)
  const stepsValue = useStore(stepsStore)
  const [isExpandedLife, setIsExpandedLife] = useState(false)
  const navigate = useNavigate()

  const prevStep = () => {
    stepsStore.set(stepsValue - 1)
    setIsExpandedLife(false)
    navigate('/')
  }

  return <></>
}
