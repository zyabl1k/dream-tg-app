import { Header } from '@/widgets/header'
import { Outlet } from 'react-router-dom'
import { UpWidget } from '@/widgets/up-button'

export const RootLayout = () => {
  return (
    <div className={'flex min-h-screen flex-col gap-y-4 p-6'}>
      <Header />
      <Outlet />
      <UpWidget />
    </div>
  )
}
