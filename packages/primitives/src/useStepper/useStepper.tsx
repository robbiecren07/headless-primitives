import { useState, useCallback } from 'react'
import type { UseStepperOptions, UseStepperReturn } from './types'

/**
 * useStepper: manages multistep flows/wizards (step navigation, control, etc.)
 */
export function useStepper(options: UseStepperOptions): UseStepperReturn {
  const { steps, initialStep = 0, onStepChange } = options
  const [currentStep, setCurrentStep] = useState(initialStep)

  const goToStep = useCallback(
    (idx: number) => {
      if (idx < 0 || idx >= steps.length) return
      setCurrentStep(idx)
      if (onStepChange) onStepChange(idx)
    },
    [steps.length, onStepChange]
  )

  const next = useCallback(() => {
    goToStep(currentStep + 1)
  }, [goToStep, currentStep])

  const prev = useCallback(() => {
    goToStep(currentStep - 1)
  }, [goToStep, currentStep])

  const reset = useCallback(() => {
    setCurrentStep(initialStep)
    if (onStepChange) onStepChange(initialStep)
  }, [initialStep, onStepChange])

  return {
    steps,
    currentStep,
    goToStep,
    next,
    prev,
    isFirst: currentStep === 0,
    isLast: currentStep === steps.length - 1,
    reset,
  }
}
