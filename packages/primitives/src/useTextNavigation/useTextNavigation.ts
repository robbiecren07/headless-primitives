import { useState, useRef, useCallback } from 'react'
import type { UseTextNavigationOptions, UseTextNavigationReturn } from './types'

/**
 * Enables "type to select" navigation in a list.
 * Example: useTextNavigation({ items: ['apple', 'banana', 'pear'], onNavigate: ... })
 */
export function useTextNavigation(options: UseTextNavigationOptions): UseTextNavigationReturn {
  const { items, onNavigate, timeout = 500, disabled = false } = options
  const [focusedIndex, setFocusedIndex] = useState(0)
  const buffer = useRef('')
  const lastTime = useRef(0)
  const resetTimeout = useRef<NodeJS.Timeout | null>(null)

  const onKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (disabled || !items.length) return
      const now = Date.now()
      const char = e.key.length === 1 ? e.key : ''
      if (!char.match(/^[\w\s]$/i)) return // letters/numbers/spaces

      // Reset buffer if timeout passed
      if (now - lastTime.current > timeout) {
        buffer.current = ''
      }
      lastTime.current = now

      buffer.current += char.toLowerCase()
      if (resetTimeout.current) clearTimeout(resetTimeout.current)
      resetTimeout.current = setTimeout(() => {
        buffer.current = ''
      }, timeout)

      // Find first matching item
      const matchIdx = items.findIndex((item) => item.toLowerCase().startsWith(buffer.current))
      if (matchIdx >= 0) {
        setFocusedIndex(matchIdx)
        if (onNavigate) onNavigate(matchIdx)
        e.preventDefault()
      }
    },
    [items, onNavigate, timeout, disabled]
  )

  return { onKeyDown, focusedIndex, setFocusedIndex }
}
