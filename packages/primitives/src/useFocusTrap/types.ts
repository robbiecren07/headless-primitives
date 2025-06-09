export interface UseFocusTrapOptions<T extends HTMLElement = HTMLElement> {
  enabled?: boolean
  initialFocusRef?: React.RefObject<T>
  restoreFocus?: boolean // Restore previous focus on unmount
}

export interface UseFocusTrapReturn<T extends HTMLElement = HTMLElement> {
  containerRef: React.RefObject<T>
}
