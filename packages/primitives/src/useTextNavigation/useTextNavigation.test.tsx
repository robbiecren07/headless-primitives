import { render, fireEvent } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { useTextNavigation } from './useTextNavigation'

function ListTest({ items }: { items: string[] }) {
  const { onKeyDown, focusedIndex } = useTextNavigation({ items })
  return (
    <ul tabIndex={0} onKeyDown={onKeyDown} data-testid="list">
      {items.map((item, i) => (
        <li key={item} data-testid={i === focusedIndex ? 'focused' : undefined}>
          {item}
        </li>
      ))}
    </ul>
  )
}

describe('useTextNavigation', () => {
  it('focuses items as you type matching text', () => {
    const items = ['Apple', 'Banana', 'Pear']
    const { getByTestId } = render(<ListTest items={items} />)
    const list = getByTestId('list')
    list.focus()
    fireEvent.keyDown(list, { key: 'b' })
    expect(getByTestId('focused')).toHaveTextContent('Banana')
    fireEvent.keyDown(list, { key: 'p' })
    expect(getByTestId('focused')).toHaveTextContent('Pear')
  })

  it('resets buffer after timeout', async () => {
    const items = ['Apple', 'Banana', 'Pear']
    const { getByTestId } = render(<ListTest items={items} />)
    const list = getByTestId('list')
    list.focus()
    fireEvent.keyDown(list, { key: 'b' })
    expect(getByTestId('focused')).toHaveTextContent('Banana')

    // Simulate delay (timeout is 500ms)
    await new Promise((res) => setTimeout(res, 600))
    fireEvent.keyDown(list, { key: 'p' })
    expect(getByTestId('focused')).toHaveTextContent('Pear')
  })
})
