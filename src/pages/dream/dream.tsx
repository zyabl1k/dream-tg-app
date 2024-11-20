import { useParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { getDream } from '@/entities'
import { stepsStore } from '@/features/manage-home'
import { useEffect, useState } from 'react'
import { useTelegram } from '@/shared/lib/telegram.provider.tsx'

export const DreamPage = () => {
  const { id } = useParams()
  const { user } = useTelegram()
  const [randomNumbers, setRandomNumbers] = useState<number[]>([])

  const { isPending, error, data } = useQuery({
    queryKey: ['dream'],
    queryFn: async () => await getDream(user?.id || 1347606553, id ?? '1'),
  })

  const generateRandomNumbers = () => {
    const numbers = Array.from({ length: 15 }, (_, i) => i + 1)
    for (let i = numbers.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[numbers[i], numbers[j]] = [numbers[j], numbers[i]] // Перемешивание
    }
    return numbers
  }

  useEffect(() => {
    stepsStore.set(1)
  }, [])

  useEffect(() => {
    setRandomNumbers(generateRandomNumbers())
  }, [])

  if (isPending) return 'Loading...'
  if (error || !data) return 'An error has occurred: ' + error.message

  const paragraphs = data.description.split('\n').map((paragraph, index) => {
    // Используем регулярное выражение для извлечения заголовка
    const match = paragraph.match(/^(.*?):/)
    const title = match ? match[1] : null // Заголовок до двоеточия
    const textWithoutTitle = title
      ? paragraph.replace(/^(.*?):\s*/, '')
      : paragraph

    return (
      <div key={index} className={'flex items-start gap-x-4'}>
        {index % 2 === 0 && randomNumbers[index / 2] && (
          <img
            src={`/img/pack/${randomNumbers[index / 2]}.png`}
            alt={'photo'}
          />
        )}
        <div className={'flex flex-col gap-y-3'}>
          {title && (
            <h1 className={"font-['Roslindale-medium'] text-2xl font-bold"}>
              {title}
            </h1>
          )}
          <p className={'text-lg'}>{textWithoutTitle}</p>
        </div>
      </div>
    )
  })

  return (
    <div className={'flex flex-col'}>
      <div className={'my-10 text-center'}>
        <div className={'relative'}>
          <div
            className={
              'relative rounded-b-md rounded-t-3xl bg-white px-4 pb-1 pt-4 text-left shadow-lg'
            }
          >
            <p className="font-['Roslindale-medium'] text-xl">
              {data.textRequest}
            </p>
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-10 rounded-b-md bg-gradient-to-t from-white to-transparent"></div>
          </div>
          <div
            className={
              'absolute -right-2 -top-2 -z-10 h-full w-full rounded-b-md rounded-t-3xl bg-muted-light-2 shadow-lg'
            }
          ></div>
        </div>
      </div>
      <div className={'flex flex-col items-start gap-x-4 gap-y-4'}>
        {paragraphs}
      </div>
    </div>
  )
}
