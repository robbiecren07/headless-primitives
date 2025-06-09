import { useCommandPaletteContext } from './CommandPaletteProvider'

/**
 * useCommandPalette: Consume and interact with the command palette state and actions.
 */
export function useCommandPalette() {
  return useCommandPaletteContext()
}
