import { renderHook, act } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { useStepper } from './useStepper'

const steps = ['info', 'details', 'confirm']

describe('useStepper', () => {
  it('initializes at the first step', () => {
    const { result } = renderHook(() => useStepper({ steps }))
    expect(result.current.currentStep).toBe(0)
    expect(result.current.isFirst).toBe(true)
    expect(result.current.isLast).toBe(false)
  })

  it('navigates steps', () => {
    const { result } = renderHook(() => useStepper({ steps }))
    act(() => result.current.next())
    expect(result.current.currentStep).toBe(1)
    act(() => result.current.prev())
    expect(result.current.currentStep).toBe(0)
    act(() => result.current.goToStep(2))
    expect(result.current.currentStep).toBe(2)
    expect(result.current.isLast).toBe(true)
  })

  it('does not go out of bounds', () => {
    const { result } = renderHook(() => useStepper({ steps }))
    act(() => result.current.prev())
    expect(result.current.currentStep).toBe(0)
    act(() => result.current.goToStep(10))
    expect(result.current.currentStep).toBe(0)
  })

  it('calls onStepChange', () => {
    const spy = vi.fn()
    const { result } = renderHook(() => useStepper({ steps, onStepChange: spy }))
    act(() => result.current.goToStep(2))
    expect(spy).toHaveBeenCalledWith(2)
    act(() => result.current.reset())
    expect(spy).toHaveBeenCalledWith(0)
  })
})
