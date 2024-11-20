import { useEffect, useState } from 'react'
import { dreamStore, stepsStore } from '@/features/manage-home'
import { useStore } from '@nanostores/react'
import { lifeStore } from '@/features/manage-home/model/dream.store.ts'
import { useNavigate } from 'react-router-dom'
import { cn } from '@/shared/lib/tailwind.ts'
import { AnimatedSheet } from '@/features/manage-home/ui/animated-sheet.tsx'
import { Textarea } from '@/shared/ui-shad-cn/ui/textarea.tsx'
import { MAX_INPUT_VALUE } from '@/shared/config/constants/max-values.constant.tsx'
import { Button } from '@/shared/ui-shad-cn/ui/button.tsx'
import { useMutation } from '@tanstack/react-query'

const LifeDescription = () => {
  const dreamValue = useStore(dreamStore)
  const lifeValue = useStore(lifeStore)
  const stepsValue = useStore(stepsStore)
  const [isExpandedLife, setIsExpandedLife] = useState(false)
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false)

  const { mutate: sendDream } = useMutation({
    mutationFn: async () => {
      await fetch(
        'https://01112401.external.orders.typereturn.space/api/dream/send',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            dreamDescription: dreamValue,
            lifeDescription: lifeValue,
            telegram_user_id: 1347606553,
          }),
        }
      ).then(async (resp) => {
        const response = await resp.json()
        navigate(`/dream/${response.id}`)
      })
    },
    onError: (err) => {
      console.error('Ошибка:', err)
    },
  })

  const prevStep = () => {
    const userConfirmed = window.confirm(
      'Вы уверены, что хотите отменить толкование?'
    )

    if (userConfirmed) {
      stepsStore.set(stepsValue - 1)
      setIsExpandedLife(false)
      navigate('/')
    }
  }

  useEffect(() => {
    if (stepsValue !== 1) {
      navigate('/')
    }
  }, [])

  const handleSendDream = () => {
    sendDream()
    setIsLoading(true)
  }

  if (isLoading) {
    return (
      <div className={'flex flex-col'}>
        <div className={'my-6 mt-16 text-center'}>
          <div className={'relative'}>
            <div
              className={
                'relative min-h-[100px] rounded-b-md rounded-t-3xl bg-white px-4 pb-1 pt-4 text-left shadow-lg'
              }
            >
              <p className="scan !bg-black font-['Roslindale-medium'] text-xl">
                {dreamValue}
              </p>
              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-10 rounded-b-md bg-gradient-to-t from-white to-transparent"></div>
            </div>
            <div
              className={
                'absolute -right-2 -top-2 -z-10 h-full w-full rounded-b-md rounded-t-3xl bg-muted-light-2 shadow-lg'
              }
            ></div>
          </div>
        </div>
        <h1 className={'text-center text-lg font-semibold'}>Анализируем...</h1>
      </div>
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
            'inset-0 z-10 flex items-center justify-center rounded-3xl bg-white p-4',
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
                "h-full resize-none px-4 font-['Roslindale-medium'] text-xl font-bold"
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
        <Button onClick={handleSendDream}>Узнать значение сна</Button>
        <Button variant={'ghost'} onClick={prevStep}>
          Отмена
        </Button>
      </div>
    </>
  )
}

export default LifeDescription
