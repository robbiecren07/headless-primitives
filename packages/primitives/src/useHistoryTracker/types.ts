export interface UseHistoryTrackerOptions<T = any> {
  initial?: T | null
  maxLength?: number
  onChange?: (entry: T | null, stack: T[]) => void
}

export interface UseHistoryTrackerReturn<T = any> {
  current: T | null
  back: () => void
  forward: () => void
  push: (entry: T) => void
  replace: (entry: T) => void
  canBack: boolean
  canForward: boolean
  stack: T[]
  index: number
  clear: () => void
}
