export { useResizeHandle } from './useResizeHandle'
export type { UseResizeHandleOptions, UseResizeHandleReturn } from './types'

/**
 * Example usage:
 * 
import { useResizeHandle } from '@headless-primitives/react';

function ResizableSidebar() {
  const { size, handleProps } = useResizeHandle({
    initial: 300,
    min: 150,
    max: 600,
    axis: 'x'
  });

  return (
    <div style={{ display: 'flex', height: '300px', border: '1px solid #ddd' }}>
      <div style={{ width: size, background: '#f6f6f6' }}>
        Sidebar (width: {Math.round(size)}px)
      </div>
      <div
        {...handleProps}
        style={{
          ...handleProps.style,
          width: 6,
          background: '#ccc',
          cursor: 'col-resize'
        }}
      />
      <div style={{ flex: 1, padding: 16 }}>Main Content</div>
    </div>
  );
}
 *
 */
