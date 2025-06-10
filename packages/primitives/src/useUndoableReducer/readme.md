```tsx
import { useUndoableReducer } from '@headless-primitives/react'

type State = number
type Action = { type: 'inc' } | { type: 'dec' }

const reducer = (state: State, action: Action) => {
  if (action.type === 'inc') return state + 1
  if (action.type === 'dec') return state - 1
  return state
}

function Counter() {
  const { present, dispatch, undo, redo, canUndo, canRedo } = useUndoableReducer(reducer, 0)
  return (
    <div>
      <div>Value: {present}</div>
      <button onClick={() => dispatch({ type: 'inc' })}>+</button>
      <button onClick={() => dispatch({ type: 'dec' })}>-</button>
      <button onClick={undo} disabled={!canUndo}>Undo</button>
      <button onClick={redo} disabled={!canRedo}>Redo</button>
    </div>
  )
}
```