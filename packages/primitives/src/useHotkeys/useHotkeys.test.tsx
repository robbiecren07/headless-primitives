import { describe, it, expect, vi } from 'vitest'
import { render, fireEvent } from '@testing-library/react'
import { HotkeysProvider, useHotkeys } from '.'

describe('useHotkeys', () => {
  it('calls handler when hotkey is pressed', () => {
    const handler = vi.fn()

    function TestComponent() {
      useHotkeys({
        keys: ['a'],
        handler,
      })
      return <div>Hotkey Test</div>
    }

    render(
      <HotkeysProvider>
        <TestComponent />
      </HotkeysProvider>
    )

    fireEvent.keyDown(window, { key: 'a' })
    expect(handler).toHaveBeenCalledTimes(1)
  })

  it('does not call handler if hotkey is disabled', () => {
    const handler = vi.fn()

    function TestComponent() {
      useHotkeys({
        keys: ['a'],
        handler,
        enabled: false,
      })
      return <div>Hotkey Test</div>
    }

    render(
      <HotkeysProvider>
        <TestComponent />
      </HotkeysProvider>
    )

    fireEvent.keyDown(window, { key: 'a' })
    expect(handler).not.toHaveBeenCalled()
  })

  it('calls handler only if modifier keys match', () => {
    const handler = vi.fn()

    function TestComponent() {
      useHotkeys({
        keys: ['k'],
        modifiers: ['meta'],
        handler,
      })
      return <div>Hotkey Test</div>
    }

    render(
      <HotkeysProvider>
        <TestComponent />
      </HotkeysProvider>
    )

    // Should NOT trigger without meta
    fireEvent.keyDown(window, { key: 'k' })
    expect(handler).not.toHaveBeenCalled()

    // Should trigger with meta
    fireEvent.keyDown(window, { key: 'k', metaKey: true })
    expect(handler).toHaveBeenCalledTimes(1)
  })
})
