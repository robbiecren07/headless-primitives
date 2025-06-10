```tsx
import { useHistoryTracker } from '@headless-primitives/react'

function Example() {
  const { current, push, back, forward, canBack, canForward, stack } = useHistoryTracker({ initial: 'a' })
  
  return (
    <div>
      <div>Current: {current}</div>
      <div>History: {stack.join(', ')}</div>
      <button onClick={() => push(String(Math.random()))}>Push</button>
      <button onClick={back} disabled={!canBack}>Back</button>
      <button onClick={forward} disabled={!canForward}>Forward</button>
    </div>
  )
}
```