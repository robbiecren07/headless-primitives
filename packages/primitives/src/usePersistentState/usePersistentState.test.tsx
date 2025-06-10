import { renderHook, act } from '@testing-library/react'
import { describe, it, expect, beforeEach } from 'vitest'
import { usePersistentState } from './usePersistentState'

describe('usePersistentState', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it('reads default if nothing in storage', () => {
    const { result } = renderHook(() => usePersistentState({ key: 'foo', defaultValue: 42 }))
    expect(result.current[0]).toBe(42)
  })

  it('reads from storage if present', () => {
    localStorage.setItem('foo', JSON.stringify('hello'))
    const { result } = renderHook(() => usePersistentState({ key: 'foo', defaultValue: '' }))
    expect(result.current[0]).toBe('hello')
  })

  it('sets value and stores it', () => {
    const { result } = renderHook(() => usePersistentState({ key: 'bar', defaultValue: 0 }))
    act(() => result.current)
    expect(result.current[0]).toBe(123)
    expect(localStorage.getItem('bar')).toBe('123')
  })

  it('supports functional updates', () => {
    const { result } = renderHook(() => usePersistentState({ key: 'count', defaultValue: 1 }))
    act(() => result.current[1]((n) => n + 1))
    expect(result.current[0]).toBe(2)
  })
})
