import { FunctionComponent, useEffect, useState } from 'react'
import { ArrowUpIcon } from '@/shared/ui/icons'
import { Button } from '@/shared/ui-shad-cn/ui/button.tsx'
import { cn } from '@/shared/lib/tailwind.ts'

export const UpWidget: FunctionComponent = () => {
  const [isVisible, setIsVisible] = useState<boolean>(false)

  useEffect(() => {
    function updatePosition() {
      const currentScrollY = window.scrollY
      setIsVisible(currentScrollY > 100)
    }

    window.addEventListener('scroll', updatePosition)
    updatePosition()

    return () => window.removeEventListener('scroll', updatePosition)
  }, [])

  const scrollUp = () => {
    window.scrollTo({
      behavior: 'smooth',
      top: 0,
    })
  }

  return (
    <div
      className={
        'fixed bottom-4 left-4 right-4 z-20 flex items-center justify-end gap-x-2'
      }
    >
      <Button
        className={cn(
          'flex items-center justify-center rounded-md transition-opacity duration-200',
          isVisible
            ? 'flex opacity-100'
            : 'pointer-events-none hidden opacity-0'
        )}
        onClick={scrollUp}
      >
        <ArrowUpIcon className={'!size-3'} />
        <span>Назад</span>
      </Button>
    </div>
  )
}
