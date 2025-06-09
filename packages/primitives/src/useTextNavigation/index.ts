export { useTextNavigation } from './useTextNavigation'
export type { UseTextNavigationOptions, UseTextNavigationReturn } from './types'

/**
 * Example usage:
 * 
import { useTextNavigation } from '@headless-primitives/react'

const items = ['Apple', 'Banana', 'Pear']

function List() {
  const { onKeyDown, focusedIndex } = useTextNavigation({ items })
  return (
    <ul tabIndex={0} onKeyDown={onKeyDown}>
      {items.map((item, i) => (
        <li key={item} style={{ background: i === focusedIndex ? '#def' : undefined }}>
          {item}
        </li>
      ))}
    </ul>
  )
}
 */
