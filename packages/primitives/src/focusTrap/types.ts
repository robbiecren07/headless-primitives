export interface UseFocusTrapOptions {
  enabled?: boolean
  initialFocusRef?: React.RefObject<HTMLElement>
  restoreFocus?: boolean // Restore previous focus on unmount
}

export interface UseFocusTrapReturn {
  containerRef: React.RefObject<HTMLDivElement>
}
