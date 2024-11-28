import { FunctionComponent } from 'react'
import { cn } from '@/shared/lib/tailwind.ts'
import { Textarea } from '@/shared/ui-shad-cn/ui/textarea.tsx'
import { motion } from 'framer-motion'
import { lifeStore } from '@/features/manage-home/model/dream.store.ts'
import { DrawerFooter } from '@/features/manage-home/ui/drawer-footer.tsx'

interface LifeContentProps {
  isExpanded: boolean
  lifeValue: string
  nextStep: () => void
}

export const LifeContent: FunctionComponent<LifeContentProps> = ({
  isExpanded,
  lifeValue,
  nextStep,
}) => {
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
          />
          <DrawerFooter
            contentLength={lifeValue.length}
            nextStep={nextStep}
            isExpanded={isExpanded}
          />
        </>
      )}
    </motion.div>
  )
}
