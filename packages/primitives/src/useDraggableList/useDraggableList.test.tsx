import { describe, it, expect } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { useDraggableList } from './useDraggableList'

describe('useDraggableList (uncontrolled)', () => {
  const items = ['a', 'b', 'c']

  it('moves items by index', () => {
    const { result } = renderHook(() => useDraggableList({ items }))

    act(() => result.current.move(0, 2)) // move 'a' to end
    expect(result.current.items).toEqual(['b', 'c', 'a'])

    act(() => result.current.move(2, 0)) // move 'a' to start
    expect(result.current.items).toEqual(['a', 'b', 'c'])
  })

  it('drag and drop handlers update indices', () => {
    const { result } = renderHook(() => useDraggableList({ items }))
    act(() => result.current.handleDragStart(1)) // 'b'
    act(() => result.current.handleDragOver(0))
    act(() => result.current.handleDrop())
    expect(result.current.items).toEqual(['b', 'a', 'c'])
    expect(result.current.draggingIndex).toBe(null)
    expect(result.current.dragOverIndex).toBe(null)
  })
})

describe('useDraggableList (controlled)', () => {
  const items = ['x', 'y', 'z']
  it('calls onChange when order changes', () => {
    let state = [...items]
    const onChange = (next: string[]) => {
      state = next
    }

    const { result, rerender } = renderHook((props) => useDraggableList(props), {
      initialProps: { items: state, onChange },
    })

    act(() => result.current.move(0, 2))
    // simulate parent updating the items
    rerender({ items: state, onChange })
    expect(result.current.items).toEqual(['y', 'z', 'x'])
  })
})
