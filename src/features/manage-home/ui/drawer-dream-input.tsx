import { useStore } from '@nanostores/react'
import { dreamStore, stepsStore } from '../model/dream.store.ts'
import { cn } from '@/shared/lib/tailwind.ts'
import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { useValidationCard } from '@/features/manage-home/model/use-validate-imput.ts'
import { Backdrop } from '@/features/manage-home/ui/backdrop.tsx'
import { DreamContent } from '@/features/manage-home/ui/dream-content.tsx'

export const DrawerDreamInput = () => {
  const dreamValue = useStore(dreamStore)
  const stepsValue = useStore(stepsStore)
  const { isEmpty, validateDream } = useValidationCard(dreamValue)
  const [isExpanded, setIsExpanded] = useState(false)
  const animateBlock = useRef(null)

  const nextStep = () => {
    if (validateDream()) {
      handleCloseModal()
      setTimeout(() => stepsStore.set(stepsValue + 1), 500)
    }
  }

  const handleCloseModal = () => {
    setIsExpanded(false)
    // setTimeout(() => animateBlock.current.classList.remove('animate-kick'), 500)
  }

  useEffect(() => {
    document.body.style.overflow = isExpanded ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [isExpanded])

  return (
    <>
      <Backdrop isExpanded={isExpanded} onClick={handleCloseModal} />
      <motion.div
        layout
        ref={animateBlock}
        transition={{
          duration: 0.7,
          ease: 'easeInOut',
        }}
        className={cn(
          '-left-[24px] top-[5vh] z-50 mx-auto cursor-pointer rounded-3xl bg-white text-start transition-all',
          isExpanded ? 'absolute h-[95vh] w-screen' : 'h-[360px] w-[287px]'
        )}
        onClick={() => setIsExpanded(true)}
      >
        <DreamContent
          isExpanded={isExpanded}
          dreamValue={dreamValue}
          isEmpty={isEmpty}
          nextStep={nextStep}
        />
      </motion.div>
    </>
  )
}
