import React, { useState, useCallback, useEffect } from 'react'
import type { DialogDescriptor, UseDialogManagerReturn } from './types'

let _dialogId = 0
const nextId = () => `dialog_${++_dialogId}`

/**
 * Manages a stack of dialogs/modals, supports stacking/nesting, and esc-to-close.
 */
export function useDialogManager(): UseDialogManagerReturn {
  const [dialogs, setDialogs] = useState<DialogDescriptor[]>([])

  const openDialog = useCallback(
    (content: React.ReactNode, options?: { id?: string; onClose?: () => void }) => {
      const id = options?.id ?? nextId()
      setDialogs((d) => [...d, { id, content, onClose: options?.onClose }])
      return id
    },
    []
  )

  const closeDialog = useCallback((id: string) => {
    setDialogs((d) => {
      const dlg = d.find((dlg) => dlg.id === id)
      if (dlg && dlg.onClose) dlg.onClose()
      return d.filter((dlg) => dlg.id !== id)
    })
  }, [])

  const closeTopDialog = useCallback(() => {
    setDialogs((d) => {
      if (!d.length) return d
      const top = d[d.length - 1]
      if (top.onClose) top.onClose()
      return d.slice(0, -1)
    })
  }, [])

  const isTopDialog = useCallback(
    (id: string) => {
      return dialogs.length > 0 && dialogs[dialogs.length - 1].id === id
    },
    [dialogs]
  )

  const clearDialogs = useCallback(() => {
    setDialogs([])
  }, [])

  // Handle esc-to-close for top dialog
  useEffect(() => {
    if (!dialogs.length) return
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeTopDialog()
      }
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [dialogs, closeTopDialog])

  return {
    dialogs,
    openDialog,
    closeDialog,
    closeTopDialog,
    isTopDialog,
    clearDialogs,
  }
}
