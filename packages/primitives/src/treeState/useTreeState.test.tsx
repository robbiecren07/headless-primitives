import { describe, it, expect } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { useTreeState } from './useTreeState'

const tree = [
  {
    id: '1',
    data: 'root',
    children: [
      { id: '2', parentId: '1', data: 'child1' },
      {
        id: '3',
        parentId: '1',
        data: 'child2',
        children: [{ id: '4', parentId: '3', data: 'grandchild' }],
      },
    ],
  },
]

describe('useTreeState', () => {
  it('flattens and exposes root nodes', () => {
    const { result } = renderHook(() => useTreeState({ nodes: tree }))
    expect(result.current.rootNodes.length).toBe(1)
    expect(result.current.rootNodes[0].id).toBe('1')
  })

  it('handles expand/collapse', () => {
    const { result } = renderHook(() => useTreeState({ nodes: tree, initiallyExpanded: ['1'] }))
    expect(result.current.isExpanded('1')).toBe(true)
    act(() => result.current.toggleNode('1'))
    expect(result.current.isExpanded('1')).toBe(false)
    act(() => result.current.expandAll())
    expect(result.current.expandedIds.length).toBe(4)
    act(() => result.current.collapseAll())
    expect(result.current.expandedIds.length).toBe(0)
  })

  it('handles selection (single mode)', () => {
    const { result } = renderHook(() => useTreeState({ nodes: tree }))
    act(() => result.current.selectNode('2'))
    expect(result.current.selectedIds).toEqual(['2'])
    act(() => result.current.selectNode('3'))
    expect(result.current.selectedIds).toEqual(['3'])
    act(() => result.current.deselectNode('3'))
    expect(result.current.selectedIds).toEqual([])
    act(() => result.current.selectNode('4'))
    expect(result.current.isSelected('4')).toBe(true)
    act(() => result.current.clearSelection())
    expect(result.current.selectedIds).toEqual([])
  })

  it('handles multi-select mode', () => {
    const { result } = renderHook(() => useTreeState({ nodes: tree, selectionType: 'multi' }))
    act(() => result.current.selectNode('2'))
    act(() => result.current.selectNode('3'))
    expect(result.current.selectedIds).toEqual(['2', '3'])
    act(() => result.current.deselectNode('2'))
    expect(result.current.selectedIds).toEqual(['3'])
  })

  it('getNode and getChildren work', () => {
    const { result } = renderHook(() => useTreeState({ nodes: tree }))
    expect(result.current.getNode('3')?.data).toBe('child2')
    expect(result.current.getChildren('1').length).toBe(2)
    expect(result.current.getChildren('3').length).toBe(1)
    expect(result.current.getChildren('4').length).toBe(0)
  })
})
