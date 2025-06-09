import { useCallback, useMemo, useState } from 'react'
import type { UseMultiSelectOptions, UseMultiSelectReturn } from './types'

export function useMultiSelect<T>(options: UseMultiSelectOptions<T>): UseMultiSelectReturn<T> {
  const {
    items,
    initialSelected = [],
    selectionLimit,
    allowEmpty = true,
    selected: controlledSelected,
    onChange,
  } = options

  const isControlled = controlledSelected !== undefined && onChange !== undefined

  // Internal state for uncontrolled mode
  const [uncontrolledSelected, setUncontrolledSelected] = useState<T[]>(initialSelected)

  // The selected items (controlled or uncontrolled)
  const selected = isControlled ? controlledSelected! : uncontrolledSelected

  // Helper: update selected items (calls onChange or sets state)
  const setSelected = useCallback(
    (next: T[]) => {
      if (isControlled) {
        onChange!(next)
      } else {
        setUncontrolledSelected(next)
      }
    },
    [isControlled, onChange]
  )

  const isSelected = useCallback((item: T) => selected.some((s) => Object.is(s, item)), [selected])

  const canSelectMore = selectionLimit === undefined || selected.length < selectionLimit

  const select = useCallback(
    (item: T) => {
      if (isSelected(item)) return
      if (!canSelectMore) return
      setSelected([...selected, item])
    },
    [isSelected, canSelectMore, setSelected, selected]
  )

  const deselect = useCallback(
    (item: T) => {
      setSelected(selected.filter((s) => !Object.is(s, item)))
    },
    [setSelected, selected]
  )

  const toggle = useCallback(
    (item: T) => {
      isSelected(item) ? deselect(item) : select(item)
    },
    [isSelected, select, deselect]
  )

  const selectAll = useCallback(() => {
    const all = selectionLimit !== undefined ? items.slice(0, selectionLimit) : items
    setSelected(all)
  }, [items, selectionLimit, setSelected])

  const clear = useCallback(() => {
    if (allowEmpty) {
      setSelected([])
    } else if (items.length > 0) {
      setSelected([items[0]])
    }
  }, [allowEmpty, items, setSelected])

  return useMemo(
    () => ({
      selected,
      isSelected,
      select,
      deselect,
      toggle,
      selectAll,
      clear,
      setSelected,
      canSelectMore,
    }),
    [selected, isSelected, select, deselect, toggle, selectAll, clear, setSelected, canSelectMore]
  )
}
