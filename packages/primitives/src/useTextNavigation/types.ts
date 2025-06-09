export interface UseTextNavigationOptions {
  items: string[] // List of all item labels (must match display order)
  onNavigate?: (index: number) => void // Callback when an item is navigated to
  timeout?: number // How long before buffer resets (ms)
  disabled?: boolean
}

export interface UseTextNavigationReturn {
  onKeyDown: (event: React.KeyboardEvent) => void
  focusedIndex: number
  setFocusedIndex: (idx: number) => void
}
