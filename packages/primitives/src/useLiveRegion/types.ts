export interface LiveRegionProps extends React.HTMLAttributes<HTMLElement> {
  as?: 'div' | 'span' // Only allow safe elements
  politeness?: 'polite' | 'assertive'
  children?: React.ReactNode
}
