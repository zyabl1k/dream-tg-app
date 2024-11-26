import { DrawerDreamInput, stepsStore } from '@/features/manage-home'
import { useStore } from '@nanostores/react'
import { useEffect, useRef } from 'react'
import { Header } from '@/widgets/header'
import { Card } from '@/shared/ui/card.tsx'
import { cn } from '@/shared/lib/tailwind.ts'
import { motion, useScroll, useTransform } from 'framer-motion'
import { getDreamData } from '@/entities'
import { useQuery } from '@tanstack/react-query'
import { useTelegram } from '@/shared/lib/telegram.provider.tsx'

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
//   {
//     id: 2,
//     date: 'Вчера',
//     description: 'Сон про вашу собаку и маму',
//   },
//   {
//     id: 2,
//     date: 'Вчера',
//     description: 'Сон про вашу собаку и маму',
//   },
//   {
//     id: 2,
//     date: 'Вчера',
//     description: 'Сон про вашу собаку и маму',
//   },
//   {
//     id: 2,
//     date: 'Вчера',
//     description: 'Сон про вашу собаку и маму',
//   },
//   {
//     id: 2,
//     date: 'Вчера',
//     description: 'Сон про вашу собаку и маму',
//   },
// ]

export const HomePage = () => {
  const stepsValue = useStore(stepsStore)
  const ref = useRef(null)
  const { user } = useTelegram()
  const { scrollYProgress } = useScroll({ target: ref })
  const { isPending, error, data } = useQuery({
    queryKey: ['dreams'],
    queryFn: async () => await getDreamData(user?.id ?? 0),
  })

  const firstSectionScale = useTransform(scrollYProgress, [0, 0.2], [1, 0.8])
  const firstSectionOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0])
  const secondSectionOpacity = useTransform(
    scrollYProgress,
    [0.7, 0.99],
    [0, 1]
  )
  const yText = useTransform(scrollYProgress, [0.7, 0.99], [30, 0])
  const yBlocks = useTransform(scrollYProgress, [0.7, 0.99], [-30, 0])

  useEffect(() => {
    stepsStore.set(0)
  }, [])

  const variants = {
    visible: {
      opacity: 1,
      y: 0,
    },
    invisible: {
      opacity: 0,
      y: -20,
    },
  }

  if (isPending)
    return (
      <div
        className={'absolute'}
        style={{
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
        }}
      >
        <img
          className={'size-10 animate-spin'}
          src={'img/loader.png'}
          alt={'loader'}
        />
      </div>
    )
  if (error || !data) return 'An error has occurred: ' + error

  return (
    <div ref={ref} className={'flex flex-col justify-center'}>
      <motion.section
        style={{ scale: firstSectionScale, opacity: firstSectionOpacity }}
        className={cn(
          'relative flex h-[80vh] snap-center flex-col justify-start p-6 pt-6'
        )}
      >
        <Header />
        <motion.p
          key="paragraph"
          className="mb-[32px] mt-[20px] text-center text-muted"
          variants={variants}
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
        className={cn(
          'relative flex h-screen snap-center flex-col pb-8 opacity-100 transition-opacity',
          stepsValue > 0 && 'pointer-events-none opacity-0'
        )}
      >
        <motion.h1
          style={{
            opacity: secondSectionOpacity,
            y: yText,
          }}
          className={
            'mb-[40px] mt-[32px] text-center font-roslindale text-[36px]'
          }
        >
          Коллекция снов
        </motion.h1>
        <motion.div
          className={
            'no-scrollbar flex flex-col items-center gap-y-4 overflow-y-auto pb-10'
          }
          style={{ y: yBlocks }}
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
          className={
            'absolute bottom-0 h-[200px] w-screen bg-gradient-to-t from-white to-transparent'
          }
        ></motion.div>
      </motion.section>
    </div>
  )
}
