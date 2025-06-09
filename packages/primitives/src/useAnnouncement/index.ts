export { useAnnouncement } from './useAnnouncement'
export type { AnnounceOptions } from './types'

/**
 * Example usage:
 * 
import { useAnnouncement } from '@headless-primitives/react'

function CopyButton() {
  const announce = useAnnouncement()
  return (
    <button
      onClick={() => {
        copyToClipboard('abc123')
        announce('Copied!')
      }}
    >
      Copy
    </button>
  )
}
 *
 */
