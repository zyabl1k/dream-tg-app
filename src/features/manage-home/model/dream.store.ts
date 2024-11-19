import { atom } from 'nanostores'

export const dreamStore = atom<string>('')
export const lifeStore = atom<string>('')
export const stepsStore = atom<number>(0)
