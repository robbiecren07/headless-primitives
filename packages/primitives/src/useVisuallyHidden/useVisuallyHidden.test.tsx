import type React from 'react'
import { render } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { useVisuallyHidden } from './useVisuallyHidden'

function HiddenText({ children }: { children: React.ReactNode }) {
  const props = useVisuallyHidden()
  return <span {...props}>{children}</span>
}

describe('useVisuallyHidden', () => {
  it('renders content that is hidden visually but present in the DOM', () => {
    const { getByText } = render(<HiddenText>Hidden message</HiddenText>)
    const el = getByText('Hidden message')
    expect(el).toBeInTheDocument()
    // Style checks (main ones)
    expect(el).toHaveStyle({ position: 'absolute' })
    expect(el).toHaveStyle({ overflow: 'hidden' })
    expect(el).toHaveStyle({ clip: 'rect(0, 0, 0, 0)' })
    expect(el).toHaveStyle({ whiteSpace: 'nowrap' })
  })
})
