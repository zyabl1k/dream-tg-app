import { FunctionComponent } from 'react'
import { cn } from '@/shared/lib/tailwind.ts'
import { Textarea } from '@/shared/ui-shad-cn/ui/textarea.tsx'
import { motion } from 'framer-motion'
import { lifeStore } from '@/features/manage-home/model/dream.store.ts'

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
        <p className="rotate-y-180 max-h-[345px] overflow-x-hidden text-ellipsis break-words font-['Roslindale-medium'] text-xl font-bold text-muted-light">
          {!!lifeValue
            ? lifeValue
            : 'Опишите, что сейчас происходит в вашей жизни — если считаете, что это может быть важно при толковании сна'}
        </p>
      ) : (
        <Textarea
          value={lifeValue}
          onChange={(e) => lifeStore.set(e.target.value)}
          placeholder="Опишите, что сейчас происходит в вашей жизни — если считаете, что это может быть важно при толковании сна"
          className="rotate-y-180 h-screen resize-none font-['Roslindale-medium'] text-xl font-bold"
          minLength={4}
        />
      )}
    </motion.div>
  )
}
