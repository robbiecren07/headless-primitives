```tsx
import { useFSM } from '@headless-primitives/react'

const config = {
  initial: 'idle',
  states: {
    idle: { on: { SUBMIT: 'loading' } },
    loading: { on: { SUCCESS: 'success', FAIL: 'error' } },
    success: {},
    error: { on: { RETRY: 'loading' } },
  },
} as const

function Example() {
  const { state, transition, can, reset } = useFSM(config)

  return (
    <div>
      <div>Current state: {state}</div>
      <button onClick={() => transition('SUBMIT')} disabled={!can('SUBMIT')}>Submit</button>
      <button onClick={() => transition('SUCCESS')} disabled={!can('SUCCESS')}>Success</button>
      <button onClick={reset}>Reset</button>
    </div>
  )
}
```