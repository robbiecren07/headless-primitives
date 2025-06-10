import { renderHook, act } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { useFSM } from './useFSM'

const config = {
  initial: 'idle',
  states: {
    idle: { on: { SUBMIT: 'loading' } },
    loading: { on: { SUCCESS: 'success', FAIL: 'error' } },
    success: {},
    error: { on: { RETRY: 'loading' } },
  },
} as const

type State = keyof typeof config.states
type Event = 'SUBMIT' | 'SUCCESS' | 'FAIL' | 'RETRY'

describe('useFSM', () => {
  it('starts at initial state', () => {
    const { result } = renderHook(() => useFSM<State, Event>(config))
    expect(result.current.state).toBe('idle')
  })

  it('transitions states on events', () => {
    const { result } = renderHook(() => useFSM<State, Event>(config))
    act(() => result.current.transition('SUBMIT'))
    expect(result.current.state).toBe('loading')
    act(() => result.current.transition('SUCCESS'))
    expect(result.current.state).toBe('success')
  })

  it('resets state', () => {
    const { result } = renderHook(() => useFSM<State, Event>(config))
    act(() => result.current.transition('SUBMIT'))
    act(() => result.current.reset())
    expect(result.current.state).toBe('idle')
  })

  it('can() works as expected', () => {
    const { result } = renderHook(() => useFSM<State, Event>(config))
    expect(result.current.can('SUBMIT')).toBe(true)
    expect(result.current.can('SUCCESS')).toBe(false)
  })
})
