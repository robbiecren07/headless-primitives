export interface UseAsyncTaskOptions<TArgs extends any[] = any[], TResult = any> {
  task: (...args: TArgs) => Promise<TResult>
  auto?: boolean // Start on mount (default: false)
  onSuccess?: (result: TResult) => void
  onError?: (err: any) => void
  onSettled?: () => void
}

export interface UseAsyncTaskReturn<TArgs extends any[] = any[], TResult = any> {
  run: (...args: TArgs) => Promise<void>
  cancel: () => void
  reset: () => void
  loading: boolean
  error: any
  result: TResult | null
  called: boolean
  cancelled: boolean
}
