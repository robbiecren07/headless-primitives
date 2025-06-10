import { render, fireEvent } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { useSelectionZone } from './useSelectionZone'

const items = ['A', 'B', 'C', 'D']

function TestComp({ multiple = false }: { multiple?: boolean }) {
  const { selected, isSelected, onClick, onKeyDown, clear } = useSelectionZone({ items, multiple })
  return (
    <div tabIndex={0} onKeyDown={onKeyDown} data-testid="zone">
      {items.map((item, idx) => (
        <button
          key={item}
          data-testid={item}
          data-selected={isSelected(idx)}
          onClick={(e) => onClick(idx, e)}
        >
          {item}
        </button>
      ))}
      <span data-testid="selected">{selected.join(',')}</span>
      <button onClick={clear}>Clear</button>
    </div>
  )
}

describe('useSelectionZone', () => {
  it('selects an item on click', () => {
    const { getByTestId } = render(<TestComp />)
    fireEvent.click(getByTestId('A'))
    expect(getByTestId('selected').textContent).toBe('0')
  })

  it('selects multiple with shift (mouse)', () => {
    const { getByTestId } = render(<TestComp multiple />)
    fireEvent.click(getByTestId('A'))
    fireEvent.click(getByTestId('D'), { shiftKey: true })
    expect(getByTestId('selected').textContent).toBe('0,1,2,3')
  })

  it('toggles selection with ctrl/cmd (mouse)', () => {
    const { getByTestId } = render(<TestComp multiple />)
    fireEvent.click(getByTestId('A'))
    fireEvent.click(getByTestId('B'), { ctrlKey: true })
    expect(getByTestId('selected').textContent).toBe('0,1')
  })

  it('arrow keys move selection', () => {
    const { getByTestId } = render(<TestComp />)
    const zone = getByTestId('zone')
    fireEvent.click(getByTestId('A'))
    fireEvent.keyDown(zone, { key: 'ArrowDown' })
    expect(getByTestId('selected').textContent).toBe('1')
    fireEvent.keyDown(zone, { key: 'ArrowUp' })
    expect(getByTestId('selected').textContent).toBe('0')
  })

  it('space toggles current', () => {
    const { getByTestId } = render(<TestComp />)
    const zone = getByTestId('zone')
    fireEvent.click(getByTestId('B'))
    fireEvent.keyDown(zone, { key: ' ' })
    expect(getByTestId('selected').textContent).toBe('')
  })

  it('clear clears all', () => {
    const { getByTestId } = render(<TestComp />)
    fireEvent.click(getByTestId('C'))
    fireEvent.click(getByTestId('D'))
    fireEvent.click(getByTestId('Clear'))
    expect(getByTestId('selected').textContent).toBe('')
  })
})
