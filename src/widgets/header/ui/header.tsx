import { StarIcon } from '@/shared/ui/icons'
import { useStore } from '@nanostores/react'
import { stepsStore } from '@/features/manage-home'
import { cn } from '@/shared/lib/tailwind.ts'

export const Header = () => {
  const stepsValue = useStore(stepsStore)

  return (
    <header
      className={cn(
        'relative w-full text-center opacity-100 transition-opacity',
        stepsValue > 0 && 'pointer-events-none opacity-0'
      )}
    >
      <h1 className={"font-['Roslindale-medium'] text-4xl"}>
        Толкователь
        <br />
        Снов
      </h1>
      <StarIcon className={'rotate-y-180 absolute right-4 top-5 size-4'} />
      <StarIcon className={'absolute right-0 top-10'} />
      <StarIcon className={'rotate-y-180 absolute left-0 top-5'} />
      <StarIcon className={'absolute left-0 top-12 size-4 rotate-45'} />
    </header>
  )
}
