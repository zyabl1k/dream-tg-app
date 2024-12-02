import { FunctionComponent } from 'react'
import { useNavigate } from 'react-router-dom'
import { cn } from '@/shared/lib/tailwind.ts'
import { motion } from 'framer-motion'
import { usePosition } from '@/shared/lib/context/use-position.provider.tsx'

interface CardProps {
  id?: number
  description: string
  layoutId?: string
  textClassName?: string
}

export const Card: FunctionComponent<CardProps> = ({
  id,
  description,
  textClassName,
}) => {
  const navigate = useNavigate()
  const { setPosition } = usePosition()

  const handleNavigate = (e: any) => {
    if (!id) {
      return null
    }
    const rect = e.currentTarget.getBoundingClientRect()
    const adjustedY = rect.top - window.innerHeight
    setPosition({ x: rect.left, y: adjustedY })
    navigate(`/dream/${id}`)
  }

  return (
    <motion.div
      transition={{ duration: 0.5, ease: 'easeInOut' }}
      className={cn('relative', id?.valueOf() && 'cursor-pointer')}
      onClick={handleNavigate}
    >
      <div
        className={
          'relative h-[144px] w-[307px] overflow-hidden rounded-b-md rounded-t-3xl bg-white px-7 pb-1 pt-5 shadow-card'
        }
      >
        <p className={`${textClassName} font-roslindale-medium text-xl`}>
          {description}
        </p>
        <div className="pointer-events-none absolute bottom-0 left-0 h-16 w-full rounded-b-md bg-gradient-to-t from-white to-transparent"></div>
      </div>
      <div
        className={
          'absolute -right-2 bottom-0 -z-10 h-[110%] w-full rounded-b-md rounded-t-3xl bg-muted-light-2 shadow-card-back'
        }
      ></div>
    </motion.div>
  )
}
