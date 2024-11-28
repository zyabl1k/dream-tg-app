import { FunctionComponent } from 'react'
import { cn } from '@/shared/lib/tailwind.ts'
import { dreamStore } from '@/features/manage-home'
import { Textarea } from '@/shared/ui-shad-cn/ui/textarea.tsx'
import { motion } from 'framer-motion'
import { DrawerFooter } from '@/features/manage-home/ui/drawer-footer.tsx'

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
        'flex h-full flex-col justify-between p-6',
        isExpanded ? 'pt-10' : 'rounded-b-4xl overflow-hidden bg-paper'
      )}
    >
      {!isExpanded ? (
        <p className="max-h-[345px] overflow-hidden overflow-x-hidden text-ellipsis break-words font-roslindale-medium text-xl text-muted-light">
          <span className={'flashing-text text-[#007AFF]'}>|</span>
          {!!dreamValue ? dreamValue : 'Опишите свой сон...'}
        </p>
      ) : (
        <>
          <Textarea
            value={dreamValue}
            onChange={(e) => dreamStore.set(e.target.value)}
            placeholder="Опишите свой сон..."
            className="no-scrollbar h-screen resize-none font-roslindale-medium text-xl"
            minLength={4}
            autoFocus={isExpanded}
          />
          <DrawerFooter
            contentLength={dreamValue.length}
            nextStep={nextStep}
            isExpanded={isExpanded}
            isEmpty={isEmpty}
          />
        </>
      )}
    </motion.div>
  )
}
