import { FunctionComponent, useEffect, useState } from 'react'
import { ArrowUpIcon } from '@/shared/ui/icons'
import { Button } from '@/shared/ui-shad-cn/ui/button.tsx'
import { useScroll, useTransform, motion } from 'framer-motion'
import { cn } from '@/shared/lib/tailwind.ts'
import { useLocation, useNavigate } from 'react-router-dom'

interface Props {
  refContainer: any
}

export const UpWidget: FunctionComponent<Props> = ({ refContainer }) => {
  const { scrollYProgress } = useScroll({ target: refContainer })
  const firstSectionOpacity = useTransform(scrollYProgress, [0, 0.3], [0, 1])
  const [isVisible, setIsVisible] = useState(false)
  const location = useLocation() // Получение текущего пути
  const isSpecialPage = location.pathname.includes('dream')
  const navigate = useNavigate()

  const handleClick = () => {
    if (isSpecialPage) {
      navigate('/')
    } else {
      scrollUp()
    }
  }

  const scrollUp = () => {
    window.scrollTo({
      behavior: 'smooth',
      top: 0,
    })
  }

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      setIsVisible(currentScrollY > 100 || isSpecialPage) // Видимость кнопки зависит от положения и уникальности страницы
    }
    window.addEventListener('scroll', handleScroll)
    handleScroll() // Проверяем сразу при монтировании
    return () => window.removeEventListener('scroll', handleScroll)
  }, [isSpecialPage])

  return (
    <motion.div
      style={{ opacity: isSpecialPage ? 1 : firstSectionOpacity }}
      className={cn(
        'fixed bottom-4 left-4 right-4 z-50 flex items-center justify-end gap-x-2',
        isVisible ? '' : 'pointer-events-none -z-10'
      )}
    >
      <Button
        className={
          'flex h-[44px] items-center justify-center rounded-[12px] px-[18px] py-[10px] text-[17px]'
        }
        onClick={handleClick}
      >
        {isSpecialPage ? (
          <span>X</span> // Специальное поведение для уникальной страницы
        ) : (
          <>
            <ArrowUpIcon className="!size-3" />
            <span>Назад</span>
          </>
        )}
      </Button>
    </motion.div>
  )
}
