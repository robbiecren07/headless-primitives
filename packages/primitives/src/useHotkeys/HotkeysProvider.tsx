import React, { createContext, useContext, useEffect, useRef } from 'react'
import type { HotkeyConfig } from './types'

interface HotkeysContextValue {
  register: (config: HotkeyConfig) => void
  unregister: (config: HotkeyConfig) => void
}

const HotkeysContext = createContext<HotkeysContextValue | null>(null)

export const HotkeysProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const hotkeys = useRef<Set<HotkeyConfig>>(new Set())

  // Listen for global keydown events
  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      for (const hotkey of Array.from(hotkeys.current)) {
        if (hotkey.enabled === true) continue

        // Check modifiers
        const mods = hotkey.modifiers ?? []
        if (
          (mods.includes('alt') && !event.altKey) ||
          (mods.includes('ctrl') && !event.ctrlKey) ||
          (mods.includes('meta') && !event.metaKey) ||
          (mods.includes('shift') && !event.shiftKey)
        )
          continue

        // Check key(s)
        if (hotkey.keys.some((key) => event.key.toLowerCase() === key.toLowerCase())) {
          hotkey.handler(event)
        }
      }
    }

    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [])

  const value: HotkeysContextValue = {
    register: (config) => {
      hotkeys.current.add(config)
    },
    unregister: (config) => {
      hotkeys.current.delete(config)
    },
  }

  return <HotkeysContext.Provider value={value}>{children}</HotkeysContext.Provider>
}

export function useHotkeysContext() {
  const ctx = useContext(HotkeysContext)
  if (!ctx) throw new Error('useHotkeys must be used within a HotkeysProvider')
  return ctx
}
