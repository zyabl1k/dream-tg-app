import { DrawerDreamInput, stepsStore } from '@/features/manage-home'
import { useStore } from '@nanostores/react'
import { useEffect, useState } from 'react'
import { Header } from '@/widgets/header'
import { Card } from '@/shared/ui/card.tsx'
import { cn } from '@/shared/lib/tailwind.ts'
import { motion, useScroll, useTransform } from 'framer-motion'
import { getDreamData } from '@/entities'
import { useQuery } from '@tanstack/react-query'
import { useTelegram } from '@/shared/lib/context/telegram.provider.tsx'
import { FadeInOut, FadeInOutBottom } from '@/shared/ui/animations'
import { useRootContainer } from '@/shared/lib/context'
import { PreloaderWidget } from '@/widgets/preloader'
import { Button } from '@/shared/ui-shad-cn/ui/button.tsx'
import { ArrowUpIcon } from '@/shared/ui/icons'

// const data = [
//   {
//     id: 1,
//     date: 'Сегодня',
//     description: 'Сон про вашу первую любовь и что-то еще для тестов',
//   },
//   {
//     id: 2,
//     date: 'Вчера',
//     description: 'Сон про вашу собаку и маму',
//   },
// ]

export const HomePage = () => {
  const stepsValue = useStore(stepsStore)
  const rootContainerRef = useRootContainer()
  const { user, webApp } = useTelegram()
  const { scrollYProgress } = useScroll({ target: rootContainerRef })
  const { isPending, error, data } = useQuery({
    queryKey: ['dreams'],
    queryFn: async () => await getDreamData(user?.id ?? 0),
  })
  // 1347606553
  const BackButton = webApp?.BackButton
  const [isVisible, setIsVisible] = useState(false)

  const firstSectionScale = useTransform(scrollYProgress, [0, 0.06], [1, 0.8])
  const firstSectionOpacity = useTransform(scrollYProgress, [0, 0.06], [1, 0])

  const textOpacity = useTransform(scrollYProgress, [0.03, 0.06], [0, 1])
  const bottomShadowOpacity = useTransform(
    scrollYProgress,
    [0.03, 0.06],
    [0, 1]
  )
  const textY = useTransform(scrollYProgress, [0.03, 0.06], [30, 0])
  const blocksY = useTransform(scrollYProgress, [0.03, 0.06], [-20, 0])
  const upButtonOpacity = useTransform(scrollYProgress, [0.03, 0.07], [0, 1])

  const top = () => {
    window.scrollTo({
      behavior: 'smooth',
      top: 0,
    })
  }

  useEffect(() => {
    const unsubscribe = scrollYProgress.onChange((progress) => {
      setIsVisible(progress > 0.01)
    })
    return () => {
      unsubscribe()
    }
  }, [scrollYProgress])

  useEffect(() => {
    stepsStore.set(0)
    if (BackButton) {
      BackButton.hide()
    }
  }, [scrollYProgress])

  // useEffect(() => {
  //   return scrollYProgress.onChange((val) => {
  //     setTest(textOpacity.get())
  //     setVal(val)
  //   })
  // }, [scrollYProgress])

  if (isPending) return <PreloaderWidget />
  if (error || !data) return 'An error has occurred: ' + error

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.8 }}
      className={'flex flex-col justify-center'}
    >
      <motion.section
        initial={{
          scale: 1,
          opacity: 1,
        }}
        style={{
          scale: firstSectionScale,
          opacity: firstSectionOpacity,
        }}
        className={cn(
          'relative flex h-[80vh] snap-center flex-col justify-start px-5 pt-8'
        )}
      >
        <Header />
        <motion.p
          key="paragraph"
          className="mb-8 mt-5 text-center text-muted"
          variants={FadeInOutBottom}
          initial="visible"
          animate={stepsValue > 0 ? 'invisible' : 'visible'}
          transition={{ duration: 0.5 }}
        >
          Карл Юнг считал, что сны связывают нас с бессознательным, где хранятся
          общие архетипы и символы и до 160 символов или 4 строки текста в
          декскрипторе, не больше
        </motion.p>
        <DrawerDreamInput />
      </motion.section>

      <motion.section
        variants={FadeInOut}
        initial="visible"
        animate={stepsValue > 0 ? 'invisible' : 'visible'}
        transition={{ duration: 0.5 }}
        className={cn(
          'relative flex h-full min-h-screen snap-start flex-col pb-14',
          stepsValue > 0 && 'pointer-events-none'
        )}
      >
        <motion.h1
          initial={{
            y: 30,
            opacity: 0,
          }}
          style={{
            opacity: textOpacity,
            y: textY,
          }}
          className={
            'pointer-events-none mt-8 text-center font-roslindale text-4xl'
          }
        >
          Коллекция снов
        </motion.h1>
        <motion.div
          className={'no-scrollbar flex flex-col items-center gap-y-8 py-10'}
          initial={{
            y: -20,
          }}
          style={{ y: blocksY }}
        >
          {data.map((item) => (
            <div className={'flex flex-col gap-y-6'} key={item.id}>
              <p className="text-center text-sm font-semibold text-muted-light">
                {item.date}
              </p>
              <Card
                layoutId={`card-${item.id}`}
                id={item.id}
                description={item.description}
              />
            </div>
          ))}
        </motion.div>

        <motion.div
          initial={{
            opacity: 0,
          }}
          className={
            'fixed bottom-10 right-5 z-40 flex items-center justify-end'
          }
          style={{ opacity: upButtonOpacity }}
        >
          <Button
            className={'flex items-center justify-center rounded-xl text-lg'}
            onClick={top}
          >
            <div
              className={cn(
                'flex items-center gap-x-2',
                !isVisible && 'pointer-events-none -z-10'
              )}
            >
              <div className={'flex size-[20px] items-center justify-center'}>
                <ArrowUpIcon className="!size-3" />
              </div>
              <span className={'text-[17px] font-semibold'}>Назад</span>
            </div>
          </Button>
        </motion.div>

        <motion.div
          initial={{
            opacity: 0,
          }}
          style={{
            opacity: bottomShadowOpacity,
          }}
          className={
            'fixed bottom-0 h-20 w-screen bg-gradient-to-t from-white to-transparent'
          }
        ></motion.div>
      </motion.section>
    </motion.div>
  )
}
