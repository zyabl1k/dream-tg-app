import { FunctionComponent } from 'react'
import { cn } from '@/shared/lib/tailwind.ts'
import { Textarea } from '@/shared/ui-shad-cn/ui/textarea.tsx'
import { motion } from 'framer-motion'
import { lifeStore } from '@/features/manage-home/model/dream.store.ts'
import { MAX_INPUT_VALUE } from '@/shared/config/constants/max-values.constant.tsx'

interface LifeContentProps {
  isExpanded: boolean
  lifeValue: string
}

export const LifeContent: FunctionComponent<LifeContentProps> = ({
  isExpanded,
  lifeValue,
}) => {
  return (
    <motion.div
      className={cn('rounded-3xl p-[24px]', isExpanded ? 'bg-white' : '')}
    >
      {!isExpanded ? (
        <p className="rotate-y-180 font-roslindale-medium max-h-[345px] overflow-hidden overflow-x-hidden text-ellipsis break-words text-[20px] text-muted-light">
          {!!lifeValue
            ? lifeValue
            : 'Опишите, что сейчас происходит в вашей жизни — если считаете, что это может быть важно при толковании сна'}
        </p>
      ) : (
        <Textarea
          value={lifeValue}
          onChange={(e) => lifeStore.set(e.target.value)}
          placeholder="Опишите, что сейчас происходит в вашей жизни — если считаете, что это может быть важно при толковании сна"
          className="rotate-y-180 font-roslindale-medium h-screen resize-none text-[20px]"
          minLength={4}
          maxLength={MAX_INPUT_VALUE}
        />
      )}
    </motion.div>
  )
}
