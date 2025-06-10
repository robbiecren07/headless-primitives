import { useState, useCallback, useEffect } from 'react'
import type { OverlayDescriptor, UseOverlayManagerReturn } from './types'

/**
 * Manages a stack of overlays: modals, popovers, etc.
 */
export function useOverlayManager(): UseOverlayManagerReturn {
  const [overlays, setOverlays] = useState<OverlayDescriptor[]>([])

  const registerOverlay = useCallback((overlay: OverlayDescriptor) => {
    setOverlays((o) => [...o, overlay])
  }, [])

  const unregisterOverlay = useCallback((id: string) => {
    setOverlays((o) => o.filter((ol) => ol.id !== id))
  }, [])

  const closeTopOverlay = useCallback(() => {
    setOverlays((o) => {
      if (!o.length) return o
      const top = o[o.length - 1]
      if (top.onClose) top.onClose()
      return o.slice(0, -1)
    })
  }, [])

  const isTopOverlay = useCallback(
    (id: string) => overlays.length > 0 && overlays[overlays.length - 1].id === id,
    [overlays]
  )

  const clearOverlays = useCallback(() => setOverlays([]), [])

  // Optionally: handle ESC to close top overlay
  useEffect(() => {
    if (!overlays.length) return
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeTopOverlay()
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [overlays, closeTopOverlay])

  return {
    overlays,
    registerOverlay,
    unregisterOverlay,
    closeTopOverlay,
    isTopOverlay,
    clearOverlays,
  }
}
