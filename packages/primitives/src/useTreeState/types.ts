export interface TreeNode<T> {
  id: string
  parentId?: string
  data: T
  children?: TreeNode<T>[]
}

export interface UseTreeStateOptions<T> {
  nodes: TreeNode<T>[] // Flat or nested tree
  initiallyExpanded?: string[] // node IDs to expand by default
  selectionType?: 'single' | 'multi' // Select one or many nodes
}

export interface UseTreeStateReturn<T> {
  expandedIds: string[]
  toggleNode: (id: string) => void
  expandAll: () => void
  collapseAll: () => void
  isExpanded: (id: string) => boolean

  selectedIds: string[]
  selectNode: (id: string) => void
  deselectNode: (id: string) => void
  isSelected: (id: string) => boolean
  clearSelection: () => void

  getNode: (id: string) => TreeNode<T> | undefined
  getChildren: (id: string) => TreeNode<T>[]
  rootNodes: TreeNode<T>[]
}
