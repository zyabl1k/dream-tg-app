import { motion } from 'framer-motion'
import { CharacterCounter } from '@/features/manage-home/ui/character-counter.tsx'
import { __APPLICATION__ } from '@/shared/config'
import { Button } from '@/shared/ui-shad-cn/ui/button.tsx'
import { cn } from '@/shared/lib/tailwind.ts'
import { FunctionComponent, useEffect, useState } from 'react'
import { EditIcon } from '@/shared/ui/icons'
import { useStore } from '@nanostores/react'
import { stepsStore } from '@/features/manage-home'

interface DrawerFooterContentProps {
  isEmpty?: boolean
  contentLength: number
  nextStep: () => void
}

export const DrawerFooter: FunctionComponent<DrawerFooterContentProps> = ({
  isEmpty,
  contentLength,
  nextStep,
}) => {
  const stepsValue = useStore(stepsStore)
  const [isKeyboardVisible, setIsKeyboardVisible] = useState(false)

  useEffect(() => {
    const handleResize = () => {
      requestAnimationFrame(() => {
        const viewportHeight = window.visualViewport
          ? window.visualViewport.height
          : window.innerHeight
        const isKeyboardNowVisible = viewportHeight < window.innerHeight * 0.85
        setIsKeyboardVisible(isKeyboardNowVisible)
      })
    }

    window.addEventListener('resize', handleResize)
    if (window.visualViewport) {
      window.visualViewport.addEventListener('resize', handleResize)
    }

    handleResize()

    return () => {
      window.removeEventListener('resize', handleResize)
      if (window.visualViewport) {
        window.visualViewport.removeEventListener('resize', handleResize)
      }
    }
  }, [])

  const KeyboardUp = {
    open: {
      y: -330,
    },
    close: {
      y: 0,
    },
  }

  return (
    <motion.div
      className={cn(
        'flex min-h-12 w-full items-center justify-between',
        stepsValue > 0 && '!rotate-y-180'
      )}
      variants={KeyboardUp}
      initial="close"
      animate={isKeyboardVisible ? 'open' : 'close'}
      transition={{ duration: 0.2, ease: 'easeInOut' }}
    >
      {isEmpty ? (
        <div className="flex items-center justify-between gap-3 rounded-xl bg-[#383838D9] px-3.5 py-2.5">
          <EditIcon className={'size-7'} />
          <p className="text-xs font-semibold text-white">
            Нам нужно хотя бы несколько слов о вашем сне, чтобы сделать
            толкование
          </p>
        </div>
      ) : (
        <>
          <CharacterCounter
            currentLength={contentLength}
            maxLength={__APPLICATION__.maxInputValues}
          />
          <Button
            className={cn('px-[18px]')}
            disabled={contentLength > __APPLICATION__.maxInputValues}
            onClick={nextStep}
          >
            Дальше
          </Button>
        </>
      )}
    </motion.div>
  )
}
