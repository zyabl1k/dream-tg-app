import { useNavigate, useParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { getDream } from '@/entities'
import { stepsStore } from '@/features/manage-home'
import { useEffect, useState } from 'react'
import { useTelegram } from '@/shared/lib/telegram.provider.tsx'
import { generateRandomNumbers } from '@/shared/lib/generate-number.ts'
import { parseDescription } from '@/shared/lib/parse-paragraph.ts'
import { Card } from '@/shared/ui/card.tsx'
import { motion } from 'framer-motion'
import { useCardPosition } from '@/shared/lib/use-position.provider.tsx'

// const data = {
//   textRequest: 'Любовь ко всем',
//   description: `Большой текст: я люблю всех на этой планетет
//
//   ДА: lol`,
// }

export const DreamPage = () => {
  const { id } = useParams()
  const { user } = useTelegram()
  const [randomNumbers, setRandomNumbers] = useState<number[]>([])
  const { position } = useCardPosition()
  const tg = window.Telegram.WebApp
  const BackButton = tg.BackButton
  const navigate = useNavigate()
  BackButton.show()

  BackButton.onClick(function () {
    navigate('/')
    BackButton.hide()
  })

  const { isPending, error, data } = useQuery({
    queryKey: ['dream'],
    queryFn: async () => await getDream(user?.id ?? 0, id ?? '1'),
  })

  useEffect(() => {
    document.body.style.overflow = ''
    stepsStore.set(0)
    setRandomNumbers(generateRandomNumbers())
  }, [])

  if (isPending) return 'Loading...'
  if (error || !data) return 'An error has occurred: ' + error.message

  const paragraphs = parseDescription(data.description).map(
    ({ title, text, index }) => (
      <div key={index} className="flex items-start gap-x-4">
        {randomNumbers[Math.floor(index / 2)] && (
          <img
            src={`/img/pack/${randomNumbers[Math.floor(index / 2)]}.png`}
            alt="photo"
          />
        )}
        <div className="flex flex-col gap-y-3">
          {title && (
            <h1 className="font-['Roslindale-medium'] text-2xl font-bold">
              {title}
            </h1>
          )}
          <p className="text-lg">{text}</p>
        </div>
      </div>
    )
  )

  return (
    <motion.div className={'flex flex-col'}>
      <motion.div
        initial={{
          x: 0,
          y: (position?.y && position?.y + window.innerHeight - 64) || 0,
        }}
        animate={{ x: 0, y: 0 }}
        transition={{ duration: 0.7, ease: 'easeInOut' }}
        className={'my-10'}
      >
        <Card description={data.textRequest} />
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.5, ease: 'easeInOut' }}
        className={'flex flex-col items-start gap-x-4 gap-y-4'}
      >
        {paragraphs}
      </motion.div>
    </motion.div>
  )
}
