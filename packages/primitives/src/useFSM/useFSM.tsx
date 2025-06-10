import { useState, useCallback } from 'react'
import type { StateConfig, UseFSMReturn, StateValue } from './types'

/**
 * useFSM: Headless finite state machine primitive for flows, toggles, etc.
 * Example: useFSM({ initial: 'idle', states: { idle: { on: { SUBMIT: 'loading' } }, ... } })
 */
export function useFSM<TState extends StateValue = string, TEvent extends string = string>(
  config: StateConfig<TState, TEvent>
): UseFSMReturn<TState, TEvent> {
  const { initial, states } = config
  const [state, setState] = useState<TState>(initial)

  const transition = useCallback(
    (event: TEvent) => {
      const stateDef = states[state]
      const next = stateDef?.on?.[event]
      if (next) setState(next)
    },
    [states, state]
  )

  const can = useCallback(
    (event: TEvent) => {
      const stateDef = states[state]
      return Boolean(stateDef?.on?.[event])
    },
    [states, state]
  )

  const reset = useCallback(() => setState(initial), [initial])

  return { state, transition, can, reset }
}
