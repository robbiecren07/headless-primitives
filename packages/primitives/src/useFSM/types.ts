export type StateValue = string | number | symbol

export type StateConfig<
  TState extends StateValue = string,
  TEvent extends string = string,
  TContext = unknown,
> = {
  initial: TState
  states: Record<
    TState,
    {
      on?: Partial<Record<TEvent, TState>>
      // Optionally add: onEntry, onExit, etc.
    }
  >
  context?: TContext
}

export interface UseFSMReturn<TState extends StateValue = string, TEvent extends string = string> {
  state: TState
  transition: (event: TEvent) => void
  can: (event: TEvent) => boolean
  reset: () => void
}
