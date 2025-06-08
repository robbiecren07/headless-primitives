export interface UseMultiSelectOptions<T> {
  items: T[]
  initialSelected?: T[] // For uncontrolled mode
  selectionLimit?: number
  allowEmpty?: boolean
  // Controlled mode:
  selected?: T[]
  onChange?: (selected: T[]) => void
}

export interface UseMultiSelectReturn<T> {
  selected: T[]
  isSelected: (item: T) => boolean
  select: (item: T) => void
  deselect: (item: T) => void
  toggle: (item: T) => void
  selectAll: () => void
  clear: () => void
  setSelected: (items: T[]) => void
  canSelectMore: boolean
}
