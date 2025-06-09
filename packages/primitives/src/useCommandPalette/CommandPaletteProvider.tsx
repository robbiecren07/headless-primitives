import React, { createContext, useContext, useMemo, useState, useCallback } from 'react'
import type { CommandItem, CommandPaletteContextValue } from './types'

const CommandPaletteContext = createContext<CommandPaletteContextValue | null>(null)

export function CommandPaletteProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CommandItem[]>([])
  const [open, setOpen] = useState(false)
  const [search, setSearch] = useState('')

  const registerItem = useCallback((item: CommandItem) => {
    setItems((prev) => [...prev, item])
  }, [])
  const unregisterItem = useCallback((id: string) => {
    setItems((prev) => prev.filter((i) => i.id !== id))
  }, [])

  const filtered = useMemo(() => {
    if (!search) return items
    const lower = search.toLowerCase()
    return items.filter(
      (item) =>
        item.label.toLowerCase().includes(lower) ||
        (item.keywords?.some((k) => k.toLowerCase().includes(lower)) ?? false)
    )
  }, [items, search])

  const value: CommandPaletteContextValue = {
    state: { open, search, filtered },
    items,
    registerItem,
    unregisterItem,
    setSearch,
    open: () => setOpen(true),
    close: () => setOpen(false),
    toggle: () => setOpen((v) => !v),
    selectItem: (id: string) => {
      const item = items.find((i) => i.id === id)
      if (item) item.action()
      setOpen(false)
    },
  }

  return <CommandPaletteContext.Provider value={value}>{children}</CommandPaletteContext.Provider>
}

export function useCommandPaletteContext() {
  const ctx = useContext(CommandPaletteContext)
  if (!ctx) throw new Error('useCommandPalette must be used within a CommandPaletteProvider')
  return ctx
}
