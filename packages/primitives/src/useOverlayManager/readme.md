```tsx
import { useOverlayManager } from '@headless-primitives/react'

function OverlayDemo() {
  const { overlays, registerOverlay, unregisterOverlay, closeTopOverlay } = useOverlayManager()

  return (
    <div>
      <button onClick={() => registerOverlay({ id: 'tooltip' })}>Show Tooltip</button>
      {overlays.map((ol) => (
        <div key={ol.id}>
          <div>{ol.id}</div>
          <button onClick={() => unregisterOverlay(ol.id)}>Close</button>
        </div>
      ))}
      <button onClick={closeTopOverlay}>Close Top</button>
    </div>
  )
}
```