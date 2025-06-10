import { useReducer, useCallback } from 'react'
import type { UndoableReducerState, UndoableReducerReturn } from './types'

function undoableReducer<T, A>(
  reducer: React.Reducer<T, A>,
  initialPresent: T
): React.Reducer<
  UndoableReducerState<T>,
  A | { type: '@@UNDO' } | { type: '@@REDO' } | { type: '@@RESET'; payload?: T }
> {
  return (state, action) => {
    if ((action as any).type === '@@UNDO') {
      if (!state.past.length) return state
      const previous = state.past[state.past.length - 1]
      const newPast = state.past.slice(0, -1)
      return {
        past: newPast,
        present: previous,
        future: [state.present, ...state.future],
      }
    }
    if ((action as any).type === '@@REDO') {
      if (!state.future.length) return state
      const next = state.future[0]
      const newFuture = state.future.slice(1)
      return {
        past: [...state.past, state.present],
        present: next,
        future: newFuture,
      }
    }
    if ((action as any).type === '@@RESET') {
      const nextState = (action as any).payload ?? initialPresent
      return {
        past: [],
        present: nextState,
        future: [],
      }
    }

    const newPresent = reducer(state.present, action as A)
    if (newPresent === state.present) return state
    return {
      past: [...state.past, state.present],
      present: newPresent,
      future: [],
    }
  }
}

export function useUndoableReducer<T, A>(
  reducer: React.Reducer<T, A>,
  initialState: T
): UndoableReducerReturn<T, A> {
  const [state, dispatch] = useReducer(undoableReducer(reducer, initialState), {
    past: [],
    present: initialState,
    future: [],
  })

  const undo = useCallback(() => dispatch({ type: '@@UNDO' } as any), [])
  const redo = useCallback(() => dispatch({ type: '@@REDO' } as any), [])
  const reset = useCallback((s?: T) => dispatch({ type: '@@RESET', payload: s } as any), [])

  return {
    ...state,
    dispatch: dispatch as React.Dispatch<A>,
    undo,
    redo,
    canUndo: state.past.length > 0,
    canRedo: state.future.length > 0,
    reset,
  }
}
