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
// ]

export const HomePage = () => {
  const stepsValue = useStore(stepsStore)
  const ref = useRef(null)
  const { user } = useTelegram()
  const { scrollYProgress } = useScroll({ target: ref })
  const { isPending, error, data } = useQuery({
    queryKey: ['dreams'],
    queryFn: async () => await getDreamData(user?.id || 1347606553),
  })

  const firstSectionScale = useTransform(scrollYProgress, [0, 0.2], [1, 0.8])
  const firstSectionOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0])
  const secondSectionOpacity = useTransform(
    scrollYProgress,
    [0.7, 0.99],
    [0, 1]
  )
  const yText = useTransform(scrollYProgress, [0.7, 0.99], [10, 0])
  const yBlocks = useTransform(scrollYProgress, [0.7, 0.99], [-50, 0])

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

  if (isPending) return 'Loading...'
  if (error || !data) return 'An error has occurred: ' + error

  return (
    <div ref={ref} className={'flex flex-col justify-center'}>
      <motion.section
        style={{ scale: firstSectionScale, opacity: firstSectionOpacity }}
        className={cn(
          'relative flex h-[95vh] snap-center flex-col justify-start'
        )}
      >
        <Header />
        <motion.p
          key="paragraph"
          className="my-4 text-center text-muted"
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
          'relative flex h-screen snap-center flex-col gap-y-4 pb-8 opacity-100 transition-opacity',
          stepsValue > 0 && 'pointer-events-none opacity-0'
        )}
      >
        <motion.h1
          style={{
            y: yText,
            opacity: secondSectionOpacity,
          }}
          className={"my-4 text-center font-['Roslindale-medium'] text-[36px]"}
        >
          Коллекция снов
        </motion.h1>
        <motion.div
          className={
            'no-scrollbar flex flex-col gap-y-4 overflow-y-scroll pb-10'
          }
          style={{ y: yBlocks }}
        >
          {data.map((item) => (
            <div className={'flex flex-col gap-y-6'} key={item.id}>
              <p className="text-center text-sm font-semibold text-muted">
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
      </motion.section>
    </div>
  )
}
