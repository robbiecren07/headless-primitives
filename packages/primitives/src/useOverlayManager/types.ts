export interface OverlayDescriptor {
  id: string
  type?: string // e.g., 'modal', 'popover', etc.
  onClose?: () => void
}

export interface UseOverlayManagerReturn {
  overlays: OverlayDescriptor[]
  registerOverlay: (overlay: OverlayDescriptor) => void
  unregisterOverlay: (id: string) => void
  closeTopOverlay: () => void
  isTopOverlay: (id: string) => boolean
  clearOverlays: () => void
}
