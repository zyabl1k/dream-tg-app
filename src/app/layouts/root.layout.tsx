import { Outlet } from 'react-router-dom'
import { BottomButtonWidget } from '@/widgets/bottom-button'
import { useRef } from 'react'
import { RootContainerProvider } from '@/shared/lib/context'

export const RootLayout = () => {
  const rootContainerRef = useRef<HTMLDivElement | null>(null)

  return (
    <RootContainerProvider rootRef={rootContainerRef}>
      <div ref={rootContainerRef} className={'flex min-h-screen flex-col'}>
        <Outlet />
        <BottomButtonWidget />
      </div>
    </RootContainerProvider>
  )
}
