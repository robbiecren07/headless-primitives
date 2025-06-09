import { useCallback, useMemo, useState } from 'react'
import type { TreeNode, UseTreeStateOptions, UseTreeStateReturn } from './types'

function flattenTree<T>(nodes: TreeNode<T>[], result: TreeNode<T>[] = []): TreeNode<T>[] {
  for (const node of nodes) {
    result.push(node)
    if (node.children) {
      flattenTree(node.children, result)
    }
  }
  return result
}

export function useTreeState<T>(options: UseTreeStateOptions<T>): UseTreeStateReturn<T> {
  const { nodes, initiallyExpanded = [], selectionType = 'single' } = options

  // Flatten tree for fast lookup
  const allNodes = useMemo(() => flattenTree(nodes), [nodes])
  const nodeMap = useMemo(
    () =>
      allNodes.reduce<Record<string, TreeNode<T>>>((acc, node) => {
        acc[node.id] = node
        return acc
      }, {}),
    [allNodes]
  )

  // Expanded state
  const [expandedIds, setExpandedIds] = useState<string[]>(initiallyExpanded)

  const isExpanded = useCallback((id: string) => expandedIds.includes(id), [expandedIds])
  const toggleNode = useCallback((id: string) => {
    setExpandedIds((ids) => (ids.includes(id) ? ids.filter((i) => i !== id) : [...ids, id]))
  }, [])
  const expandAll = useCallback(() => setExpandedIds(allNodes.map((n) => n.id)), [allNodes])
  const collapseAll = useCallback(() => setExpandedIds([]), [])

  // Selection state
  const [selectedIds, setSelectedIds] = useState<string[]>([])
  const isSelected = useCallback((id: string) => selectedIds.includes(id), [selectedIds])
  const selectNode = useCallback(
    (id: string) => {
      setSelectedIds((prev) =>
        selectionType === 'single' ? [id] : prev.includes(id) ? prev : [...prev, id]
      )
    },
    [selectionType]
  )
  const deselectNode = useCallback(
    (id: string) => setSelectedIds((prev) => prev.filter((i) => i !== id)),
    []
  )
  const clearSelection = useCallback(() => setSelectedIds([]), [])

  const getNode = useCallback((id: string) => nodeMap[id], [nodeMap])
  const getChildren = useCallback(
    (id: string) => allNodes.filter((n) => n.parentId === id),
    [allNodes]
  )
  const rootNodes = useMemo(() => allNodes.filter((n) => n.parentId == null), [allNodes])

  return {
    expandedIds,
    toggleNode,
    expandAll,
    collapseAll,
    isExpanded,

    selectedIds,
    selectNode,
    deselectNode,
    isSelected,
    clearSelection,

    getNode,
    getChildren,
    rootNodes,
  }
}
