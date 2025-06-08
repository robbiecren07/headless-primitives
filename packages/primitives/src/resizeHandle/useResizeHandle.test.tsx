import { describe, it, expect } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { useResizeHandle } from './useResizeHandle'

describe('useResizeHandle', () => {
  it('initializes with initial size', () => {
    const { result } = renderHook(() => useResizeHandle({ initial: 100 }))
    expect(result.current.size).toBe(100)
    expect(result.current.dragging).toBe(false)
  })

  it('setSize clamps to min/max', () => {
    const { result } = renderHook(() => useResizeHandle({ initial: 100, min: 50, max: 200 }))
    act(() => result.current.setSize(10))
    expect(result.current.size).toBe(50)
    act(() => result.current.setSize(300))
    expect(result.current.size).toBe(200)
  })

  it('handleProps includes correct props', () => {
    const { result } = renderHook(() => useResizeHandle({ initial: 100, axis: 'y' }))
    expect(result.current.handleProps.role).toBe('separator')
    expect(result.current.handleProps['aria-orientation']).toBe('vertical')
    expect(typeof result.current.handleProps.onMouseDown).toBe('function')
  })

  // Simulate drag: not perfect but tests flow
  it('drag changes size', () => {
    const { result } = renderHook(() => useResizeHandle({ initial: 100, axis: 'x' }))
    act(() => {
      result.current.handleProps.onMouseDown({ preventDefault() {}, clientX: 100 } as any)
    })
    // Simulate mousemove event:
    act(() => {
      window.dispatchEvent(new MouseEvent('mousemove', { clientX: 150 }))
    })
    // End drag
    act(() => {
      window.dispatchEvent(new MouseEvent('mouseup'))
    })
    expect(result.current.size).toBe(150)
    expect(result.current.dragging).toBe(false)
  })
})
