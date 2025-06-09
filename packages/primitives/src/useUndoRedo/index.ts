export { useUndoRedo } from './useUndoRedo'
export type { UndoRedoState, UseUndoRedoReturn } from './types'

/**
 * Example usage:
 * 
import { useUndoRedo } from '@headless-primitives/react';

function CounterWithUndo() {
  const { state, set, undo, redo, canUndo, canRedo, reset } = useUndoRedo(0);

  return (
    <div>
      <div>Value: {state.present}</div>
      <button onClick={() => set(state.present + 1)}>+1</button>
      <button onClick={() => set(state.present - 1)}>-1</button>
      <button onClick={undo} disabled={!canUndo}>Undo</button>
      <button onClick={redo} disabled={!canRedo}>Redo</button>
      <button onClick={() => reset(0)}>Reset</button>
    </div>
  );
}
 *
 */
