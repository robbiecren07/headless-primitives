import { useEffect, useRef } from 'react'
import type { HotkeyConfig } from './types'
import { useHotkeysContext } from './HotkeysProvider'

// Memoize relevant config for stable registration
function getHotkeyDeps(config: HotkeyConfig) {
  return [
    config.enabled,
    config.keys.join(','),
    config.modifiers?.join(',') ?? '',
    config.handler,
    config.description ?? '',
    // Add other fields here if your HotkeyConfig expands
  ]
}

/**
 * Register a hotkey with the provider if enabled.
 * - Only registers when enabled.
 * - Unregisters automatically on cleanup or when config changes.
 */
export function useHotkeys(config: HotkeyConfig) {
  const { register, unregister } = useHotkeysContext()

  // Keep latest handler ref for stability if handler is unstable
  const handlerRef = useRef(config.handler)
  handlerRef.current = config.handler

  useEffect(() => {
    if (config.enabled === false) return
    // Register with a stable handler reference to avoid unnecessary re-registers
    const registration = { ...config, handler: (e: KeyboardEvent) => handlerRef.current(e) }
    register(registration)
    return () => unregister(registration)
    // Only re-run if config actually changes in a meaningful way
    // This avoids duplicate registration/unregistration if props are recreated but values are the same
  }, [register, unregister, ...getHotkeyDeps(config)])
}
