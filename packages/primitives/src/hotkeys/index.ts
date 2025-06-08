export { HotkeysProvider, useHotkeysContext } from './HotkeysProvider'
export { useHotkeys } from './useHotkeys'
export type { HotkeyConfig, HotkeyAction, ModifierKey } from './types'

/**
 * Example usage:
 *
import { HotkeysProvider, useHotkeys } from '@headless-primitives/react';

function MyComponent() {
  useHotkeys({
    keys: ['k'],
    modifiers: ['meta'],
    description: 'Open command palette',
    handler: (e) => { openPalette() },
    enabled: isModalOpen,
  })

  return <div>Press ⌘+K to open the command palette.</div>;
}

// App root:
<HotkeysProvider>
  <MyComponent />
</HotkeysProvider>
 *
 */
