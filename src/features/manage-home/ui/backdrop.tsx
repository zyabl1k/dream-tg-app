import { FunctionComponent } from 'react'
import { cn } from '@/shared/lib/tailwind.ts'

interface BackdropProps {
  isExpanded: boolean
  onClick: () => void
}

export const Backdrop: FunctionComponent<BackdropProps> = ({
  isExpanded,
  onClick,
}) => {
  return (
    <div
      className={cn(
        'pointer-events-none absolute inset-0 -left-[24px] -top-[50vh] h-[200vh] w-screen bg-black opacity-0 transition-opacity duration-300',
        isExpanded && 'pointer-events-auto cursor-pointer opacity-50'
      )}
      onClick={onClick}
    ></div>
  )
}
