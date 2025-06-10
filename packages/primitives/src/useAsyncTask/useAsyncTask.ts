import { useRef, useState, useCallback, useEffect } from 'react'
import type { UseAsyncTaskOptions, UseAsyncTaskReturn } from './types'

export function useAsyncTask<TArgs extends any[] = any[], TResult = any>(
  options: UseAsyncTaskOptions<TArgs, TResult> & { autoArgs?: TArgs }
): UseAsyncTaskReturn<TArgs, TResult> {
  const { task, auto = false, autoArgs, onSuccess, onError, onSettled } = options
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<any>(null)
  const [result, setResult] = useState<TResult | null>(null)
  const [called, setCalled] = useState(false)
  const [cancelled, setCancelled] = useState(false)
  const cancelledRef = useRef(false)

  const run = useCallback(
    async (...args: TArgs) => {
      setLoading(true)
      setError(null)
      setCalled(true)
      setCancelled(false)
      cancelledRef.current = false

      try {
        const r = await task(...args)
        if (!cancelledRef.current) {
          setResult(r)
          setLoading(false)
          onSuccess?.(r)
        }
      } catch (err) {
        if (!cancelledRef.current) {
          setError(err)
          setLoading(false)
          onError?.(err)
        }
      } finally {
        if (!cancelledRef.current) {
          onSettled?.()
        }
      }
    },
    [task, onSuccess, onError, onSettled]
  )

  const cancel = useCallback(() => {
    setCancelled(true)
    cancelledRef.current = true
    setLoading(false)
    // If task supports AbortController, user must wire it up themselves
  }, [])

  const reset = useCallback(() => {
    setLoading(false)
    setError(null)
    setResult(null)
    setCalled(false)
    setCancelled(false)
    cancelledRef.current = false
  }, [])

  useEffect(() => {
    if (auto && autoArgs) run(...autoArgs)
    // eslint-disable-next-line
  }, [])

  return { run, cancel, reset, loading, error, result, called, cancelled }
}
