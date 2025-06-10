export interface UndoableReducerState<T> {
  past: T[]
  present: T
  future: T[]
}

export interface UndoableReducerReturn<T, A> extends UndoableReducerState<T> {
  dispatch: React.Dispatch<A>
  undo: () => void
  redo: () => void
  canUndo: boolean
  canRedo: boolean
  reset: (state?: T) => void
}
