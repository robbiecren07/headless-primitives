export interface UseFocusZoneOptions {
  loop?: boolean // wrap focus at ends
  axis?: 'vertical' | 'horizontal' | 'both'
  disabled?: boolean
  selector?: string // CSS selector for focusable items, default: 'button, [tabindex]:not([tabindex="-1"])'
}

export interface UseFocusZoneReturn<T extends HTMLElement = HTMLElement> {
  containerRef: React.RefObject<T>
  focusIndex: number
  setFocusIndex: (idx: number) => void
}
