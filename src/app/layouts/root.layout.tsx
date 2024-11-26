import { Outlet } from 'react-router-dom'
import { UpWidget } from '@/widgets/up-button'
import { motion } from 'framer-motion'
import { useRef } from 'react'

export const RootLayout = () => {
  const ref = useRef(null)

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.8 }}
      className={'flex min-h-screen flex-col'}
    >
      <Outlet />
      <UpWidget refContainer={ref} />
    </motion.div>
  )
}
