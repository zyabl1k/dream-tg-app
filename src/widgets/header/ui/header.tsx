import { StarIcon } from '@/shared/ui/icons'
import { useStore } from '@nanostores/react'
import { stepsStore } from '@/features/manage-home'
import { motion } from 'framer-motion'

export const Header = () => {
  const stepsValue = useStore(stepsStore)

  const variants = {
    visible: {
      opacity: 1,
      y: 0,
    },
    invisible: {
      opacity: 0,
      y: 0,
    },
  }

  return (
    <motion.header
      variants={variants}
      initial="visible"
      animate={stepsValue > 0 ? 'invisible' : 'visible'}
      transition={{ duration: 0.5 }}
      className={'relative w-full text-center'}
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
    </motion.header>
  )
}
