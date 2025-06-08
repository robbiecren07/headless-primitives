import { useEffect, useRef } from 'react'
import type { CommandItem } from './types'
import { useCommandPaletteContext } from './CommandPaletteProvider'

export function useCommandItem(item: CommandItem) {
  const { registerItem, unregisterItem } = useCommandPaletteContext()
  const itemRef = useRef(item)
  itemRef.current = item

  useEffect(() => {
    // Register with the latest version of the item/action
    registerItem(itemRef.current)
    return () => unregisterItem(item.id)
    // Only re-run if item.id changes!
  }, [item.id, registerItem, unregisterItem])
}
