import {
  createContext,
  FunctionComponent,
  ReactNode,
  useContext,
  useState,
} from 'react'

interface CardPositionContextProps {
  position: { x: number; y: number } | null
  setPosition: (pos: { x: number; y: number }) => void
}

const CardPositionContext = createContext<CardPositionContextProps | undefined>(
  undefined
)

export const CardPositionProvider: FunctionComponent<{
  children: ReactNode
}> = ({ children }) => {
  const [position, setPosition] = useState<{ x: number; y: number } | null>(
    null
  )
  return (
    <CardPositionContext.Provider value={{ position, setPosition }}>
      {children}
    </CardPositionContext.Provider>
  )
}

export const useCardPosition = () => {
  const context = useContext(CardPositionContext)
  if (!context) {
    throw new Error(
      'useCardPosition must be used within a CardPositionProvider'
    )
  }
  return context
}
