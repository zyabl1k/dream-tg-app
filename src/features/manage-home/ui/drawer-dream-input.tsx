import { useStore } from '@nanostores/react'
import { dreamStore, stepsStore } from '../model/dream.store.ts'
import { cn } from '@/shared/lib/tailwind.ts'
import { useState } from 'react'
import { AnimatedSheet } from './animated-sheet.tsx'
import { MAX_INPUT_VALUE } from '@/shared/config/constants/max-values.constant.tsx'
import { Textarea } from '@/shared/ui-shad-cn/ui/textarea.tsx'
import { Button } from '@/shared/ui-shad-cn/ui/button.tsx'
import { useNavigate } from 'react-router-dom'

export const DrawerDreamInput = () => {
  const dreamValue = useStore(dreamStore)
  const stepsValue = useStore(stepsStore)
  const [isExpandedDream, setIsExpandedDream] = useState(false)
  const navigate = useNavigate()

  const nextStep = () => {
    setIsExpandedDream(false)
    stepsStore.set(stepsValue + 1)

    setTimeout(() => navigate('/life'), 500)
  }

  return (
    <>
      {isExpandedDream && (
        <div
          className={cn(
            'absolute inset-0 h-screen w-screen bg-black transition-opacity duration-[300ms]',
            isExpandedDream
              ? 'pointer-events-auto opacity-50'
              : 'pointer-events-none opacity-0'
          )}
          onClick={() => setIsExpandedDream(false)}
        ></div>
      )}
      <div
        className={cn(
          'relative h-96 cursor-pointer rounded-3xl bg-white text-start transition-all duration-[1.2s]',
          stepsValue === 1 ? '' : '',
          !isExpandedDream && 'animate-kick'
        )}
      >
        <div
          className={cn(
            'absolute inset-0 z-10 flex items-start justify-start rounded-3xl bg-paper bg-origin-content p-4',
            stepsValue === 1 && 'hidden'
          )}
          onClick={() => setIsExpandedDream(true)}
        >
          <p className="max-h-[345px] overflow-x-hidden text-ellipsis break-words font-['Roslindale-medium'] text-xl font-bold text-muted-light">
            {!!dreamValue ? dreamValue : 'Опишите свой сон...'}
          </p>
          {!!dreamValue && (
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 rounded-b-3xl bg-gradient-to-t from-white to-transparent"></div>
          )}
        </div>
        <AnimatedSheet top={'top-[-130px]'} isExpanded={isExpandedDream}>
          <div className={'relative h-[92%]'}>
            <Textarea
              maxLength={MAX_INPUT_VALUE}
              value={dreamValue}
              onChange={(e) => dreamStore.set(e.target.value)}
              placeholder={'Опишите свой сон...'}
              className={
                "h-full resize-none font-['Roslindale-medium'] text-xl font-bold"
              }
              minLength={4}
            />
            <div
              className={cn(
                'absolute bottom-0 right-4 flex w-[89%] items-center justify-between transition-opacity duration-[500ms]',
                isExpandedDream ? 'opacity-100' : 'opacity-0'
              )}
            >
              <p className={'text-xs text-muted'}>
                Количество слов: {dreamValue.length}/200
              </p>
              <Button disabled={!dreamValue.length} onClick={nextStep}>
                Дальше
              </Button>
            </div>
          </div>
        </AnimatedSheet>
      </div>
    </>
  )
}
