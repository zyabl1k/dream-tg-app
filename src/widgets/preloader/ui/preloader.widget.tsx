import { SpinnerIcon } from '@/shared/ui/icons'

export const PreloaderWidget = () => {
  return (
    <div
      className={
        'z-50 flex h-screen w-screen items-center justify-center bg-background'
      }
    >
      <SpinnerIcon className={'size-10 animate-spin'} />
    </div>
  )
}
