import { describe, it, expect } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { useMultiSelect } from './useMultiSelect'

describe('useMultiSelect (uncontrolled)', () => {
  const items = ['a', 'b', 'c']

  it('initializes with initialSelected', () => {
    const { result } = renderHook(() => useMultiSelect({ items, initialSelected: ['a'] }))
    expect(result.current.selected).toEqual(['a'])
  })

  it('select and deselect work', () => {
    const { result } = renderHook(() => useMultiSelect({ items }))
    act(() => result.current.select('a'))
    expect(result.current.selected).toEqual(['a'])
    act(() => result.current.deselect('a'))
    expect(result.current.selected).toEqual([])
  })

  it('toggle works', () => {
    const { result } = renderHook(() => useMultiSelect({ items }))
    act(() => result.current.toggle('b'))
    expect(result.current.selected).toEqual(['b'])
    act(() => result.current.toggle('b'))
    expect(result.current.selected).toEqual([])
  })

  it('selectAll and clear work', () => {
    const { result } = renderHook(() => useMultiSelect({ items }))
    act(() => result.current.selectAll())
    expect(result.current.selected).toEqual(items)
    act(() => result.current.clear())
    expect(result.current.selected).toEqual([])
  })

  it('respects selectionLimit', () => {
    const { result } = renderHook(() => useMultiSelect({ items, selectionLimit: 2 }))
    act(() => result.current.select('a'))
    act(() => result.current.select('b'))
    act(() => result.current.select('c')) // should not add
    expect(result.current.selected).toEqual(['a', 'b'])
    expect(result.current.canSelectMore).toBe(false)
  })

  it('clear keeps one item if allowEmpty is false', () => {
    const { result } = renderHook(() => useMultiSelect({ items, allowEmpty: false }))
    act(() => result.current.selectAll())
    act(() => result.current.clear())
    expect(result.current.selected.length).toBe(1)
    expect(items).toContain(result.current.selected[0])
  })
})

describe('useMultiSelect (controlled)', () => {
  const items = ['a', 'b', 'c']

  it('controlled mode respects selected and onChange', () => {
    let controlled = ['a']
    const onChange = (next: string[]) => {
      controlled = next
    }

    const { result, rerender } = renderHook((props) => useMultiSelect(props), {
      initialProps: {
        items,
        selected: controlled,
        onChange,
      },
    })

    expect(result.current.selected).toEqual(['a'])
    act(() => result.current.select('b'))
    // Simulate parent updating controlled state
    rerender({
      items,
      selected: controlled,
      onChange,
    })
    expect(result.current.selected).toEqual(['a', 'b'])
  })

  it('setSelected calls onChange', () => {
    let controlled: string[] = []
    const onChange = (next: string[]) => {
      controlled = next
    }
    const { result } = renderHook(() => useMultiSelect({ items, selected: controlled, onChange }))
    act(() => result.current.setSelected(['b']))
    expect(controlled).toEqual(['b'])
  })
})
