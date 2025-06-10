import { renderHook, act } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { useHistoryTracker } from './useHistoryTracker'

describe('useHistoryTracker', () => {
  it('initializes with initial entry', () => {
    const { result } = renderHook(() => useHistoryTracker({ initial: 'a' }))
    expect(result.current.current).toBe('a')
    expect(result.current.canBack).toBe(false)
    expect(result.current.canForward).toBe(false)
  })

  it('push and back/forward', () => {
    const { result } = renderHook(() => useHistoryTracker({ initial: 1 }))
    act(() => result.current.push(2))
    act(() => result.current.push(3))
    expect(result.current.stack).toEqual([1, 2, 3])
    expect(result.current.current).toBe(3)
    act(() => result.current.back())
    expect(result.current.current).toBe(2)
    act(() => result.current.forward())
    expect(result.current.current).toBe(3)
    expect(result.current.canBack).toBe(true)
    expect(result.current.canForward).toBe(false)
  })

  it('replace replaces current', () => {
    const { result } = renderHook(() => useHistoryTracker({ initial: 0 }))
    act(() => result.current.push(1))
    act(() => result.current.replace(42))
    expect(result.current.current).toBe(42)
    expect(result.current.stack).toEqual([0, 42])
  })

  it('clears all', () => {
    const { result } = renderHook(() => useHistoryTracker({ initial: 'x' }))
    act(() => result.current.push('y'))
    act(() => result.current.clear())
    expect(result.current.stack).toEqual([])
    expect(result.current.current).toBe(null)
    expect(result.current.index).toBe(-1)
  })
})
