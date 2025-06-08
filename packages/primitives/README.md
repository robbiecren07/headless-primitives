# @headless-primitives/react

Composable, headless React primitives for building accessible, powerful UI and app logic.  
Type-first, DX-focused, and built for real-world use—not just utils.

## Features

- **Composable:** Each primitive is modular, context-aware, and can be combined for powerful behavior.
- **TypeScript-first:** Fully typed, generic, and type-safe APIs.
- **Real-world ready:** Undo/redo, command palette, tree state, draggable lists, and more.
- **Headless:** No styles, UI-agnostic. Use with shadcn/ui, Radix, or your own components.
- **DX-driven:** Modern codebase, great error messages, SSR-safe.
- **Extendable:** Integrate with Radix, Zustand, Next.js App Router, and more.

## Primitives

- `useHotkeys` — Global/local hotkey management with context.
- `useUndoRedo` — Generic, type-safe undo/redo history.
- `useMultiSelect` — Multi-select state with controlled/uncontrolled support.
- `useTreeState` — Tree/outline/nested-list state (expand/collapse, selection, traversal).
- `useCommandPalette` — Context and hooks for building a VSCode-style command palette.
- `useDraggableList` — Reorderable/sortable lists, drag-and-drop logic (headless).
- `useResizeHandle` — Drag-to-resize handles for split panes, tables, modals.
- `useFocusTrap` — Keep keyboard focus inside containers (modals, drawers, overlays).

## Installation

```bash
pnpm add @headless-primitives/react
# or
npm install @headless-primitives/react
# or
yarn add @headless-primitives/react
```

## Docs

Coming soon!

## Contributing

Contributions, ideas, and issues welcome!
See CONTRIBUTING.md at the root level for setup and local dev instructions.