import { cn } from '@/shared/lib/tailwind.ts'
import { FunctionComponent } from 'react'

interface CharacterCounterProps {
  currentLength: number
  maxLength: number
}

export const CharacterCounter: FunctionComponent<CharacterCounterProps> = ({
  currentLength,
  maxLength,
}) => {
  const remaining = maxLength - currentLength
  return (
    <p
      className={cn(
        'col-span-3',
        remaining < 0 ? 'text-red-500' : 'text-muted'
      )}
    >
      {remaining < 0 ? `${remaining}` : `Осталось ${remaining} символов`}
    </p>
  )
}