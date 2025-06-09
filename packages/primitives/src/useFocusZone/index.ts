export { useFocusZone } from './useFocusZone'
export type { UseFocusZoneOptions } from './types'

/**
 * Example usage:
 * 
import { useFocusZone } from '@headless-primitives/react'

export default function ExampleFocusZone() {
  const { containerRef } = useFocusZone({ axis: 'vertical', loop: true })

  return (
    <div ref={containerRef} tabIndex={-1}>
      <button>Item 1</button>
      <button>Item 2</button>
      <button>Item 3</button>
    </div>
  )
}
 *
 */
