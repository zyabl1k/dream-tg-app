import React, { createContext, useContext, RefObject } from 'react'

const RootContainerContext = createContext<RefObject<HTMLDivElement> | null>(
  null
)

export const useRootContainer = () => {
  const context = useContext(RootContainerContext)
  if (!context) {
    throw new Error(
      'useRootContainer must be used within RootContainerProvider'
    )
  }
  return context
}

interface RootContainerProviderProps {
  children: React.ReactNode
  rootRef: RefObject<HTMLDivElement>
}

export const RootContainerProvider: React.FC<RootContainerProviderProps> = ({
  children,
  rootRef,
}) => {
  return (
    <RootContainerContext.Provider value={rootRef}>
      {children}
    </RootContainerContext.Provider>
  )
}
