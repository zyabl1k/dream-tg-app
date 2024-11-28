import { useStore } from '@nanostores/react'
import { dreamStore, lifeStore, stepsStore } from '../model/dream.store.ts'
import { cn } from '@/shared/lib/tailwind.ts'
import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { useValidationCard } from '@/features/manage-home/model/use-validate-imput.ts'
import { DreamContent } from '@/features/manage-home/ui/dream-content.tsx'
import { DragPilIcon } from '@/shared/ui/icons'
import { LifeContent } from '@/features/manage-home/ui/life-content.tsx'
import { Button } from '@/shared/ui-shad-cn/ui/button.tsx'
import { useMutation } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import { useTelegram } from '@/shared/lib/context'
import { sendDream } from '@/entities'
import {
  CollapseDrawerCard,
  containerVariants,
  FadeInOut,
} from '@/shared/ui/animations'

export const DrawerDreamInput = () => {
  const dreamValue = useStore(dreamStore)
  const lifeValue = useStore(lifeStore)
  const stepsValue = useStore(stepsStore)
  const { isEmpty, validateDream } = useValidationCard()
  const [isExpandedDream, setIsExpandedDream] = useState(false)
  const [isExpandedLife, setIsExpandedLife] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const { user } = useTelegram()
  const navigate = useNavigate()

  const [abortController, setAbortController] =
    useState<AbortController | null>(null)

  const { mutate: sendDreamRequest } = useMutation({
    mutationFn: async () => {
      const controller = new AbortController()
      setAbortController(controller)

      try {
        const response = await sendDream(
          dreamValue,
          lifeValue,
          user?.id,
          controller.signal
        )
        setIsLoading(false)
        document.body.style.overflow = ''
        navigate(`/dream/${response.id}`)
      } catch (error) {
        // @ts-ignore
        if (error.name === 'AbortError') {
          console.log('Запрос отменен')
        } else {
          throw error
        }
      }
    },
    onError: (err) => {
      setIsLoading(false)
      stepsStore.set(0)
      console.error('Ошибка:', err)
    },
  })

  useEffect(() => {
    if (isExpandedDream || isExpandedLife || stepsValue > 0) {
      document.body.style.overflow = 'hidden'
      document.body.style.position = 'fixed'
      document.body.style.width = '100%'
    } else {
      document.body.style.overflow = 'auto'
      document.body.style.position = ''
    }

    return () => {
      document.body.style.overflow = ''
      document.body.style.position = ''
      document.body.style.width = ''
    }
  }, [isExpandedDream, isExpandedLife, stepsValue])

  const nextStep = () => {
    if (validateDream()) {
      handleCloseModal()
      stepsStore.set(stepsValue + 1)
    }
  }

  const handleCloseModal = () => {
    setIsExpandedDream(false)
    setIsExpandedLife(false)
  }

  const prevStep = () => {
    const userConfirmed = window.confirm(
      'Вы уверены, что хотите отменить толкование?'
    )

    if (userConfirmed) {
      if (abortController) {
        abortController.abort()
        setAbortController(null)
      }
      setIsLoading(false)
      dreamStore.set('')
      lifeStore.set('')
      handleCloseModal()
      stepsStore.set(stepsValue - 1)
    }
  }

  const handleSendDream = () => {
    handleCloseModal()
    sendDreamRequest()
    setIsLoading(true)
  }

  const blockVariants = {
    collapsed: { opacity: 1, height: '50%' },
    expanded: { opacity: 1, height: 0 },
  }

  const test = {
    collapsed: { right: 0, height: '100%' },
    expanded: { right: '-0.5rem', height: '110%' },
  }

  return (
    <>
      <motion.div
        layout
        variants={CollapseDrawerCard}
        initial="collapsed"
        animate={isExpandedDream || isExpandedLife ? 'expanded' : 'collapsed'}
        className={cn(
          'relative top-0 z-50 cursor-pointer text-start',
          stepsValue > 0 && !isExpandedLife && '!-top-[20vh]',
          (isExpandedLife || isExpandedDream) && 'absolute',
          isLoading && 'hidden'
        )}
        onClick={() => {
          if (!isExpandedDream && stepsValue === 0) setIsExpandedDream(true)
          if (!isExpandedLife && stepsValue === 1) setIsExpandedLife(true)
        }}
        drag={(isExpandedDream || isExpandedLife) && 'y'}
        dragConstraints={{ top: 0, bottom: 0 }}
        onDragEnd={(_, info) => {
          if (info.offset.y > 100) handleCloseModal()
        }}
      >
        {(isExpandedDream || isExpandedLife) && (
          <DragPilIcon className={'relative top-3.5 z-50 mx-auto'} />
        )}
        <div
          className={cn(
            'relative h-full cursor-pointer text-start transition-transform delay-500 duration-1000',
            stepsValue > 0 && 'rotate-y-180',
            !isExpandedDream && stepsValue < 1 && 'rounded-b-4xl'
          )}
        >
          {/* Лицевая сторона */}
          <div
            className={cn(
              'rounded-4xl absolute inset-0 z-10 bg-white shadow-card-box',
              stepsValue > 0 && 'hidden'
            )}
          >
            <DreamContent
              isExpanded={isExpandedDream}
              dreamValue={dreamValue}
              isEmpty={isEmpty}
              nextStep={nextStep}
            />
            <div
              className={cn(
                'rounded-b-4xl pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-white to-transparent',
                (isExpandedDream || isExpandedLife) && 'hidden'
              )}
            ></div>
          </div>

          <div
            className={cn(
              'rounded-4xl absolute inset-0 z-10 bg-white shadow-card-box',
              stepsValue > 0 ? 'block' : 'hidden'
            )}
          >
            <LifeContent
              nextStep={handleSendDream}
              isExpanded={isExpandedLife}
              lifeValue={lifeValue}
            />
            <div
              className={cn(
                'rounded-b-4xl pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-white to-transparent',
                (isExpandedDream || isExpandedLife) && 'hidden'
              )}
            ></div>
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
          <div className={'h-[140px] overflow-hidden'}>
            <p className="scan overflow-hidden text-ellipsis break-words !bg-black font-roslindale-medium text-xl">
              {dreamValue}
            </p>
          </div>
          <motion.div
            variants={test}
            transition={{ duration: 0.5, ease: 'easeInOut', delay: 0.3 }}
            className={
              'absolute -right-4 bottom-0 -z-10 w-full rounded-b-md rounded-t-3xl bg-muted-light-2 shadow-card-back'
            }
          />
          <div
            className={cn(
              'pointer-events-none absolute inset-x-0 bottom-0 h-24 rounded-b-3xl bg-gradient-to-t from-white to-transparent',
              (isExpandedDream || isExpandedLife) && 'hidden'
            )}
          ></div>
        </div>
        <motion.div
          className="h-1/2 rounded-b-3xl bg-white"
          variants={blockVariants}
          transition={{ duration: 0.5, ease: 'easeOut', delay: 0.1 }}
        />
        <motion.h1
          style={{
            transform: 'translate(-50%, -50%)',
          }}
          variants={FadeInOut}
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

      <div
        className={cn(
          'fixed bottom-0 left-0 mb-6 flex w-full flex-col items-center justify-center gap-y-[32px]',
          stepsValue === 0 && 'pointer-events-none'
        )}
      >
        <motion.div
          variants={FadeInOut}
          initial="invisible"
          animate={stepsValue === 0 || isLoading ? 'invisible' : 'visible'}
          transition={{ duration: 0.5 }}
        >
          <Button
            className={cn(
              'text-md shadow-send-dream-btn h-[60px] rounded-[16px] px-[40px] py-[18px] font-semibold',
              (stepsValue === 0 || isLoading) && 'pointer-events-none'
            )}
            onClick={handleSendDream}
          >
            Узнать значение сна
          </Button>
        </motion.div>
        <motion.div
          transition={{ duration: 0.5, delay: 0.5 }}
          variants={FadeInOut}
          initial="invisible"
          animate={stepsValue === 0 ? 'invisible' : 'visible'}
        >
          <Button
            className={'text-md font-semibold'}
            onClick={prevStep}
            variant={'ghost'}
          >
            Отменить
          </Button>
        </motion.div>
      </div>
    </>
  )
}
