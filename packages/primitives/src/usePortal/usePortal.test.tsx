import { render } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { usePortal } from './usePortal'

function PortalTest({ text = 'Hi!' }: { text?: string }) {
  const Portal = usePortal({ id: 'my-portal' })
  return Portal(<div data-testid="portal-content">{text}</div>)
}

describe('usePortal', () => {
  it('renders content into a portal node attached to document.body', () => {
    render(<PortalTest text="Portaled!" />)
    const el = document.querySelector('#my-portal')
    expect(el).toBeInTheDocument()
    expect(el?.textContent).toBe('Portaled!')
    expect(document.body.contains(el!)).toBe(true)
  })

  it('cleans up the portal node on unmount', () => {
    const { unmount } = render(<PortalTest />)
    const el = document.querySelector('#my-portal')
    expect(el).toBeInTheDocument()
    unmount()
    expect(document.querySelector('#my-portal')).not.toBeInTheDocument()
  })
})
