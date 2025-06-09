import { render, fireEvent } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { useFocusTrap } from './useFocusTrap'

function TrapTest({ enabled = true }: { enabled?: boolean }) {
  const { containerRef } = useFocusTrap<HTMLDivElement>({ enabled })
  return (
    <div ref={containerRef} tabIndex={-1}>
      <button>first</button>
      <button>second</button>
      <button>third</button>
    </div>
  )
}

describe('useFocusTrap', () => {
  it('traps tab focus inside container', () => {
    const { getByText, container } = render(<TrapTest />)
    const first = getByText('first')
    const second = getByText('second')
    const third = getByText('third')

    first.focus()
    expect(first).toHaveFocus()

    // Simulate Tab: first → second
    fireEvent.keyDown(container.firstChild as HTMLElement, { key: 'Tab' })
    expect(second).toHaveFocus()

    // Simulate Tab: second → third
    fireEvent.keyDown(container.firstChild as HTMLElement, { key: 'Tab' })
    expect(third).toHaveFocus()

    // Simulate Tab: third → first (wrap)
    fireEvent.keyDown(container.firstChild as HTMLElement, { key: 'Tab' })
    expect(first).toHaveFocus()
  })

  it('shifts backward with Shift+Tab', () => {
    const { getByText, container } = render(<TrapTest />)
    const first = getByText('first')
    const third = getByText('third')

    first.focus()
    fireEvent.keyDown(container.firstChild as HTMLElement, { key: 'Tab', shiftKey: true })
    expect(third).toHaveFocus()
  })

  it('does nothing when disabled', () => {
    const { getByText, container } = render(<TrapTest enabled={false} />)
    const first = getByText('first')
    const second = getByText('second')

    first.focus()
    fireEvent.keyDown(container.firstChild as HTMLElement, { key: 'Tab' })
    // Focus should NOT wrap, should still be on first (or next naturally)
    // In JSDOM, if nothing moves focus, still on first
    expect(first).toHaveFocus()
    // Optionally:
    expect(second).not.toHaveFocus()
  })
})
