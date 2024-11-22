import { useStore } from '@nanostores/react'
import { dreamStore, lifeStore, stepsStore } from '../model/dream.store.ts'
import { cn } from '@/shared/lib/tailwind.ts'
import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { Backdrop } from '@/features/manage-home/ui/backdrop.tsx'
import { LifeContent } from '@/features/manage-home/ui/life-contentInput.tsx'
import { Button } from '@/shared/ui-shad-cn/ui/button.tsx'
import { useMutation } from '@tanstack/react-query'
import { useTelegram } from '@/shared/lib/telegram.provider.tsx'
import { useNavigate } from 'react-router-dom'
import { Card } from '@/shared/ui/card.tsx'

export const DrawerLifeInput = () => {
  const dreamValue = useStore(dreamStore)
  const lifeValue = useStore(lifeStore)
  const stepsValue = useStore(stepsStore)
  const [isExpanded, setIsExpanded] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const animateBlock = useRef(null)
  const { user } = useTelegram()
  const navigate = useNavigate()

  const handleCloseModal = () => {
    setIsExpanded(false)

    //   if (animateBlock.current) {
    //   // animateBlock.current.classList.add('animate-kick')
    //   setIsExpanded(false)
    //   // setTimeout(
    //   //   () => animateBlock.current.classList.remove('animate-kick'),
    //   //   500
    //   // )
    // }
  }

  const { mutate: sendDream } = useMutation({
    mutationFn: async () => {
      await fetch(
        'https://01112401.customerserver.orders.typereturn.space/api/dream/send',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            dreamDescription: dreamValue,
            lifeDescription: lifeValue,
            telegram_user_id: user?.id || 1347606553,
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
      setIsExpanded(false)
    }
  }

  const handleSendDream = () => {
    sendDream()
    setIsLoading(true)
  }

  useEffect(() => {
    document.body.style.overflow = 'hidden'
  }, [])

  if (isLoading) {
    return (
      <motion.div className={'flex flex-col'}>
        <div className={'my-6 mt-16'}>
          <Card textClassName={'scan !bg-black'} description={dreamValue} />
        </div>
        <h1 className={'text-center text-lg font-semibold'}>
          Анализируем сон...
        </h1>
      </motion.div>
    )
  }

  return (
    <>
      <Backdrop isExpanded={isExpanded} onClick={handleCloseModal} />
      <motion.div
        layout
        ref={animateBlock}
        transition={{
          duration: 0.7,
          ease: 'easeInOut',
        }}
        className={cn(
          '-left-[24px] top-[5vh] z-50 mx-auto cursor-pointer rounded-3xl bg-white text-start transition-all',
          isExpanded ? 'absolute h-[95vh] w-screen' : 'h-[360px] w-[287px]'
        )}
        onClick={() => setIsExpanded(true)}
      >
        <LifeContent isExpanded={isExpanded} lifeValue={lifeValue} />
      </motion.div>
      <div
        className={
          'mt-6 flex w-full flex-col items-center justify-center gap-y-2'
        }
      >
        <Button onClick={handleSendDream}>Узнать значение сна</Button>
        <Button onClick={prevStep} variant={'ghost'}>
          Отмена
        </Button>
      </div>
    </>
  )
}
