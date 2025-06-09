export { useFocusTrap } from './useFocusTrap'
export type { UseFocusTrapOptions, UseFocusTrapReturn } from './types'

/**
 * Example usage:
 * 
import { useFocusTrap } from '@headless-primitives/react';

function Modal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { containerRef } = useFocusTrap({ enabled: open });

  if (!open) return null;

  return (
    <div
      ref={containerRef}
      tabIndex={-1}
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(0,0,0,0.3)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      <div style={{ background: 'white', padding: 32, borderRadius: 8 }}>
        <button autoFocus>First Focus</button>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
}
 *
 */
