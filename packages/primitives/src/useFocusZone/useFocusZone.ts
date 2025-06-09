import { useRef, useCallback, useEffect, useState } from 'react'
import type { UseFocusZoneOptions, UseFocusZoneReturn } from './types'

export function useFocusZone<T extends HTMLElement = HTMLElement>(
  options: UseFocusZoneOptions = {}
): UseFocusZoneReturn<T> {
  const {
    loop = false,
    axis = 'both',
    disabled = false,
    selector = 'button, [tabindex]:not([tabindex="-1"])',
  } = options
  const containerRef = useRef<T>(null)
  const [focusIndex, setFocusIndex] = useState(0)

  const getItems = useCallback(() => {
    if (!containerRef.current) return []
    return Array.from(containerRef.current.querySelectorAll<HTMLElement>(selector)).filter(
      (el) => !el.hasAttribute('disabled') && !el.getAttribute('aria-hidden')
    )
  }, [selector])

  const focusItem = useCallback(
    (idx: number) => {
      const items = getItems()
      if (!items.length) return
      const clamped = loop
        ? ((idx % items.length) + items.length) % items.length
        : Math.max(0, Math.min(idx, items.length - 1))
      items[clamped].focus()
      setFocusIndex(clamped)
    },
    [getItems, loop]
  )

  useEffect(() => {
    if (disabled) return
    const container = containerRef.current
    if (!container) return

    function onKeyDown(e: KeyboardEvent) {
      const items = getItems()
      if (!items.length) return
      const current = document.activeElement
      const idx = items.indexOf(current as HTMLElement)
      let nextIdx = idx

      if (
        (axis === 'vertical' || axis === 'both') &&
        (e.key === 'ArrowDown' || e.key === 'ArrowUp')
      ) {
        e.preventDefault()
        if (e.key === 'ArrowDown') nextIdx = idx === -1 ? 0 : idx + 1
        if (e.key === 'ArrowUp') nextIdx = idx === -1 ? items.length - 1 : idx - 1
      }
      if (
        (axis === 'horizontal' || axis === 'both') &&
        (e.key === 'ArrowRight' || e.key === 'ArrowLeft')
      ) {
        e.preventDefault()
        if (e.key === 'ArrowRight') nextIdx = idx === -1 ? 0 : idx + 1
        if (e.key === 'ArrowLeft') nextIdx = idx === -1 ? items.length - 1 : idx - 1
      }

      focusItem(nextIdx)
    }

    container.addEventListener('keydown', onKeyDown)
    return () => container.removeEventListener('keydown', onKeyDown)
  }, [disabled, axis, focusItem, getItems])

  return { containerRef, focusIndex, setFocusIndex: focusItem }
}
