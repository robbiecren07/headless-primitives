export interface UndoRedoState<T> {
  past: T[]
  present: T
  future: T[]
}

export interface UseUndoRedoReturn<T> {
  state: UndoRedoState<T>
  set: (next: T) => void
  undo: () => void
  redo: () => void
  reset: (value: T) => void
  canUndo: boolean
  canRedo: boolean
  jump: (index: number) => void
  history: T[]
  clear: () => void
}
