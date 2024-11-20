import { useParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { getDream } from '@/entities'
import { useStore } from '@nanostores/react'
import { stepsStore } from '@/features/manage-home'
import { useEffect } from 'react'

export const DreamPage = () => {
  const { id } = useParams()
  const stepsValue = useStore(stepsStore)
  const { isPending, error, data } = useQuery({
    queryKey: ['dream'],
    queryFn: async () => await getDream(id ?? '1'),
  })

  useEffect(() => {
    stepsStore.set(1)
  }, [])

  if (isPending) return 'Loading...'
  if (error || !data) return 'An error has occurred: ' + error.message

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
              {data.description}
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
      <div className={'flex flex-col gap-y-4'}>
        <h1 className={"font-['Roslindale-medium'] text-xl font-bold"}>
          {data.title}
        </h1>
        <p className={"font-['Roslindale-medium'] text-lg"}>
          {data.textRequest}
        </p>
      </div>
    </div>
  )
}
