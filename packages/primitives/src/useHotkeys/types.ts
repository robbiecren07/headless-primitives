export type ModifierKey = 'alt' | 'ctrl' | 'meta' | 'shift'

export interface HotkeyConfig {
  keys: string[] // Required: keys like ['k']
  handler: (e: KeyboardEvent) => void // Required: callback
  modifiers?: string[] // Optional: e.g. ['meta']
  description?: string // Optional: for docs/UX
  enabled?: boolean // Optional: default true
}

export type HotkeyAction = Omit<HotkeyConfig, 'handler'> & {
  id: string
}
