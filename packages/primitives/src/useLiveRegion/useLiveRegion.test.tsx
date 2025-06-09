import { render } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { useLiveRegion } from './useLiveRegion'

function Example({
  message = 'Hello',
  politeness,
}: {
  message?: string
  politeness?: 'polite' | 'assertive'
}) {
  const LiveRegion = useLiveRegion()
  return <LiveRegion politeness={politeness}>{message}</LiveRegion>
}

describe('useLiveRegion', () => {
  it('renders an aria-live region with message', () => {
    const { getByText } = render(<Example message="Saved!" />)
    const el = getByText('Saved!')
    expect(el).toBeInTheDocument()
    expect(el).toHaveAttribute('aria-live', 'polite')
    // Main visually hidden style check
    expect(el).toHaveStyle({ clip: 'rect(0, 0, 0, 0)' })
  })

  it('supports assertive politeness', () => {
    const { getByText } = render(<Example message="Urgent!" politeness="assertive" />)
    const el = getByText('Urgent!')
    expect(el).toHaveAttribute('aria-live', 'assertive')
  })

  it('renders as a different element with "as"', () => {
    const LiveRegion = useLiveRegion()
    const { getByText } = render(<LiveRegion as="span">Info</LiveRegion>)
    const el = getByText('Info')
    expect(el.tagName).toBe('SPAN')
  })
})
