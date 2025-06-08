export interface UseResizeHandleOptions {
  initial: number // initial size (px or percent, up to you)
  min?: number
  max?: number
  axis?: 'x' | 'y' // horizontal or vertical
}

export interface UseResizeHandleReturn {
  size: number
  dragging: boolean
  handleProps: {
    onMouseDown: (e: React.MouseEvent) => void
    onTouchStart: (e: React.TouchEvent) => void
    tabIndex: number
    role: string
    'aria-valuenow': number
    'aria-valuemin'?: number
    'aria-valuemax'?: number
    'aria-orientation'?: 'horizontal' | 'vertical'
    style: React.CSSProperties
  }
  setSize: (n: number) => void
}
