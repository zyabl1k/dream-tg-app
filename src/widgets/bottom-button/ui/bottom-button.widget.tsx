import { useEffect, useState } from 'react'
import { ArrowUpIcon, CloseIcon } from '@/shared/ui/icons'
import { Button } from '@/shared/ui-shad-cn/ui/button.tsx'
import { useScroll, useTransform, motion } from 'framer-motion'
import { cn } from '@/shared/lib/tailwind.ts'
import { useLocation, useNavigate } from 'react-router-dom'
import { dreamStore } from '@/features/manage-home'
import { lifeStore } from '@/features/manage-home/model/dream.store.ts'
import { __APPLICATION__ } from '@/shared/config'
import { useRootContainer } from '@/shared/lib/context'

export const BottomButtonWidget = () => {
  const rootContainerRef = useRootContainer()
  const { scrollYProgress } = useScroll({ target: rootContainerRef })
  const upButtonOpacity = useTransform(scrollYProgress, [0.03, 0.06], [0, 1])
  const location = useLocation()
  const navigate = useNavigate()
  const isSpecialPage = __APPLICATION__.specialPaths.some((path) =>
    location.pathname.includes(path)
  )
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const unsubscribe = scrollYProgress.onChange((progress) => {
      setIsVisible(progress > 0.01 || isSpecialPage)
    })
    return () => {
      unsubscribe()
    }
  }, [scrollYProgress, isSpecialPage])

  const handleClick = () => {
    if (isSpecialPage) {
      dreamStore.set('')
      lifeStore.set('')
      navigate('/')
    } else {
      window.scrollTo({
        behavior: 'smooth',
        top: 0,
      })
    }
  }

  return (
    <div
      className={cn(
        'fixed bottom-10 right-5 z-40 flex items-center justify-end'
      )}
    >
      {isSpecialPage ? (
        <Button
          className={cn(
            'flex items-center justify-center rounded-xl text-lg',
            isSpecialPage && 'p-2.5'
          )}
          onClick={handleClick}
        >
          <CloseIcon />
        </Button>
      ) : (
        <motion.div
          initial={{
            opacity: 0,
          }}
          style={{ opacity: upButtonOpacity }}
        >
          <Button
            className={cn(
              'flex items-center justify-center rounded-xl text-lg',
              isSpecialPage && 'p-2.5'
            )}
            onClick={handleClick}
          >
            <div
              className={cn(
                'flex items-center gap-x-2',
                !isVisible && 'pointer-events-none -z-10'
              )}
            >
              <div className={'flex size-[20px] items-center justify-center'}>
                <ArrowUpIcon className="!size-3" />
              </div>
              <span className={'text-[17px] font-semibold'}>Назад</span>
            </div>
          </Button>
        </motion.div>
      )}
    </div>
  )
}
