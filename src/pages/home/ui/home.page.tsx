import { DrawerDreamInput, stepsStore } from '@/features/manage-home'
import { useStore } from '@nanostores/react'
import { CSSTransition } from 'react-transition-group'
import { useRef } from 'react'
import { cn } from '@/shared/lib/tailwind.ts'

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
    description: 'Сон про роботов',
  },
  {
    id: 2,
    date: 'вчера',
    description: 'Сон про роботов',
  },
  {
    id: 2,
    date: 'вчера',
    description: 'Сон про роботов',
  },
  {
    id: 2,
    date: 'вчера',
    description: 'Сон про роботов',
  },
  {
    id: 2,
    date: 'вчера',
    description: 'Сон про роботов',
  },
  {
    id: 2,
    date: 'вчера',
    description: 'Сон про роботов',
  },
  {
    id: 2,
    date: 'вчера',
    description: 'Сон про роботов',
  },
  {
    id: 2,
    date: 'вчера',
    description: 'Сон про роботов',
  },
]

export const HomePage = () => {
  const stepsValue = useStore(stepsStore)

  return (
    <div className={'flex flex-1 flex-col justify-center'}>
      {stepsValue < 1 && (
        <p className={'text-muted mb-4 text-center'}>
          Карл Юнг, основатель аналитической психологии, считал, что сны
          связывают нас с коллективным бессознательным — древним слоем психики,
          где хранятся общие для всех архетипы и символы.
        </p>
      )}
      <DrawerDreamInput />
      <div className="mt-10 flex flex-col gap-y-4">
        {dreamsList.map((item) => (
          <div
            key={item.id}
            className={cn(
              'flex cursor-pointer flex-col gap-y-2 rounded-xl bg-white p-4 transition-opacity duration-500',
              stepsValue > 0 ? 'hidden opacity-0' : 'opacity-100'
            )}
          >
            <p className="text-muted text-xs">{item.date}</p>
            <p className="font-semibold">{item.description}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
