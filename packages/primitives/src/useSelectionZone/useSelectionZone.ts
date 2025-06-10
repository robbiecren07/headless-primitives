import { useState, useCallback, useRef } from 'react'
import type { UseSelectionZoneOptions, UseSelectionZoneReturn } from './types'

export function useSelectionZone<T = any>({
  items,
  getId = (_, i) => i,
  multiple = false,
  disabled = false,
  onChange,
}: UseSelectionZoneOptions<T>): UseSelectionZoneReturn {
  const [selected, setSelected] = useState<(string | number)[]>([])
  const lastSelectedRef = useRef<string | number | null>(null)

  const isSelected = useCallback((id: string | number) => selected.includes(id), [selected])

  const toggle = useCallback(
    (id: string | number) => {
      setSelected((prev) => {
        if (prev.includes(id)) {
          const next = prev.filter((x) => x !== id)
          onChange?.(next)
          return next
        } else {
          const next = multiple ? [...prev, id] : [id]
          onChange?.(next)
          return next
        }
      })
      lastSelectedRef.current = id
    },
    [multiple, onChange]
  )

  const selectOnly = useCallback(
    (id: string | number) => {
      setSelected([id])
      lastSelectedRef.current = id
      onChange?.([id])
    },
    [onChange]
  )

  const selectRange = useCallback(
    (from: string | number, to: string | number) => {
      const fromIdx = items.findIndex((item, idx) => getId(item, idx) === from)
      const toIdx = items.findIndex((item, idx) => getId(item, idx) === to)
      if (fromIdx === -1 || toIdx === -1) return
      const [start, end] = fromIdx < toIdx ? [fromIdx, toIdx] : [toIdx, fromIdx]
      const ids = items.slice(start, end + 1).map(getId)
      setSelected(ids)
      lastSelectedRef.current = to
      onChange?.(ids)
    },
    [items, getId, onChange]
  )

  const clear = useCallback(() => {
    setSelected([])
    onChange?.([])
    lastSelectedRef.current = null
  }, [onChange])

  const onKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (disabled) return
      if (!multiple && (e.shiftKey || e.metaKey || e.ctrlKey)) return
      if (!items.length) return
      // Arrow navigation and space to select
      const last = lastSelectedRef.current
      let idx = last ? items.findIndex((item, i) => getId(item, i) === last) : -1

      let nextIdx = idx
      if (e.key === 'ArrowDown') nextIdx = Math.min(idx + 1, items.length - 1)
      if (e.key === 'ArrowUp') nextIdx = Math.max(idx - 1, 0)
      if (nextIdx !== idx && nextIdx >= 0) {
        const nextId = getId(items[nextIdx], nextIdx)
        if (e.shiftKey && last != null) {
          selectRange(last, nextId)
        } else {
          selectOnly(nextId)
        }
        e.preventDefault()
      }
      if (e.key === ' ' && idx >= 0) {
        toggle(getId(items[idx], idx))
        e.preventDefault()
      }
    },
    [items, getId, toggle, selectOnly, selectRange, multiple, disabled]
  )

  const onClick = useCallback(
    (id: string | number, e: React.MouseEvent) => {
      if (disabled) return
      if (multiple && (e.shiftKey || e.metaKey || e.ctrlKey) && lastSelectedRef.current != null) {
        if (e.shiftKey) {
          selectRange(lastSelectedRef.current, id)
        } else {
          toggle(id)
        }
      } else {
        selectOnly(id)
      }
    },
    [multiple, selectOnly, toggle, selectRange, disabled]
  )

  return {
    selected,
    isSelected,
    toggle,
    selectOnly,
    selectRange,
    clear,
    onKeyDown,
    onClick,
  }
}
