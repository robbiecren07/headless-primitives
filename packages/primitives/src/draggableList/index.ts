export { useDraggableList } from './useDraggableList'
export type { UseDraggableListOptions, UseDraggableListReturn } from './types'

/**
 * Example usage:
 * 
import { useDraggableList } from '@headless-primitives/react';

const initial = [
  { id: 1, name: "First" },
  { id: 2, name: "Second" },
  { id: 3, name: "Third" },
];

function MyDraggableList() {
  const { items, handleDragStart, handleDragOver, handleDrop, draggingIndex, dragOverIndex } =
    useDraggableList({ items: initial });

  return (
    <ul>
      {items.map((item, i) => (
        <li
          key={item.id}
          draggable
          onDragStart={() => handleDragStart(i)}
          onDragOver={(e) => { e.preventDefault(); handleDragOver(i); }}
          onDrop={handleDrop}
          style={{
            opacity: draggingIndex === i ? 0.5 : 1,
            background: dragOverIndex === i ? '#eef' : 'white',
            cursor: 'grab'
          }}
        >
          {item.name}
        </li>
      ))}
    </ul>
  );
}
 *
 */
