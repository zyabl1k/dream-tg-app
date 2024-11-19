import { cn } from '@/shared/lib/tailwind.ts'
import { FC, ReactNode, useEffect } from 'react'

interface AnimatedSheetProps {
  isExpanded: boolean
  children: ReactNode
  top?: string
}

export const AnimatedSheet: FC<AnimatedSheetProps> = ({
  isExpanded,
  children,
  top,
}) => {
  useEffect(() => {
    if (isExpanded) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isExpanded])
  return (
    <div
      className={cn(
        'absolute inset-0 z-30 rounded-3xl bg-white bg-paper px-1 py-2 transition-all duration-[500ms]',
        isExpanded
          ? `${top} h-[80vh] scale-125 text-black`
          : 'invisible top-0 h-full text-muted-light'
      )}
      style={{
        backgroundColor: 'white',
      }}
    >
      {children}
    </div>
  )
}
