import { useCallback, useState } from 'react'
import type { UseDraggableListOptions, UseDraggableListReturn } from './types'

/**
 * Headless primitive for building draggable/reorderable lists.
 */
export function useDraggableList<T>({
  items: controlledItems,
  onChange,
}: UseDraggableListOptions<T>): UseDraggableListReturn<T> {
  const [uncontrolledItems, setUncontrolledItems] = useState<T[]>(controlledItems)

  // Always reflect latest items
  const items = onChange ? controlledItems : uncontrolledItems

  const [draggingIndex, setDraggingIndex] = useState<number | null>(null)
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null)

  // Helper to move by indices, using getId for stability
  const move = useCallback(
    (from: number, to: number) => {
      if (from === to || from < 0 || to < 0 || from >= items.length || to >= items.length) return

      const updated = [...items]
      const [removed] = updated.splice(from, 1)
      updated.splice(to, 0, removed)
      if (onChange) {
        onChange(updated)
      } else {
        setUncontrolledItems(updated)
      }
    },
    [items, onChange]
  )

  const handleDragStart = useCallback((index: number) => {
    setDraggingIndex(index)
    setDragOverIndex(index)
  }, [])

  const handleDragOver = useCallback((index: number) => {
    setDragOverIndex(index)
  }, [])

  const handleDrop = useCallback(() => {
    if (draggingIndex !== null && dragOverIndex !== null && draggingIndex !== dragOverIndex) {
      move(draggingIndex, dragOverIndex)
    }
    setDraggingIndex(null)
    setDragOverIndex(null)
  }, [draggingIndex, dragOverIndex, move])

  return {
    items,
    move,
    handleDragStart,
    handleDragOver,
    handleDrop,
    draggingIndex,
    dragOverIndex,
  }
}
