import { useState, useCallback } from 'react'
import type { UsePersistentStateOptions } from './types'

const isSSR = typeof window === 'undefined'

export function usePersistentState<T = any>(
  options: UsePersistentStateOptions<T>
): [T, (v: T | ((prev: T) => T)) => void] {
  const {
    key,
    defaultValue,
    storage = isSSR ? undefined : window.localStorage,
    serialize = JSON.stringify,
    deserialize = JSON.parse,
  } = options

  const getStoredValue = (): T => {
    if (!storage) return defaultValue
    try {
      const raw = storage.getItem(key)
      if (raw === null) return defaultValue
      return deserialize(raw)
    } catch {
      return defaultValue
    }
  }

  const [value, setValue] = useState<T>(getStoredValue)

  const set = useCallback(
    (v: T | ((prev: T) => T)) => {
      setValue((prev) => {
        const next = typeof v === 'function' ? (v as (prev: T) => T)(prev) : v
        try {
          storage?.setItem(key, serialize(next))
        } catch {}
        return next
      })
    },
    [key, storage, serialize]
  )

  return [value, set]
}
