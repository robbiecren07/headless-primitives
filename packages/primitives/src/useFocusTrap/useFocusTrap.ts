import { useEffect, useRef } from 'react'
import type { UseFocusTrapOptions, UseFocusTrapReturn } from './types'

function getFocusableElements(container: HTMLElement | null): HTMLElement[] {
  if (!container) return []
  // Handles inputs, buttons, [tabindex], etc.
  return Array.from(
    container.querySelectorAll<HTMLElement>(
      'a[href], area[href], input:not([disabled]), select:not([disabled]), ' +
        'textarea:not([disabled]), button:not([disabled]), iframe, object, embed, ' +
        '[tabindex]:not([tabindex="-1"]), [contenteditable]'
    )
  ).filter((el) => !el.hasAttribute('disabled') && !el.getAttribute('aria-hidden'))
}

export function useFocusTrap<T extends HTMLElement = HTMLElement>({
  enabled = true,
  initialFocusRef,
  restoreFocus = true,
}: UseFocusTrapOptions = {}): UseFocusTrapReturn<T> {
  const containerRef = useRef<T>(null)
  const previousFocusedElement = useRef<HTMLElement | null>(null)

  useEffect(() => {
    if (!enabled) return

    const container = containerRef.current
    if (!container) return

    // Save current focus
    if (restoreFocus) previousFocusedElement.current = document.activeElement as HTMLElement

    // Focus initial element or first focusable
    let toFocus: HTMLElement | null =
      initialFocusRef?.current || getFocusableElements(container)[0] || null
    toFocus?.focus()

    // Handler to keep focus inside
    function onKeyDown(e: KeyboardEvent) {
      if (e.key !== 'Tab') return
      const focusables = getFocusableElements(container)
      if (focusables.length === 0) return
      const current = document.activeElement as HTMLElement
      let idx = focusables.indexOf(current)

      if (e.shiftKey) {
        // Backwards
        if (idx <= 0) {
          focusables[focusables.length - 1].focus()
          e.preventDefault()
        } else {
          focusables[idx - 1].focus()
          e.preventDefault()
        }
      } else {
        // Forwards
        if (idx === -1) {
          // Not in our list, focus the first one
          focusables[0].focus()
          e.preventDefault()
        } else if (idx === focusables.length - 1) {
          focusables[0].focus()
          e.preventDefault()
        } else {
          focusables[idx + 1].focus()
          e.preventDefault()
        }
      }
    }

    container.addEventListener('keydown', onKeyDown)

    return () => {
      container.removeEventListener('keydown', onKeyDown)
      // Restore previous focus
      if (restoreFocus && previousFocusedElement.current) {
        previousFocusedElement.current.focus()
      }
    }
  }, [enabled, initialFocusRef, restoreFocus])

  return { containerRef }
}
