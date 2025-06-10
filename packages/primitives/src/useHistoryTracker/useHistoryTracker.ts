import { useState, useCallback } from 'react'
import type { UseHistoryTrackerOptions, UseHistoryTrackerReturn } from './types'

export function useHistoryTracker<T = any>(
  options: UseHistoryTrackerOptions<T> = {}
): UseHistoryTrackerReturn<T> {
  const { initial = null, maxLength = 100, onChange } = options
  const [stack, setStack] = useState<T[]>(initial !== null ? [initial] : [])
  const [index, setIndex] = useState(stack.length ? 0 : -1)

  const current = index >= 0 && index < stack.length ? stack[index] : null

  const push = useCallback(
    (entry: T) => {
      setStack((prev) => {
        const newStack = prev
          .slice(0, index + 1)
          .concat([entry])
          .slice(-maxLength)
        onChange?.(entry, newStack)
        return newStack
      })
      setIndex(() => {
        // if we pushed, index moves to new end
        const newLen = Math.min(stack.length, index + 1) + 1
        return newLen - 1
      })
    },
    [index, maxLength, onChange, stack.length]
  )

  const replace = useCallback(
    (entry: T) => {
      setStack((prev) => {
        const newStack = [...prev]
        if (index >= 0) {
          newStack[index] = entry
        } else {
          newStack.push(entry)
          setIndex(0)
        }
        onChange?.(entry, newStack)
        return newStack
      })
    },
    [index, onChange]
  )

  const back = useCallback(() => {
    setIndex((i) => (i > 0 ? i - 1 : i))
  }, [])

  const forward = useCallback(() => {
    setIndex((i) => (i < stack.length - 1 ? i + 1 : i))
  }, [stack.length])

  const canBack = index > 0
  const canForward = index < stack.length - 1

  const clear = useCallback(() => {
    setStack([])
    setIndex(-1)
    onChange?.(null, [])
  }, [onChange])

  return {
    current,
    back,
    forward,
    push,
    replace,
    canBack,
    canForward,
    stack,
    index,
    clear,
  }
}
