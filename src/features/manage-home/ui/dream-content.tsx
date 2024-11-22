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
  return (
    <motion.div
      layout
      className={cn(
        'h-full rounded-3xl p-[24px]',
        isExpanded ? 'bg-white' : 'overflow-hidden bg-paper'
      )}
    >
      {!isExpanded ? (
        <p className="max-h-[345px] overflow-x-hidden text-ellipsis break-words font-['Roslindale-medium'] text-xl font-bold text-muted-light">
          {!!dreamValue ? dreamValue : 'Опишите свой сон...'}
        </p>
      ) : (
        <>
          <Textarea
            value={dreamValue}
            onChange={(e) => dreamStore.set(e.target.value)}
            placeholder="Опишите свой сон..."
            className="h-full resize-none font-['Roslindale-medium'] text-xl font-bold"
            minLength={4}
          />
          <FooterContent
            isEmpty={isEmpty}
            dreamValue={dreamValue}
            nextStep={nextStep}
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
}

const FooterContent: FunctionComponent<FooterContentProps> = ({
  isEmpty,
  dreamValue,
  nextStep,
}) => {
  return (
    <div
      className={
        'fixed bottom-4 right-0 grid w-full grid-cols-4 items-center justify-between px-4 transition-opacity duration-[500ms]'
      }
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
    </div>
  )
}
