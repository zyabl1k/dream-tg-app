import {
  TitleSIcon,
  TitleOIcon,
  TitleNIcon,
  TitleIIcon,
  TitleKIcon,
} from '@/shared/ui/icons'

export const Header = () => {
  return (
    <header className={'flex w-full flex-row items-center justify-center'}>
      <TitleSIcon />
      <TitleOIcon />
      <TitleNIcon />
      <TitleNIcon />
      <TitleIIcon />
      <TitleKIcon />
    </header>
  )
}
