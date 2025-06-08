export { useTreeState } from './useTreeState'
export type { TreeNode, UseTreeStateOptions, UseTreeStateReturn } from './types'

/**
 * Example usage:
 * 
import { useTreeState, TreeNode } from "@headless-primitives/react";

const data: TreeNode<string>[] = [
  { id: "1", data: "Root", children: [
    { id: "2", parentId: "1", data: "Child 1" },
    { id: "3", parentId: "1", data: "Child 2" }
  ]}
];

function FileTree() {
  const tree = useTreeState({ nodes: data, initiallyExpanded: ["1"], selectionType: "multi" });

  return (
    <ul>
      {tree.rootNodes.map((node) => (
        <TreeNodeComponent key={node.id} node={node} tree={tree} />
      ))}
    </ul>
  );
}

function TreeNodeComponent({ node, tree }: { node: TreeNode<string>, tree: ReturnType<typeof useTreeState<string>> }) {
  const children = tree.getChildren(node.id);
  return (
    <li>
      <button onClick={() => tree.toggleNode(node.id)}>
        {tree.isExpanded(node.id) ? "-" : "+"}
      </button>
      <input
        type="checkbox"
        checked={tree.isSelected(node.id)}
        onChange={() =>
          tree.isSelected(node.id)
            ? tree.deselectNode(node.id)
            : tree.selectNode(node.id)
        }
      />
      {node.data}
      {tree.isExpanded(node.id) && children.length > 0 && (
        <ul>
          {children.map((child) => (
            <TreeNodeComponent key={child.id} node={child} tree={tree} />
          ))}
        </ul>
      )}
    </li>
  );
}
 * 
 */
