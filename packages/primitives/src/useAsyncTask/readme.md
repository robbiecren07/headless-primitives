```tsx
import { useAsyncTask } from '@headless-primitives/react'

function Demo() {
  const { run, loading, result, error } = useAsyncTask({
    task: async (name: string) => {
      await new Promise(res => setTimeout(res, 300))
      if (name === 'fail') throw new Error('Oops!')
      return 'Hello, ' + name
    },
    auto: true, // default false
    autoArgs: ['test'], // must provide if auto is true and task expects args
  })

  return (
    <div>
      <button onClick={() => run('World')}>Run</button>
      {loading && <span>Loading...</span>}
      {result && <span>Result: {result}</span>}
      {error && <span>Error: {error.message}</span>}
    </div>
  )
}
```