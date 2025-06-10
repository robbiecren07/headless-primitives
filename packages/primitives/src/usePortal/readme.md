```tsx
import { usePortal } from '@headless-primitives/react'

function Modal({ open, onClose, children }) {
  const Portal = usePortal({ id: 'modal-root' })
  
  if (!open) return null

  return Portal(
    <div className="modal">
      <div className="backdrop" onClick={onClose} />
      <div className="content">{children}</div>
    </div>
  )
}
```