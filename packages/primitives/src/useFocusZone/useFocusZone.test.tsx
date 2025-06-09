import { render, fireEvent } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { useFocusZone } from './useFocusZone'

type Axis = 'vertical' | 'horizontal' | 'both'

function ZoneTest({
  axis = 'both',
  loop = false,
  disabled = false,
}: {
  axis?: Axis
  loop?: boolean
  disabled?: boolean
}) {
  const { containerRef } = useFocusZone<HTMLDivElement>({ axis, loop, disabled })
  return (
    <div ref={containerRef} tabIndex={-1}>
      <button>one</button>
      <button>two</button>
      <button>three</button>
    </div>
  )
}

describe('useFocusZone', () => {
  it('moves focus down with arrow keys', () => {
    const { getByText, container } = render(<ZoneTest axis="vertical" />)
    const one = getByText('one')
    const two = getByText('two')
    const three = getByText('three')
    one.focus()
    expect(one).toHaveFocus()
    fireEvent.keyDown(container.firstChild as HTMLElement, { key: 'ArrowDown' })
    expect(two).toHaveFocus()
    fireEvent.keyDown(container.firstChild as HTMLElement, { key: 'ArrowDown' })
    expect(three).toHaveFocus()
    fireEvent.keyDown(container.firstChild as HTMLElement, { key: 'ArrowDown' })
    expect(three).toHaveFocus() // no loop, so stays
  })

  it('loops focus if enabled', () => {
    const { getByText, container } = render(<ZoneTest axis="vertical" loop />)
    const one = getByText('one')
    const three = getByText('three')
    three.focus()
    fireEvent.keyDown(container.firstChild as HTMLElement, { key: 'ArrowDown' })
    expect(one).toHaveFocus() // loops to first
  })

  it('ignores keys if disabled', () => {
    const { getByText, container } = render(<ZoneTest disabled />)
    const one = getByText('one')
    one.focus()
    fireEvent.keyDown(container.firstChild as HTMLElement, { key: 'ArrowDown' })
    expect(one).toHaveFocus()
  })
})
