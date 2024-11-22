import { FunctionComponent, useEffect, useState } from 'react'
import { ArrowUpIcon } from '@/shared/ui/icons'
import { Button } from '@/shared/ui-shad-cn/ui/button.tsx'
import { cn } from '@/shared/lib/tailwind.ts'

export const UpWidget: FunctionComponent = () => {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      setIsVisible(currentScrollY > 100)
    }

    window.addEventListener('scroll', handleScroll)
    handleScroll() // Проверяем сразу при монтировании
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollUp = () => {
    window.scrollTo({
      behavior: 'smooth',
      top: 0,
    })
  }

  return (
    <div className="fixed bottom-4 left-4 right-4 z-20 flex items-center justify-end gap-x-2">
      <Button
        className={cn(
          'flex items-center justify-center rounded-md transition-opacity duration-300',
          isVisible ? 'opacity-100' : 'pointer-events-none -z-10 opacity-0'
        )}
        onClick={scrollUp}
      >
        <ArrowUpIcon className="!size-3" />
        <span>Назад</span>
      </Button>
    </div>
  )
}
