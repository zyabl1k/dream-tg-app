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
    document.body.style.overflow =
      isExpandedDream || isExpandedLife || stepsValue > 0 ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [isExpandedDream, isExpandedLife, stepsValue])

  const variants = {
    collapsed: {
      width: 287,
      height: 360,
      borderRadius: '1.5rem',
      top: '0',
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

  const analiz = {
    visible: {
      opacity: 1,
    },
    invisible: {
      opacity: 0,
    },
  }

  const blockVariants = {
    collapsed: { opacity: 1, height: '50%' },
    expanded: { opacity: 1, height: 0 },
  }

  const containerVariants = {
    collapsed: { opacity: 0 },
    expanded: { opacity: 1 },
  }

  const test = {
    collapsed: { right: 0, height: '100%' },
    expanded: { right: '-1rem', height: '110%' },
  }

  // if (isLoading) {
  //   return (
  //     <motion.div className={'flex flex-col'}>
  //       <motion.div className={'my-6 mt-16'}>
  //         <Card textClassName={'scan !bg-black'} description={dreamValue} />
  //       </motion.div>
  //       <h1 className={'text-center text-lg font-semibold'}>
  //         Анализируем сон...
  //       </h1>
  //     </motion.div>
  //   )
  // }

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
          'relative top-0 z-50 cursor-pointer bg-white text-start shadow-lg',
          stepsValue > 0 && !isExpandedLife && '!-top-[20vh]',
          (isExpandedLife || isExpandedDream) && 'absolute',
          isLoading && 'hidden'
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
            'relative h-full cursor-pointer text-start transition-transform duration-1000',
            stepsValue > 0 ? 'rotate-y-180' : '',
            !isExpandedDream && stepsValue < 1 && 'bg-paper'
          )}
        >
          {/* Лицевая сторона */}
          <div
            className={cn(
              'absolute inset-0 z-10 rounded-xl',
              stepsValue > 0 && 'hidden'
            )}
          >
            <DreamContent
              isExpanded={isExpandedDream}
              dreamValue={dreamValue}
              isEmpty={isEmpty}
              nextStep={nextStep}
            />
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 rounded-b-3xl bg-gradient-to-t from-white to-transparent"></div>
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
        className={cn(
          'relative !-top-[18vh] z-50 hidden h-[360px] w-[287px] text-start',
          isLoading && 'block'
        )}
        initial="collapsed"
        animate={isLoading ? 'expanded' : 'collapsed'}
        variants={containerVariants}
        style={{
          left: 'calc(50% - 143.5px)',
        }}
      >
        <div className="relative h-1/2 rounded-b-xl rounded-t-3xl bg-white p-4">
          <p className="scan !bg-black font-['Roslindale-medium'] text-xl">
            {dreamValue}
          </p>
          <motion.div
            variants={test}
            transition={{ duration: 1, ease: 'easeInOut', delay: 0.5 }}
            className={
              'absolute -right-4 bottom-0 -z-10 w-full rounded-b-md rounded-t-3xl bg-muted-light-2 shadow-card-back'
            }
          ></motion.div>
        </div>
        <motion.div
          className="h-1/2 rounded-b-3xl bg-white"
          variants={blockVariants}
          transition={{ duration: 1, ease: 'easeOut', delay: 0.1 }}
        />
        <motion.h1
          style={{
            transform: 'translate(-50%, -50%)',
          }}
          variants={analiz}
          initial="invisible"
          animate={isLoading ? 'visible' : 'invisible'}
          transition={{ duration: 0.5, delay: 0.5 }}
          className={
            'relative left-1/2 top-10 text-nowrap text-center text-lg font-semibold'
          }
        >
          Анализируем сон...
        </motion.h1>
      </motion.div>

      <motion.div
        className={
          'bottom-4 mb-6 flex w-full flex-col items-center justify-center gap-y-2'
        }
        variants={variantsButtons}
        initial="invisible"
        animate={stepsValue === 0 || isLoading ? 'invisible' : 'visible'}
        transition={{ duration: 0.5, delay: 0.5 }}
      >
        <Button className={'text-md p-6'} onClick={handleSendDream}>
          Узнать значение сна
        </Button>
        <Button onClick={prevStep} variant={'ghost'}>
          Отмена
        </Button>
      </motion.div>
    </>
  )
}
