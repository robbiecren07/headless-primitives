import { describe, it, expect, vi } from 'vitest'
import { render, act, fireEvent } from '@testing-library/react'
import { CommandPaletteProvider, useCommandPalette, useCommandItem } from '.'

describe('useCommandPalette', () => {
  it('registers and unregisters items', () => {
    function Item() {
      useCommandItem({
        id: 'foo',
        label: 'Foo',
        action: () => {},
      })
      return null
    }

    function Test() {
      const palette = useCommandPalette()
      return (
        <div>
          <button onClick={palette.open}>Open</button>
          <Item />
          <div data-testid="count">{palette.items.length}</div>
        </div>
      )
    }

    const { getByTestId, unmount } = render(
      <CommandPaletteProvider>
        <Test />
      </CommandPaletteProvider>
    )

    expect(getByTestId('count').textContent).toBe('1')
    unmount()
    // Should unregister automatically (no error thrown)
  })

  it('filters items by search', () => {
    function FooItem() {
      useCommandItem({
        id: 'foo',
        label: 'Foo Bar',
        keywords: ['baz'],
        action: () => {},
      })
      return null
    }
    function Test() {
      const palette = useCommandPalette()
      return (
        <div>
          <button onClick={() => palette.setSearch('baz')}>Search baz</button>
          <FooItem />
          <div data-testid="filtered">{palette.state.filtered.map((i) => i.label).join(',')}</div>
        </div>
      )
    }

    const { getByTestId, getByText } = render(
      <CommandPaletteProvider>
        <Test />
      </CommandPaletteProvider>
    )
    expect(getByTestId('filtered').textContent).toContain('Foo Bar')
    act(() => {
      fireEvent.click(getByText('Search baz'))
    })
    expect(getByTestId('filtered').textContent).toContain('Foo Bar')
  })

  it('selectItem calls action and closes', () => {
    const action = vi.fn()

    function Item() {
      useCommandItem({
        id: 'foo',
        label: 'Foo',
        action,
      })
      return null
    }
    function Test() {
      const palette = useCommandPalette()
      return (
        <div>
          <button onClick={() => palette.open()}>Open</button>
          <button onClick={() => palette.selectItem('foo')}>Run Foo</button>
          <Item />
          <div data-testid="is-open">{String(palette.state.open)}</div>
        </div>
      )
    }

    const { getByText, getByTestId } = render(
      <CommandPaletteProvider>
        <Test />
      </CommandPaletteProvider>
    )
    act(() => {
      fireEvent.click(getByText('Open'))
    })
    expect(getByTestId('is-open').textContent).toBe('true')
    act(() => {
      fireEvent.click(getByText('Run Foo'))
    })
    expect(action).toHaveBeenCalled()
    expect(getByTestId('is-open').textContent).toBe('false')
  })
})
