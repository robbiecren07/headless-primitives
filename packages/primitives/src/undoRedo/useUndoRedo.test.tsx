import { describe, it, expect } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { useUndoRedo } from './useUndoRedo'

describe('useUndoRedo', () => {
  it('initializes with the provided value', () => {
    const { result } = renderHook(() => useUndoRedo(10))
    expect(result.current.state.present).toBe(10)
    expect(result.current.state.past).toEqual([])
    expect(result.current.state.future).toEqual([])
  })

  it('set updates the value and past', () => {
    const { result } = renderHook(() => useUndoRedo(0))

    act(() => result.current.set(1))
    expect(result.current.state.present).toBe(1)
    expect(result.current.state.past).toEqual([0])
    expect(result.current.state.future).toEqual([])

    act(() => result.current.set(2))
    expect(result.current.state.present).toBe(2)
    expect(result.current.state.past).toEqual([0, 1])
    expect(result.current.state.future).toEqual([])
  })

  it('undo and redo work as expected', () => {
    const { result } = renderHook(() => useUndoRedo(0))

    act(() => result.current.set(1))
    act(() => result.current.set(2))

    act(() => result.current.undo())
    expect(result.current.state.present).toBe(1)
    expect(result.current.state.past).toEqual([0])
    expect(result.current.state.future).toEqual([2])

    act(() => result.current.redo())
    expect(result.current.state.present).toBe(2)
    expect(result.current.state.past).toEqual([0, 1])
    expect(result.current.state.future).toEqual([])
  })

  it('reset clears history and sets new value', () => {
    const { result } = renderHook(() => useUndoRedo(0))
    act(() => result.current.set(1))
    act(() => result.current.reset(99))
    expect(result.current.state.present).toBe(99)
    expect(result.current.state.past).toEqual([])
    expect(result.current.state.future).toEqual([])
  })

  it('jump navigates to the correct index in history', () => {
    const { result } = renderHook(() => useUndoRedo(0))
    act(() => result.current.set(1))
    act(() => result.current.set(2))
    act(() => result.current.set(3))
    act(() => result.current.jump(1))
    expect(result.current.state.present).toBe(1)
  })

  it('clear resets past and future', () => {
    const { result } = renderHook(() => useUndoRedo(0))
    act(() => result.current.set(1))
    act(() => result.current.set(2))
    act(() => result.current.clear())
    expect(result.current.state.past).toEqual([])
    expect(result.current.state.future).toEqual([])
    expect(result.current.state.present).toBe(2)
  })
})
