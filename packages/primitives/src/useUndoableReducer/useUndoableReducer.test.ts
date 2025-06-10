import { act, renderHook } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { useUndoableReducer } from './useUndoableReducer'

type State = number
type Action = { type: 'inc' } | { type: 'dec' }

const reducer = (state: State, action: Action) => {
  if (action.type === 'inc') return state + 1
  if (action.type === 'dec') return state - 1
  return state
}

describe('useUndoableReducer', () => {
  it('basic usage and undo/redo', () => {
    const { result } = renderHook(() => useUndoableReducer(reducer, 0))

    act(() => result.current.dispatch({ type: 'inc' }))
    expect(result.current.present).toBe(1)
    act(() => result.current.dispatch({ type: 'inc' }))
    expect(result.current.present).toBe(2)
    act(() => result.current.undo())
    expect(result.current.present).toBe(1)
    act(() => result.current.redo())
    expect(result.current.present).toBe(2)
    act(() => result.current.reset(5))
    expect(result.current.present).toBe(5)
    expect(result.current.canUndo).toBe(false)
    expect(result.current.canRedo).toBe(false)
  })

  it('does not allow undo with empty history', () => {
    const { result } = renderHook(() => useUndoableReducer(reducer, 0))
    act(() => result.current.undo())
    expect(result.current.present).toBe(0)
  })

  it('supports functional updates', () => {
    // Not relevant here, as reducer handles logic
    // But we can check reset with no payload
    const { result } = renderHook(() => useUndoableReducer(reducer, 0))
    act(() => result.current.dispatch({ type: 'inc' }))
    act(() => result.current.reset())
    expect(result.current.present).toBe(0)
  })
})
