import { useRef, useCallback } from 'react'
import type { AnnounceOptions } from './types'

// Announce message using a hidden live region in the DOM
export function useAnnouncement() {
  const regionRef = useRef<HTMLDivElement | null>(null)

  // Always create the region on first use
  const ensureRegion = useCallback((politeness: 'polite' | 'assertive' = 'polite') => {
    if (!regionRef.current) {
      const region = document.createElement('div')
      region.setAttribute('aria-live', politeness)
      region.setAttribute('aria-atomic', 'true')
      region.setAttribute(
        'style',
        'position:absolute;overflow:hidden;clip:rect(0 0 0 0);height:1px;width:1px;margin:-1px;padding:0;border:0;white-space:pre;'
      )
      document.body.appendChild(region)
      regionRef.current = region
    } else {
      regionRef.current.setAttribute('aria-live', politeness)
    }
    return regionRef.current
  }, [])

  // Announce a message (optionally change politeness)
  const announce = useCallback(
    (message: string, options: AnnounceOptions = {}) => {
      const region = ensureRegion(options.politeness)
      // Clear and reset content for repeated messages
      region.textContent = ''
      // Small delay ensures repeated identical messages are re-announced
      setTimeout(() => {
        region.textContent = message
      }, 10)
    },
    [ensureRegion]
  )

  // Optionally: Clean up the region on unmount (rarely needed for simple apps)

  return announce
}
