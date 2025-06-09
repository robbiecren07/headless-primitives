export interface CommandItem {
  id: string
  label: string
  shortcut?: string // e.g. "⌘K"
  keywords?: string[]
  action: () => void
  group?: string // For grouping in UI
  icon?: React.ReactNode
}

export interface CommandPaletteState {
  open: boolean
  search: string
  filtered: CommandItem[]
}

export interface CommandPaletteContextValue {
  state: CommandPaletteState
  items: CommandItem[]
  registerItem: (item: CommandItem) => void
  unregisterItem: (id: string) => void
  setSearch: (search: string) => void
  open: () => void
  close: () => void
  toggle: () => void
  selectItem: (id: string) => void
}
