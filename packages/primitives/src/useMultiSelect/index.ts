export { useMultiSelect } from './useMultiSelect'
export type { UseMultiSelectOptions, UseMultiSelectReturn } from './types'

/**
 * Example usage:
 *
// Controlled
const [selected, setSelected] = useState(['a']);
const multi = useMultiSelect({
  items: ['a', 'b'],
  selected,
  onChange: setSelected
});

import { useMultiSelect } from '@headless-primitives/react';

const options = ['a', 'b', 'c'];

function FrameworkSelector() {
  // Uncontrolled
  const multi = useMultiSelect({ items: options, initialSelected: ['a'] });

  return (
    <div>
      {options.map((opt) => (
        <label key={opt}>
          <input
            type="checkbox"
            checked={multi.isSelected(opt)}
            onChange={() => multi.toggle(opt)}
          />
          {opt}
        </label>
      ))}
      <button onClick={multi.selectAll}>Select All</button>
      <button onClick={multi.clear}>Clear</button>
    </div>
  );
}
 *
 */
