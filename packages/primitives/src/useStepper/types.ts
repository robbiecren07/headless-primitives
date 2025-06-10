export interface UseStepperOptions {
  steps: string[] // Step keys/labels/IDs
  initialStep?: number // Default: 0
  onStepChange?: (idx: number) => void
}

export interface UseStepperReturn {
  steps: string[]
  currentStep: number
  goToStep: (idx: number) => void
  next: () => void
  prev: () => void
  isFirst: boolean
  isLast: boolean
  reset: () => void
}
