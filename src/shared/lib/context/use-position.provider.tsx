import {
  createContext,
  FunctionComponent,
  ReactNode,
  useContext,
  useState,
} from 'react'

interface PositionContextProps {
  position: { x: number; y: number } | null
  setPosition: (pos: { x: number; y: number }) => void
}

const PositionContext = createContext<PositionContextProps | undefined>(
  undefined
)

export const PositionProvider: FunctionComponent<{
  children: ReactNode
}> = ({ children }) => {
  const [position, setPosition] = useState<{ x: number; y: number } | null>(
    null
  )
  return (
    <PositionContext.Provider value={{ position, setPosition }}>
      {children}
    </PositionContext.Provider>
  )
}

export const usePosition = () => {
  const context = useContext(PositionContext)
  if (!context) {
    throw new Error(
      'useCardPosition must be used within a CardPositionProvider'
    )
  }
  return context
}
