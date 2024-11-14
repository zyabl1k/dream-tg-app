import * as React from 'react'

import { cn } from '@/shared/lib/tailwind'

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        className={cn(
          'placeholder:text-muted flex h-10 w-full rounded-md border-transparent bg-transparent text-sm outline-none transition-colors disabled:cursor-not-allowed disabled:opacity-50',
          className
        )}
        ref={ref}
        type={type}
        {...props}
      />
    )
  }
)

Input.displayName = 'Input'

export { Input }
