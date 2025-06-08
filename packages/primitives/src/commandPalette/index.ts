export { CommandPaletteProvider, useCommandPaletteContext } from './CommandPaletteProvider'
export { useCommandPalette } from './useCommandPalette'
export { useCommandItem } from './useCommandItem'
export type { CommandItem, CommandPaletteState, CommandPaletteContextValue } from './types'

/**
 * Example usage:
 * 
import {
  CommandPaletteProvider,
  useCommandPalette,
  useCommandItem,
} from '@headless-primitives/react';

function PaletteButton() {
  const { open } = useCommandPalette();
  return <button onClick={open}>Open Palette</button>;
}

function MyCommand() {
  useCommandItem({
    id: '1',
    label: 'Show Alert',
    action: () => alert('Alert!'),
    keywords: ['popup', 'notification']
  });
  return null;
}

function CommandPaletteUI() {
  const { state, setSearch, selectItem } = useCommandPalette();
  return state.open ? (
    <div>
      <input
        autoFocus
        value={state.search}
        onChange={e => setSearch(e.target.value)}
        placeholder="Type a command..."
      />
      <ul>
        {state.filtered.map((item) => (
          <li key={item.id}>
            <button onClick={() => selectItem(item.id)}>{item.label}</button>
          </li>
        ))}
      </ul>
    </div>
  ) : null;
}

function App() {
  return (
    <CommandPaletteProvider>
      <PaletteButton />
      <MyCommand />
      <CommandPaletteUI />
    </CommandPaletteProvider>
  );
}
 *
 */
