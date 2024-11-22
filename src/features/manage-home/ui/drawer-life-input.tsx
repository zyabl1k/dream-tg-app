import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { useStore } from '@nanostores/react'
import { dreamStore, lifeStore, stepsStore } from '../model/dream.store.ts'
import { cn } from '@/shared/lib/tailwind.ts'
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
  const [isFlipped, setIsFlipped] = useState(false) // Состояние для переворота карточки
  const navigate = useNavigate()
  const { user } = useTelegram()

  const handleCloseModal = () => {
    setIsExpanded(false)
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
        document.body.style.overflow = ''
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
    // Переворот карточки при первом рендере
    setIsFlipped(true)
    setTimeout(() => setIsFlipped(false), 1000) // Возвращаем обратно через 1 секунду
  }, [])

  const cardFlipVariants = {
    initial: {
      rotateY: 0,
    },
    flipped: {
      rotateY: 180,
      transition: { duration: 1, ease: 'easeInOut' },
    },
  }

  const drawerVariants = {
    collapsed: {
      width: 287,
      height: 360,
      borderRadius: '1.5rem',
      top: '16vh',
      left: 'calc(50% - 143.5px)',
      transition: {
        duration: 0.5,
        ease: 'easeInOut',
      },
    },
    expanded: {
      width: '100vw',
      height: '95vh',
      top: '5vh',
      left: '-24px',
      transition: {
        duration: 0.3,
        ease: 'easeInOut',
      },
    },
  }

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
        variants={drawerVariants}
        initial="collapsed"
        animate={isExpanded ? 'expanded' : 'collapsed'}
        className={cn('absolute top-0 z-50 bg-white text-start shadow-lg')}
        onClick={() => setIsExpanded(true)}
        drag="y"
        dragConstraints={{ top: 0, bottom: 0 }}
        onDragEnd={(_, info) => {
          if (info.offset.y > 100) handleCloseModal()
        }}
      >
        <motion.div
          className="relative flex h-full w-full items-center justify-center"
          variants={cardFlipVariants}
          initial="initial"
          animate={isFlipped ? 'flipped' : 'initial'}
        >
          <div className="backface-hidden absolute h-full w-full">
            <LifeContent isExpanded={isExpanded} lifeValue={lifeValue} />
          </div>
          <div className="backface-hidden rotateY-180 absolute flex h-full w-full items-center justify-center bg-gray-200">
            <p className="max-h-[345px] overflow-x-hidden text-ellipsis break-words font-['Roslindale-medium'] text-xl font-bold text-muted-light">
              {!!dreamValue ? dreamValue : 'Опишите свой сон...'}
            </p>
          </div>
        </motion.div>
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
