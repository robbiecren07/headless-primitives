export interface UseSelectionZoneOptions<T = any> {
  items: T[] // The items in the list/grid
  getId?: (item: T, idx: number) => string | number // If items are objects, use this to get unique id
  multiple?: boolean // Allow multi-select? (default: false)
  disabled?: boolean
  onChange?: (selected: (string | number)[]) => void
}

export interface UseSelectionZoneReturn {
  selected: (string | number)[]
  isSelected: (id: string | number) => boolean
  toggle: (id: string | number) => void
  selectOnly: (id: string | number) => void
  selectRange: (from: string | number, to: string | number) => void
  clear: () => void
  onKeyDown: (e: React.KeyboardEvent) => void
  onClick: (id: string | number, e: React.MouseEvent) => void
}
