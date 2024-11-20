import { useState } from 'react'
import { dreamStore, stepsStore } from '@/features/manage-home'
import { useStore } from '@nanostores/react'
import { lifeStore } from '@/features/manage-home/model/dream.store.ts'
import { useNavigate } from 'react-router-dom'
import { cn } from '@/shared/lib/tailwind.ts'
import { AnimatedSheet } from '@/features/manage-home/ui/animated-sheet.tsx'
import { Textarea } from '@/shared/ui-shad-cn/ui/textarea.tsx'
import { MAX_INPUT_VALUE } from '@/shared/config/constants/max-values.constant.tsx'
import { Button } from '@/shared/ui-shad-cn/ui/button.tsx'
import { sendDream } from '@/entities'

export const LifeDescription = () => {
  const dreamValue = useStore(dreamStore)
  const lifeValue = useStore(lifeStore)
  const stepsValue = useStore(stepsStore)
  const [isExpandedLife, setIsExpandedLife] = useState(false)
  const navigate = useNavigate()

  const prevStep = () => {
    stepsStore.set(stepsValue - 1)
    setIsExpandedLife(false)
    navigate('/')
  }

  const nextStep = () => {
    stepsStore.set(stepsValue + 1)
    setIsExpandedLife(false)
  }

  if (stepsValue !== 1) return navigate('/')

  const handleSend = async () => {
    await sendDream(dreamValue, lifeValue).then((resp) =>
      navigate(`/dream/${resp.id}`)
    )
  }

  return (
    <>
      {isExpandedLife && (
        <div
          className={cn(
            'rotate-y-[360deg] absolute inset-0 h-screen w-screen bg-black transition-opacity duration-[300ms]',
            isExpandedLife
              ? 'pointer-events-auto opacity-50'
              : 'pointer-events-none opacity-0'
          )}
          onClick={() => setIsExpandedLife(false)}
        ></div>
      )}
      <div
        className={cn(
          'relative top-[95px] h-96 cursor-pointer rounded-3xl bg-white text-start transition-all duration-[1.2s]',
          stepsValue === 1 ? '' : '',
          !isExpandedLife && 'animate-kick'
        )}
      >
        <div
          className={cn(
            'absolute inset-0 z-10 flex items-center justify-center rounded-3xl bg-white bg-paper p-4',
            stepsValue === 1 ? 'block' : 'hidden'
          )}
          onClick={() => setIsExpandedLife(true)}
        >
          <p className="font-['Roslindale-medium'] text-xl font-bold text-muted-light">
            {!!lifeValue
              ? lifeValue
              : 'Опишите, что сейчас происходит в вашей жизни — если считаете, что это может быть важно при толковании сна'}
          </p>
        </div>
        <AnimatedSheet isExpanded={isExpandedLife}>
          <div className={'relative h-[92%]'}>
            <Textarea
              maxLength={MAX_INPUT_VALUE}
              value={lifeValue}
              onChange={(e) => lifeStore.set(e.target.value)}
              placeholder={
                'Опишите, что сейчас происходит в вашей жизни — если считаете, что это может быть важно при толковании сна'
              }
              className={
                "h-full resize-none font-['Roslindale-medium'] text-xl font-bold"
              }
              minLength={4}
            />
          </div>
        </AnimatedSheet>
      </div>
      <div
        className={
          'mt-[7.5rem] flex w-full flex-col items-center justify-center gap-y-2'
        }
      >
        <Button onClick={handleSend}>Узнать значение сна</Button>
        <Button variant={'ghost'} onClick={prevStep}>
          Отмена
        </Button>
      </div>
    </>
  )
}
