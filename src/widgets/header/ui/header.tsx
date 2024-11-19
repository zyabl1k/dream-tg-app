import { StarIcon } from '@/shared/ui/icons'
import { useStore } from '@nanostores/react'
import { stepsStore } from '@/features/manage-home'

export const Header = () => {
  const stepsValue = useStore(stepsStore)

  return (
    <>
      {stepsValue === 0 && (
        <header className={'relative w-full text-center'}>
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
      )}
    </>
  )
}
