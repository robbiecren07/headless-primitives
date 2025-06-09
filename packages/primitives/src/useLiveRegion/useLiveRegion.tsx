import type { LiveRegionProps } from './types'

/**
 * Renders a visually hidden ARIA live region for screen readers.
 * Use to provide persistent dynamic feedback (like status, validation, etc.)
 */
export function useLiveRegion() {
  return function LiveRegion({
    as: Component = 'div',
    politeness = 'polite',
    children,
    style,
    ...props
  }: LiveRegionProps) {
    return (
      <Component
        aria-live={politeness}
        aria-atomic="true"
        style={{
          position: 'absolute',
          overflow: 'hidden',
          clip: 'rect(0, 0, 0, 0)',
          height: 1,
          width: 1,
          margin: -1,
          padding: 0,
          border: 0,
          whiteSpace: 'pre',
          ...style,
        }}
        {...props}
      >
        {children}
      </Component>
    )
  }
}
