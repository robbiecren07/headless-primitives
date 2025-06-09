import { useCallback, useRef, useState } from 'react'
import type { UseResizeHandleOptions, UseResizeHandleReturn } from './types'

export function useResizeHandle({
  initial,
  min = 0,
  max = Number.POSITIVE_INFINITY,
  axis = 'x',
}: UseResizeHandleOptions): UseResizeHandleReturn {
  const [size, setSize] = useState(initial)
  const [dragging, setDragging] = useState(false)
  const startPos = useRef(0)
  const startSize = useRef(initial)

  const clamp = useCallback((n: number) => Math.max(min, Math.min(max, n)), [min, max])

  const onMove = useCallback(
    (client: number) => {
      const delta = client - startPos.current
      const next =
        axis === 'x' ? clamp(startSize.current + delta) : clamp(startSize.current + delta)
      setSize(next)
    },
    [axis, clamp]
  )

  const onMouseMove = useCallback(
    (e: MouseEvent) => {
      e.preventDefault()
      onMove(axis === 'x' ? e.clientX : e.clientY)
    },
    [axis, onMove]
  )

  const onTouchMove = useCallback(
    (e: TouchEvent) => {
      onMove(axis === 'x' ? e.touches[0].clientX : e.touches[0].clientY)
    },
    [axis, onMove]
  )

  const onEnd = useCallback(() => {
    setDragging(false)
    window.removeEventListener('mousemove', onMouseMove)
    window.removeEventListener('mouseup', onEnd)
    window.removeEventListener('touchmove', onTouchMove)
    window.removeEventListener('touchend', onEnd)
  }, [onMouseMove, onTouchMove])

  const onStart = useCallback(
    (client: number) => {
      setDragging(true)
      startPos.current = client
      startSize.current = size
      window.addEventListener('mousemove', onMouseMove)
      window.addEventListener('mouseup', onEnd)
      window.addEventListener('touchmove', onTouchMove)
      window.addEventListener('touchend', onEnd)
    },
    [size, onMouseMove, onTouchMove, onEnd]
  )

  const handleMouseDown = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault()
      onStart(axis === 'x' ? e.clientX : e.clientY)
    },
    [axis, onStart]
  )

  const handleTouchStart = useCallback(
    (e: React.TouchEvent) => {
      onStart(axis === 'x' ? e.touches[0].clientX : e.touches[0].clientY)
    },
    [axis, onStart]
  )

  return {
    size,
    dragging,
    setSize: (n) => setSize(clamp(n)),
    handleProps: {
      onMouseDown: handleMouseDown,
      onTouchStart: handleTouchStart,
      tabIndex: 0,
      role: 'separator',
      'aria-valuenow': size,
      'aria-valuemin': min,
      'aria-valuemax': max,
      'aria-orientation': axis === 'x' ? 'horizontal' : 'vertical',
      style: {
        cursor: axis === 'x' ? 'col-resize' : 'row-resize',
        userSelect: dragging ? 'none' : undefined,
      },
    },
  }
}
