import { renderHook, act } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { useAsyncTask } from './useAsyncTask'

const delay = (ms: number, value: any, shouldReject = false) =>
  new Promise((resolve, reject) =>
    setTimeout(() => (shouldReject ? reject(value) : resolve(value)), ms)
  )

describe('useAsyncTask', () => {
  it('runs a task and sets result', async () => {
    const { result } = renderHook(() =>
      useAsyncTask({
        task: async (v: string) => delay(10, v + ' world'),
      })
    )
    await act(async () => {
      await result.current.run('hello')
    })
    expect(result.current.result).toBe('hello world')
    expect(result.current.loading).toBe(false)
    expect(result.current.error).toBeNull()
  })

  it('handles errors', async () => {
    const { result } = renderHook(() =>
      useAsyncTask({
        task: async () => delay(10, 'fail', true),
      })
    )
    await act(async () => {
      await result.current.run()
    })
    expect(result.current.error).toBe('fail')
    expect(result.current.loading).toBe(false)
    expect(result.current.result).toBeNull()
  })

  it('auto mode runs on mount', async () => {
    const { result } = renderHook(() =>
      useAsyncTask({
        task: async () => delay(10, 42),
        auto: true,
      })
    )
    // Wait for the async effect to finish
    await act(async () => {
      await delay(15, null)
    })
    expect(result.current.result).toBe(42)
  })

  it('reset clears state', async () => {
    const { result } = renderHook(() =>
      useAsyncTask({
        task: async (v: string) => delay(10, v + ' world'),
      })
    )
    await act(async () => {
      await result.current.run('hi')
    })
    act(() => {
      result.current.reset()
    })
    expect(result.current.result).toBeNull()
    expect(result.current.error).toBeNull()
    expect(result.current.called).toBe(false)
    expect(result.current.loading).toBe(false)
  })
})
