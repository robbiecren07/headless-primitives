import { render, fireEvent } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { useOverlayManager } from './useOverlayManager'

function OverlayTest({ onClose }: { onClose?: () => void }) {
  const {
    overlays,
    registerOverlay,
    unregisterOverlay,
    closeTopOverlay,
    isTopOverlay,
    clearOverlays,
  } = useOverlayManager()

  return (
    <div>
      <button onClick={() => registerOverlay({ id: 'overlay1', onClose })}>Open 1</button>
      <button onClick={() => registerOverlay({ id: 'overlay2' })}>Open 2</button>
      <button onClick={() => unregisterOverlay('overlay1')}>Close 1</button>
      <button onClick={closeTopOverlay}>Close Top</button>
      <button onClick={clearOverlays}>Clear</button>
      {overlays.map((ol) => (
        <div key={ol.id} data-testid={ol.id}>
          {ol.id}
          <span data-testid={ol.id + '_top'}>{isTopOverlay(ol.id) ? 'top' : 'not'}</span>
        </div>
      ))}
    </div>
  )
}

describe('useOverlayManager', () => {
  it('registers and unregisters overlays', () => {
    const { getByText, queryByTestId } = render(<OverlayTest />)
    fireEvent.click(getByText('Open 1'))
    expect(queryByTestId('overlay1')).toBeInTheDocument()
    fireEvent.click(getByText('Open 2'))
    expect(queryByTestId('overlay2')).toBeInTheDocument()
    expect(queryByTestId('overlay2_top')).toHaveTextContent('top')
    fireEvent.click(getByText('Close 1'))
    expect(queryByTestId('overlay1')).not.toBeInTheDocument()
    fireEvent.click(getByText('Close Top'))
    expect(queryByTestId('overlay2')).not.toBeInTheDocument()
  })

  it('calls onClose callback', () => {
    const spy = vi.fn()
    const { getByText } = render(<OverlayTest onClose={spy} />)
    fireEvent.click(getByText('Open 1'))
    fireEvent.click(getByText('Close 1'))
    expect(spy).toHaveBeenCalled()
  })

  it('clears all overlays', () => {
    const { getByText, queryByTestId } = render(<OverlayTest />)
    fireEvent.click(getByText('Open 1'))
    fireEvent.click(getByText('Open 2'))
    fireEvent.click(getByText('Clear'))
    expect(queryByTestId('overlay1')).not.toBeInTheDocument()
    expect(queryByTestId('overlay2')).not.toBeInTheDocument()
  })
})
