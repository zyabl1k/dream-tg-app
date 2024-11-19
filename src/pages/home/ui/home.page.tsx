import { DrawerDreamInput, stepsStore } from '@/features/manage-home'
import { useStore } from '@nanostores/react'

const dreamsList = [
  {
    id: 1,
    date: 'сегодня',
    description:
      'Сон про берег моря, рыбок и старика. Ваша скрытая цель и талант',
  },
  {
    id: 2,
    date: 'вчера',
    description: 'Сон про роботов и битву с ними лол',
  },
]

export const HomePage = () => {
  const stepsValue = useStore(stepsStore)

  // const { isPending, error, data } = useQuery({
  //   queryKey: ['dreams'],
  //   queryFn: async () => await getDreamData(),
  // })
  //
  // if (isPending) return 'Loading...'
  // if (error) return 'An error has occurred: ' + error.message

  return (
    <div className={'flex flex-1 flex-col justify-center'}>
      {stepsValue < 1 && (
        <p className={'mb-4 text-center text-muted'}>
          Карл Юнг считал, что сны связывают нас с бессознательным, где хранятся
          общие архетипы и символы и до 160 символов или 4 строки текста в
          декскрипторе, не больше
        </p>
      )}
      <DrawerDreamInput />
      {stepsValue < 1 && (
        <div className={'-z-10 mt-10 flex snap-center flex-col gap-y-4'}>
          {dreamsList.map((item) => (
            <div key={item.id} className={'text-center'}>
              <p className="mb-4 text-sm font-semibold text-muted">
                {item.date}
              </p>
              <div className={'relative'}>
                <div
                  className={
                    'relative rounded-b-md rounded-t-3xl bg-white px-4 pb-1 pt-4 text-left shadow-lg'
                  }
                >
                  <p className="font-['Roslindale-medium'] text-xl">
                    {item.description}
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
          ))}
        </div>
      )}
    </div>
  )
}
