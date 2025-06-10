import { useRef, useLayoutEffect, useMemo } from 'react'
import { createPortal } from 'react-dom'
import type { UsePortalOptions } from './types'

/**
 * Returns a function to render children into a portal.
 *
 * Example:
 *   const Portal = usePortal()
 *   return Portal(<div>Modal</div>)
 */
export function usePortal(options: UsePortalOptions = {}) {
  const { container, id } = options
  // Memoize the portal node for the lifetime of the hook
  const portalNode = useRef<HTMLElement | null>(null)

  useLayoutEffect(() => {
    if (portalNode.current) return

    const node = document.createElement('div')

    if (typeof id === 'string' && id) node.id = id
    ;(container ?? document.body).appendChild(node)

    portalNode.current = node

    return () => {
      if (portalNode.current && portalNode.current.parentNode) {
        portalNode.current.parentNode.removeChild(portalNode.current)
        portalNode.current = null
      }
    }
    // eslint-disable-next-line
  }, [container, id])

  // Return a function to portal children
  return useMemo(
    () => (children: React.ReactNode) =>
      portalNode.current ? createPortal(children, portalNode.current) : null,
    []
  )
}
