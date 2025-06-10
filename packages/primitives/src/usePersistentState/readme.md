```tsx
import { usePersistentState } from '@headless-primitives/react'

function Counter() {
  const [count, setCount] = usePersistentState({ key: 'myCount', defaultValue: 0 })

  return (
    <button onClick={() => setCount((c) => c + 1)}>
      Count: {count}
    </button>
  )
}
```