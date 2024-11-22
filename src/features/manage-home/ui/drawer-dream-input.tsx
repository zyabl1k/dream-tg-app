import { useStore } from '@nanostores/react'
import { dreamStore, lifeStore, stepsStore } from '../model/dream.store.ts'
import { cn } from '@/shared/lib/tailwind.ts'
import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { useValidationCard } from '@/features/manage-home/model/use-validate-imput.ts'
import { Backdrop } from '@/features/manage-home/ui/backdrop.tsx'
import { DreamContent } from '@/features/manage-home/ui/dream-content.tsx'
import { DragPilIcon } from '@/shared/ui/icons'
import { LifeContent } from '@/features/manage-home/ui/life-contentInput.tsx'
import { Button } from '@/shared/ui-shad-cn/ui/button.tsx'
import { useMutation } from '@tanstack/react-query'
import { useTelegram } from '@/shared/lib/telegram.provider.tsx'
import { useNavigate } from 'react-router-dom'
import { Card } from '@/shared/ui/card.tsx'

export const DrawerDreamInput = () => {
  const dreamValue = useStore(dreamStore)
  const lifeValue = useStore(lifeStore)
  const stepsValue = useStore(stepsStore)
  const { isEmpty, validateDream } = useValidationCard(dreamValue)
  const [isExpandedDream, setIsExpandedDream] = useState(false)
  const [isExpandedLife, setIsExpandedLife] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const { user } = useTelegram()
  const navigate = useNavigate()

  const nextStep = () => {
    if (validateDream()) {
      handleCloseModal()
      stepsStore.set(stepsValue + 1)
    }
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

  const handleCloseModal = () => {
    setIsExpandedDream(false)
    setIsExpandedLife(false)
  }

  useEffect(() => {
    document.body.style.overflow = isExpandedDream ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [isExpandedDream])

  const variants = {
    collapsed: {
      width: 287,
      height: 360,
      borderRadius: '1.5rem',
      top: '32vh',
      left: 'calc(50% - 143.5px)',
      transition: {
        duration: 0.5,
        ease: 'easeInOut',
      },
      scale: [1, 0.6, 1],
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
      scale: [1],
    },
  }

  const prevStep = () => {
    const userConfirmed = window.confirm(
      'Вы уверены, что хотите отменить толкование?'
    )

    if (userConfirmed) {
      stepsStore.set(stepsValue - 1)
      setIsExpandedLife(false)
    }
  }

  const handleSendDream = () => {
    sendDream()
    setIsLoading(true)
  }

  const variantsButtons = {
    visible: {
      opacity: 1,
      y: 0,
    },
    invisible: {
      opacity: 0,
      y: 0,
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
      <Backdrop
        isExpanded={isExpandedDream || isExpandedLife}
        onClick={handleCloseModal}
      />
      <motion.div
        layout
        variants={variants}
        initial="collapsed"
        animate={isExpandedDream || isExpandedLife ? 'expanded' : 'collapsed'}
        className={cn(
          'absolute top-0 z-50 cursor-pointer bg-white text-start shadow-lg',
          stepsValue > 0 && '!top-[15vh]',
          isExpandedLife && '!top-[5vh]'
        )}
        onClick={() => {
          if (!isExpandedDream && stepsValue === 0) setIsExpandedDream(true)
          if (!isExpandedLife && stepsValue === 1) setIsExpandedLife(true)
        }}
        drag="y"
        dragConstraints={{ top: 0, bottom: 0 }}
        onDragEnd={(_, info) => {
          if (info.offset.y > 100) handleCloseModal()
        }}
      >
        {(isExpandedDream || isExpandedLife) && (
          <DragPilIcon className={'relative top-4 z-50 mx-auto'} />
        )}
        <div
          className={cn(
            'relative cursor-pointer text-start transition-transform duration-1000',
            stepsValue > 0 ? 'rotate-y-180' : ''
          )}
        >
          {/* Лицевая сторона */}
          <div
            className={cn(
              'absolute inset-0 z-10 rounded-xl bg-paper',
              stepsValue > 0 && 'hidden'
            )}
          >
            <DreamContent
              isExpanded={isExpandedDream}
              dreamValue={dreamValue}
              isEmpty={isEmpty}
              nextStep={nextStep}
            />
          </div>

          <div
            className={cn(
              'absolute inset-0 z-10 rounded-3xl bg-white',
              stepsValue > 0 ? 'block' : 'hidden'
            )}
          >
            <LifeContent isExpanded={isExpandedLife} lifeValue={lifeValue} />
          </div>
        </div>
      </motion.div>
      <motion.div
        className={
          'absolute bottom-4 mt-6 flex w-full flex-col items-center justify-center gap-y-2'
        }
        variants={variantsButtons}
        initial="invisible"
        animate={stepsValue === 0 ? 'invisible' : 'visible'}
        transition={{ duration: 0.5, delay: 0.5 }}
      >
        <Button onClick={handleSendDream}>Узнать значение сна</Button>
        <Button onClick={prevStep} variant={'ghost'}>
          Отмена
        </Button>
      </motion.div>
    </>
  )
}
