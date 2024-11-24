import { Outlet } from 'react-router-dom'
import { UpWidget } from '@/widgets/up-button'
import { motion } from 'framer-motion'

export const RootLayout = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.8 }}
      className={'flex min-h-screen flex-col'}
    >
      <Outlet />
      <UpWidget />
    </motion.div>
  )
}
