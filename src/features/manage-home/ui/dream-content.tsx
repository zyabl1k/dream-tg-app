import { useEffect, useState } from 'react'
import { FunctionComponent } from 'react'
import { cn } from '@/shared/lib/tailwind.ts'
import { dreamStore } from '@/features/manage-home'
import { Textarea } from '@/shared/ui-shad-cn/ui/textarea.tsx'
import { motion } from 'framer-motion'
import { MAX_INPUT_VALUE } from '@/shared/config/constants/max-values.constant.tsx'
import { Button } from '@/shared/ui-shad-cn/ui/button.tsx'
import { CharacterCounter } from '@/features/manage-home/ui/character-counter.tsx'

interface DreamContentProps {
  isExpanded: boolean
  dreamValue: string
  isEmpty: boolean
  nextStep: () => void
}

export const DreamContent: FunctionComponent<DreamContentProps> = ({
  isExpanded,
  dreamValue,
  isEmpty,
  nextStep,
}) => {
  const [isKeyboardVisible, setIsKeyboardVisible] = useState(false)

  useEffect(() => {
    const handleResize = () => {
      const viewportHeight = window.visualViewport
        ? window.visualViewport.height
        : window.innerHeight
      const isKeyboardNowVisible = viewportHeight < window.innerHeight * 0.85 // Проверка на уменьшение высоты
      setIsKeyboardVisible(isKeyboardNowVisible)
    }

    window.addEventListener('resize', handleResize)
    if (window.visualViewport) {
      window.visualViewport.addEventListener('resize', handleResize)
    }

    return () => {
      window.removeEventListener('resize', handleResize)
      if (window.visualViewport) {
        window.visualViewport.removeEventListener('resize', handleResize)
      }
    }
  }, [])

  return (
    <motion.div
      layout
      className={cn(
        'flex h-full flex-col justify-between p-[24px]',
        isExpanded ? '' : 'overflow-hidden'
      )}
    >
      {!isExpanded ? (
        <p className="max-h-[345px] overflow-hidden overflow-x-hidden text-ellipsis break-words font-['Roslindale-medium'] text-xl font-bold text-muted-light">
          {!!dreamValue ? dreamValue : 'Опишите свой сон...'}
        </p>
      ) : (
        <>
          <Textarea
            value={dreamValue}
            onChange={(e) => dreamStore.set(e.target.value)}
            placeholder="Опишите свой сон..."
            className="no-scrollbar h-[50vh] resize-none font-['Roslindale-medium'] text-xl font-bold"
            minLength={4}
          />

          <FooterContent
            isEmpty={isEmpty}
            dreamValue={dreamValue}
            nextStep={nextStep}
            isExpanded={isExpanded}
            isKeyboardVisible={isKeyboardVisible}
          />
        </>
      )}
    </motion.div>
  )
}

interface FooterContentProps {
  isEmpty: boolean
  dreamValue: string
  nextStep: () => void
  isExpanded: boolean
  isKeyboardVisible: boolean
}

const FooterContent: FunctionComponent<FooterContentProps> = ({
  isEmpty,
  dreamValue,
  nextStep,
  isExpanded,
  isKeyboardVisible,
}) => {
  const variants = {
    hidden: {
      translateY: '20%',
      opacity: 0,
      transition: { duration: 0.2, ease: 'easeInOut' },
    },
    visible: {
      translateY: isKeyboardVisible ? '-700%' : '0%',
      opacity: 1,
      transition: { duration: 0.5, ease: 'easeInOut' },
    },
  }

  return (
    <motion.div
      className={
        'grid min-h-[48px] w-full grid-cols-4 items-center justify-between'
      }
      variants={variants}
      initial="hidden"
      animate={isExpanded ? 'visible' : 'hidden'}
    >
      {isEmpty ? (
        <div className="col-span-4 flex items-center justify-between gap-4 rounded-xl bg-[#383838D9] p-2">
          <img src="/img/edit_28.png" alt="edit" />
          <p className="text-xs text-white">
            Нам нужно хотя бы несколько слов о вашем сне, чтобы сделать
            толкование
          </p>
        </div>
      ) : (
        <>
          <CharacterCounter
            currentLength={dreamValue.length}
            maxLength={MAX_INPUT_VALUE}
          />
          <Button
            className={cn(
              'col-span-1 col-start-4',
              !dreamValue.length && 'opacity-50 hover:opacity-50'
            )}
            disabled={dreamValue.length > MAX_INPUT_VALUE}
            onClick={nextStep}
          >
            Дальше
          </Button>
        </>
      )}
    </motion.div>
  )
}
