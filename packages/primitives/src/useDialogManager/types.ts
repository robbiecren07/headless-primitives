export interface DialogDescriptor {
  id: string
  content: React.ReactNode
  onClose?: () => void
}

export interface DialogManagerState {
  dialogs: DialogDescriptor[]
}

export interface UseDialogManagerReturn {
  dialogs: DialogDescriptor[]
  openDialog: (content: React.ReactNode, options?: { id?: string; onClose?: () => void }) => string
  closeDialog: (id: string) => void
  closeTopDialog: () => void
  isTopDialog: (id: string) => boolean
  clearDialogs: () => void
}
