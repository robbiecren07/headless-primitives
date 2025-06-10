```tsx
import { useSelectionZone } from '@headless-primitives/react'

const items = ['One', 'Two', 'Three', 'Four']

function Example() {
  const { selected, isSelected, onClick, onKeyDown } = useSelectionZone({ items, multiple: true })

  return (
    <div tabIndex={0} onKeyDown={onKeyDown}>
      {items.map((item, i) => (
        <button
          key={item}
          onClick={(e) => onClick(i, e)}
          data-selected={isSelected(i)}
        >
          {item}
        </button>
      ))}
      <div>Selected: {selected.join(', ')}</div>
    </div>
  )
}
```