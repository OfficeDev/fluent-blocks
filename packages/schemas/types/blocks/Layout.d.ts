import { CardProps } from './Card'

export type LayoutItemEntity = CardProps

export type LayoutVariant = 'grid' | 'flex'

export interface LayoutItemProps {
  item: LayoutItemEntity
  inlineSizeFactor?: 1 | 2
  blockSizeFactor?: 1 | 2
}

export interface LayoutProps {
  layout: {
    variant?: LayoutVariant
    items: LayoutItemProps[]
  }
}
