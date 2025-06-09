export interface UseDraggableListOptions<T> {
  items: T[]
  onChange?: (items: T[]) => void // Called when order changes (controlled mode)
}

export interface UseDraggableListReturn<T> {
  items: T[]
  move: (from: number, to: number) => void
  handleDragStart: (index: number) => void
  handleDragOver: (index: number) => void
  handleDrop: () => void
  draggingIndex: number | null
  dragOverIndex: number | null
}
