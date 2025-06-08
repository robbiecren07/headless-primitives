## Notes

**State, App Logic, Data Flow**
- useFormState / FormProvider
  Composable form state (array fields, dirty tracking, validation), context-aware, SSR safe.

- useStepper
  For wizards, onboarding, quizzes, or FSM (finite state machine)-driven flows.

- useFSM / useStateMachine
  Generic state machine logic—great for stepper, toggles, modals, etc.

- useHistoryTracker
  Undo/redo and breadcrumb tracking for navigation and in-app actions.

- useAsyncTask / useAsyncResource
  Handle async functions with cancellation, loading, error, and suspense integration.

- useListState
  Handles selection, reordering, and virtualization for lists.

- useSelectionZone
  For building selectable grids, tables, multi-select with shift/cmd, or canvas regions.

**Accessibility & Input**

- useFocusTrap / FocusTrapProvider
  Traps keyboard navigation within a region (dialogs, modals, overlays).

- useFocusZone
  Arrow-key and tab-key navigation for menus, lists, grids.

- useAnnouncement / useLiveRegion
  For a11y live feedback (screen readers).

- useTextNavigation
  “Type to select” behavior for lists (like dropdowns in Slack/VSCode).

- useVisuallyHidden
  Hide content visually, keep it accessible to screen readers.

**UI Behaviors, Patterns**

- useCommandPalette / CommandPaletteProvider
  MacOS-style command/search palette—extensible, context-aware.

- useDragDrop / DraggableZoneProvider
  Abstracts drag sources, drop targets, sortable lists/grids, keyboard DnD.

- usePortal
  Render children into a different part of the DOM tree (modals, toasts).

- useResizeHandle
  For split panes, resizable containers.

- useMultiSelect
  Advanced selection logic for checklists, tables, tags, and more.

- useTreeState
  Tree structure state (expand/collapse, keyboard, drag/drop).

- useAutoAnimate
  Auto-animates elements on state change (expand/collapse, list reordering).

- useDialogManager
  Stackable dialogs/modals (handles nested modals, backdrops, esc).

**Device, Environment, Context**

- usePrefersReducedMotion
  Detect user system setting for reduced motion.

- useNetworkStatus
  Online/offline detection, reconnection logic.

- useBatteryStatus
  Exposes battery API info (charge, low-battery warnings).

- useGeolocation
  Device location, permissions, error handling.

- useDeviceType
  Detect mobile/tablet/desktop for responsive logic.

- useElementVisibility
  Is this element visible to the user? (IntersectionObserver + page focus).

- useAppTheme
  Pluggable dark/light/system mode, theming context.

**Data, Storage, Connectivity**

- useUndoableReducer
  Like useReducer, but with built-in undo/redo and history.

- useSessionSync
  Syncs state across browser tabs (localStorage + events).

- usePersistentState
  Pluggable storage: localStorage, session, cookies, indexedDB.

- useRemoteData / useQueryState
  Abstraction for fetching + caching remote data (can be plugged into React Query, SWR, TanStack Query).

**Plugins/Cross-cutting**

- useAnalyticsEvent
  Pluggable analytics events (works with your primitives).

- useErrorBoundary
  Error boundary as a hook or provider.

- useLogger
  App-wide logging context, optional devtools integration.

**Integration-Ready Primitives**

- useTableSelection
  For data grids, integrates with TanStack Table/React Table.

- useSortableList
  Reorderable lists, integrates with dnd-kit, dragula, etc.

- useKeyboardNavigation
  Add keyboard navigation to any Radix/shadcn/ui component.

- useOverlayManager
  Manages overlay stacking/context (popover, dropdown, modal).

**Experience Primitives (Delight & Power-User)**

- useSpotlightSearch
  Spotlight-like global search UI.

- useHistoryInspector
  “Devtools” for inspecting undo/redo/history stacks.

- useTour / useCoachMarks
  Guided tours with step management, keyboard nav, focus control.

- useNotifications
  Toasts/snackbar state & events, plug into portal.

- usePageTransition
  Page transitions, animated route changes, progress bar.

**Misc/Advanced**

- useWorkerizedState
  State offloaded to a Web Worker (for CPU-heavy calculations).

- useDeferredValue
  Like React’s, but can be integrated with Suspense, cache, etc.

- useI18n
  Plug-and-play context/provider for translations, RTL support.