import { useNavigate, useParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { getDream } from '@/entities'
import { dreamStore, stepsStore } from '@/features/manage-home'
import { useEffect, useState } from 'react'
import { generateRandomNumbers } from '@/shared/lib/generate-number.ts'
import { parseDescription } from '@/shared/lib/parse-paragraph.ts'
import { motion } from 'framer-motion'
import { cn } from '@/shared/lib/tailwind.ts'
import { lifeStore } from '@/features/manage-home/model/dream.store.ts'
import { usePosition, useTelegram } from '@/shared/lib/context'
import { CloseIcon } from '@/shared/ui/icons'
import { Button } from '@/shared/ui-shad-cn/ui/button.tsx'

export const DreamPage = () => {
  const { id } = useParams()
  const { user, webApp } = useTelegram()
  const [randomNumbers, setRandomNumbers] = useState<number[]>([])
  const { position } = usePosition()
  const BackButton = webApp?.BackButton
  const navigate = useNavigate()
  const [clicked, setClicked] = useState(false)

  const { isPending, error, data } = useQuery({
    queryKey: ['dream'],
    queryFn: async () => await getDream(user?.id ?? 0, id ?? '1'),
  })

  useEffect(() => {
    window.scrollTo(0, 0)
    document.body.style.overflow = ''
    stepsStore.set(0)
    setRandomNumbers(generateRandomNumbers())
  }, [])

  useEffect(() => {
    if (clicked) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'auto'
    }
    return () => {
      document.body.style.overflow = 'auto'
    }
  }, [clicked])

  if (isPending) return null
  if (error || !data) return 'An error has occurred: ' + error.message
  if (!BackButton) return null

  const handleCardClick = () => {
    setClicked(!clicked)
  }

  BackButton.show()

  BackButton.onClick(function () {
    navigate('/')
    dreamStore.set('')
    lifeStore.set('')
    BackButton.hide()
  })

  const handleClick = () => {
    dreamStore.set('')
    lifeStore.set('')
    navigate('/')
  }

  const paragraphs = parseDescription(data.description).map(
    ({ title, text, index }) => (
      <div key={index} className="flex items-start gap-x-4">
        {randomNumbers[Math.floor(index / 2)] && (
          <img
            src={`/img/pack/${randomNumbers[Math.floor(index / 2)]}.svg`}
            alt="photo"
          />
        )}
        <div className="flex flex-col gap-y-4">
          {title && (
            <h1 className="font-roslindale-medium text-[20px]">{title}</h1>
          )}
          <p className="text-lg">{text}</p>
        </div>
      </div>
    )
  )

  if (!paragraphs) return 'Данные не загружены'

  return (
    <motion.div className={'flex snap-start flex-col px-6 pb-6'}>
      <motion.div
        initial={{
          x: 0,
          y: (position?.y && position?.y + window.innerHeight - 64) || 0,
        }}
        animate={{
          x: 0,
          y: 0,
        }}
        transition={{ duration: 0.5, ease: 'easeInOut' }}
        className={'z-50 mx-auto my-[60px]'}
        onClick={handleCardClick}
      >
        <motion.div
          transition={{ duration: 0.5, ease: 'easeInOut' }}
          className={cn(
            'relative w-[307px]',
            id?.valueOf() && 'cursor-pointer'
          )}
        >
          <motion.div
            animate={{
              height: clicked ? '360px' : '144px',
              borderBottomRightRadius: clicked
                ? '1.5rem'
                : 'calc(0.5rem - 2px)',
              borderBottomLeftRadius: clicked
                ? '1.5rem'
                : 'calc(var(--radius) - 2px)',
            }}
            className={
              'relative h-[144px] overflow-hidden rounded-b-md rounded-t-3xl bg-white px-[28px] pb-1 pt-[20px] shadow-card'
            }
            transition={{ duration: 0.7, ease: 'easeInOut' }}
          >
            <p className={`font-roslindale-medium text-[20px]`}>
              {data.textRequest}
            </p>
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 rounded-b-3xl bg-gradient-to-t from-white to-transparent"></div>
          </motion.div>
          <motion.div
            animate={{
              height: clicked ? 0 : '110%',
              right: clicked ? '0' : '-0.5rem',
            }}
            className={
              'absolute bottom-0 -z-10 w-full rounded-b-md rounded-t-3xl bg-muted-light-2 shadow-card-back'
            }
            transition={{ duration: 0.7, ease: 'easeInOut' }}
          ></motion.div>
        </motion.div>
      </motion.div>
      <motion.div
        initial={{ opacity: 1, y: 0 }}
        animate={{
          opacity: clicked ? 0 : 1,
          y: clicked ? -20 : 0,
        }}
        transition={{ duration: 0.5, ease: 'easeInOut' }}
        className={'flex flex-col items-start gap-x-4 gap-y-4'}
      >
        {paragraphs}
      </motion.div>

      <div
        className={cn(
          'fixed bottom-10 right-5 z-40 flex items-center justify-end'
        )}
      >
        <Button
          className={cn(
            'flex items-center justify-center rounded-xl p-2.5 text-lg'
          )}
          onClick={handleClick}
        >
          <CloseIcon />
        </Button>
      </div>
    </motion.div>
  )
}
