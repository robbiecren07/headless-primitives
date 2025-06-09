import type { VisuallyHiddenProps } from './types'

/**
 * Returns props to visually hide an element but keep it accessible to screen readers.
 */
export function useVisuallyHidden<T extends HTMLElement = HTMLElement>(
  props: VisuallyHiddenProps = {}
): React.HTMLAttributes<T> {
  return {
    ...props,
    style: {
      position: 'absolute',
      width: 1,
      height: 1,
      padding: 0,
      margin: -1,
      overflow: 'hidden',
      clip: 'rect(0, 0, 0, 0)',
      whiteSpace: 'nowrap',
      border: 0,
      ...(props.style || {}),
    },
  }
}
