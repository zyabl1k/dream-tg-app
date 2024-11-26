import { FunctionComponent, useEffect, useState } from 'react'
import { cn } from '@/shared/lib/tailwind.ts'
import { Textarea } from '@/shared/ui-shad-cn/ui/textarea.tsx'
import { motion } from 'framer-motion'
import { lifeStore } from '@/features/manage-home/model/dream.store.ts'
import { MAX_INPUT_VALUE } from '@/shared/config/constants/max-values.constant.tsx'
import { CharacterCounter } from '@/features/manage-home/ui/character-counter.tsx'
import { Button } from '@/shared/ui-shad-cn/ui/button.tsx'

interface LifeContentProps {
  isExpanded: boolean
  lifeValue: string
  isEmpty: boolean
  nextStep: () => void
}

export const LifeContent: FunctionComponent<LifeContentProps> = ({
  isExpanded,
  lifeValue,
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
      className={cn(
        'flex h-full flex-col justify-between p-[24px]',
        isExpanded ? '' : 'overflow-hidden'
      )}
    >
      {!isExpanded ? (
        <p className="rotate-y-180 max-h-[345px] overflow-hidden overflow-x-hidden text-ellipsis break-words font-roslindale-medium text-[20px] text-muted-light">
          <span className={'flashing-text text-[#007AFF]'}>|</span>
          {!!lifeValue
            ? lifeValue
            : 'Опишите, что сейчас происходит в вашей жизни — если считаете, что это может быть важно при толковании сна'}
        </p>
      ) : (
        <>
          <Textarea
            value={lifeValue}
            onChange={(e) => lifeStore.set(e.target.value)}
            placeholder="Опишите, что сейчас происходит в вашей жизни — если считаете, что это может быть важно при толковании сна"
            className="rotate-y-180 h-screen resize-none font-roslindale-medium text-[20px]"
            minLength={4}
            maxLength={MAX_INPUT_VALUE}
          />
          <FooterContent
            lifeValue={lifeValue}
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
  lifeValue: string
  nextStep: () => void
  isExpanded: boolean
  isKeyboardVisible: boolean
}

const FooterContent: FunctionComponent<FooterContentProps> = ({
  lifeValue,
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
      <div className={'rotate-y-180 col-span-4 grid grid-cols-4 items-center'}>
        <CharacterCounter
          currentLength={lifeValue.length}
          maxLength={MAX_INPUT_VALUE}
        />
        <Button
          className={'col-span-1 col-start-4'}
          disabled={lifeValue.length > MAX_INPUT_VALUE}
          onClick={nextStep}
        >
          Дальше
        </Button>
      </div>
    </motion.div>
  )
}
