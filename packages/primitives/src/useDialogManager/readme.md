```tsx
import { useDialogManager } from '@headless-primitives/react'

function DialogDemo() {
  const { dialogs, openDialog, closeDialog } = useDialogManager()

  return (
    <div>
      <button onClick={() => openDialog(<div>First dialog</div>)}>Open Dialog</button>
      {dialogs.map((dlg) => (
        <div key={dlg.id}>
          <div>{dlg.content}</div>
          <button onClick={() => closeDialog(dlg.id)}>Close</button>
        </div>
      ))}
    </div>
  )
}
```