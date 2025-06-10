import { render, fireEvent } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { useDialogManager } from './useDialogManager'

function DialogTest({ onClose }: { onClose?: () => void }) {
  const { dialogs, openDialog, closeDialog, closeTopDialog, isTopDialog, clearDialogs } =
    useDialogManager()

  return (
    <div>
      <button onClick={() => openDialog(<div>Dialog 1</div>, { id: 'dlg1', onClose })}>
        Open 1
      </button>
      <button onClick={() => openDialog(<div>Dialog 2</div>, { id: 'dlg2' })}>Open 2</button>
      <button onClick={() => closeDialog('dlg1')}>Close 1</button>
      <button onClick={closeTopDialog}>Close Top</button>
      <button onClick={clearDialogs}>Clear</button>
      {dialogs.map((dlg) => (
        <div key={dlg.id} data-testid={dlg.id}>
          {dlg.content}
          <span data-testid={dlg.id + '_top'}>{isTopDialog(dlg.id) ? 'top' : 'not'}</span>
        </div>
      ))}
    </div>
  )
}

describe('useDialogManager', () => {
  it('opens, closes, and stacks dialogs', () => {
    const { getByText, queryByTestId } = render(<DialogTest />)
    fireEvent.click(getByText('Open 1'))
    expect(queryByTestId('dlg1')).toBeInTheDocument()
    fireEvent.click(getByText('Open 2'))
    expect(queryByTestId('dlg2')).toBeInTheDocument()
    expect(queryByTestId('dlg2_top')).toHaveTextContent('top')
    fireEvent.click(getByText('Close 1'))
    expect(queryByTestId('dlg1')).not.toBeInTheDocument()
    fireEvent.click(getByText('Close Top'))
    expect(queryByTestId('dlg2')).not.toBeInTheDocument()
  })

  it('calls onClose callback', () => {
    const spy = vi.fn()
    const { getByText } = render(<DialogTest onClose={spy} />)
    fireEvent.click(getByText('Open 1'))
    fireEvent.click(getByText('Close 1'))
    expect(spy).toHaveBeenCalled()
  })

  it('clears all dialogs', () => {
    const { getByText, queryByTestId } = render(<DialogTest />)
    fireEvent.click(getByText('Open 1'))
    fireEvent.click(getByText('Open 2'))
    fireEvent.click(getByText('Clear'))
    expect(queryByTestId('dlg1')).not.toBeInTheDocument()
    expect(queryByTestId('dlg2')).not.toBeInTheDocument()
  })
})
