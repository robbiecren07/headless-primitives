export { useVisuallyHidden } from './useVisuallyHidden'
export type { VisuallyHiddenProps } from './types'

/**
 * Example usage:
 * 
import { useVisuallyHidden } from '@headless-primitives/react'

function Example() {
  const hiddenProps = useVisuallyHidden()
  return (
    <button>
      Submit
      <span {...hiddenProps}> (Press Enter to submit the form)</span>
    </button>
  )
}
 */
