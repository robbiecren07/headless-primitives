```tsx
import { useStepper } from '@headless-primitives/react'

const steps = ['info', 'details', 'confirm']

function StepperDemo() {
  const { currentStep, steps, next, prev, isFirst, isLast, goToStep } = useStepper({ steps })

  return (
    <div>
      <div>Step {currentStep + 1}: {steps[currentStep]}</div>
      <button onClick={prev} disabled={isFirst}>Prev</button>
      <button onClick={next} disabled={isLast}>Next</button>
      <div>
        {steps.map((step, idx) => (
          <button key={step} onClick={() => goToStep(idx)}>{step}</button>
        ))}
      </div>
    </div>
  )
}
```