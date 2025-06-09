import { describe, it, expect, beforeEach } from 'vitest'
import { render, act } from '@testing-library/react'
import { useAnnouncement } from './useAnnouncement'

function Announcer({ onAnnounce }: { onAnnounce: (announce: (msg: string) => void) => void }) {
  const announce = useAnnouncement()
  onAnnounce(announce)
  return null
}

describe('useAnnouncement', () => {
  let announceFn: (msg: string, opts?: any) => void
  beforeEach(() => {
    announceFn = undefined as any
    // Clean up region if left from last test
    const regions = document.querySelectorAll('[aria-live]')
    regions.forEach((r) => r.remove())
  })

  it('adds a polite live region and sets message', async () => {
    render(<Announcer onAnnounce={(fn) => (announceFn = fn)} />)
    expect(document.querySelector('[aria-live="polite"]')).toBeInTheDocument()
    act(() => announceFn('Hello'))
    // Wait a tick for setTimeout
    await new Promise((r) => setTimeout(r, 15))
    expect(document.querySelector('[aria-live="polite"]')).toHaveTextContent('Hello')
  })

  it('adds an assertive live region if requested', async () => {
    render(<Announcer onAnnounce={(fn) => (announceFn = fn)} />)
    act(() => announceFn('Urgent!', { politeness: 'assertive' }))
    await new Promise((r) => setTimeout(r, 15))
    expect(document.querySelector('[aria-live="assertive"]')).toHaveTextContent('Urgent!')
  })

  it('re-announces repeated messages', async () => {
    render(<Announcer onAnnounce={(fn) => (announceFn = fn)} />)
    act(() => announceFn('Again!'))
    await new Promise((r) => setTimeout(r, 15))
    act(() => announceFn('Again!'))
    await new Promise((r) => setTimeout(r, 15))
    expect(document.querySelector('[aria-live="polite"]')).toHaveTextContent('Again!')
  })
})
