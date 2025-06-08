import { useCallback, useState } from 'react'
import type { UndoRedoState, UseUndoRedoReturn } from './types'

/**
 * useUndoRedo: track a value's history and provide undo/redo/reset actions.
 *
 * @param initialPresent - The initial value.
 */
export function useUndoRedo<T>(initialPresent: T): UseUndoRedoReturn<T> {
  const [state, setState] = useState<UndoRedoState<T>>({
    past: [],
    present: initialPresent,
    future: [],
  })

  // Only update state if the new value is actually different
  const set = useCallback((next: T) => {
    setState((curr) => {
      if (Object.is(next, curr.present)) return curr
      return {
        past: [...curr.past, curr.present],
        present: next,
        future: [],
      }
    })
  }, [])

  const undo = useCallback(() => {
    setState((curr) => {
      const { past, present, future } = curr
      if (past.length === 0) return curr
      const previous = past[past.length - 1]
      const newPast = past.slice(0, past.length - 1)
      return {
        past: newPast,
        present: previous,
        future: [present, ...future],
      }
    })
  }, [])

  const redo = useCallback(() => {
    setState((curr) => {
      const { past, present, future } = curr
      if (future.length === 0) return curr
      const next = future[0]
      const newFuture = future.slice(1)
      return {
        past: [...past, present],
        present: next,
        future: newFuture,
      }
    })
  }, [])

  const reset = useCallback((value: T) => {
    setState({
      past: [],
      present: value,
      future: [],
    })
  }, [])

  const clear = useCallback(() => {
    setState((curr) => ({
      ...curr,
      past: [],
      future: [],
    }))
  }, [])

  const jump = useCallback((index: number) => {
    setState((curr) => {
      const history = [...curr.past, curr.present, ...curr.future]
      if (index < 0 || index >= history.length) return curr
      return {
        past: history.slice(0, index),
        present: history[index],
        future: history.slice(index + 1),
      }
    })
  }, [])

  // History for debugging/UIs
  const history = [...state.past, state.present, ...state.future]

  return {
    state,
    set,
    undo,
    redo,
    reset,
    canUndo: state.past.length > 0,
    canRedo: state.future.length > 0,
    jump,
    history,
    clear,
  }
}
