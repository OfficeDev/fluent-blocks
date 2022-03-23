import { ButtonProps } from '../inputs'
import { FigureProps } from './Figure'
import { HeadingProps } from './Heading'
import { ShortInputsProps } from './ShortInputs'
import { ParagraphProps } from './Paragraph'
import { DescriptionListProps } from './DescriptionList'

export type TabProps = Omit<ButtonProps, 'type' | 'actionId' | 'variant' | 'iconVariant'>

export type TabPanelItemEntity = HeadingProps | ParagraphProps | FigureProps | ShortInputsProps | DescriptionListProps

export type TabPanelItemSequence = TabPanelItemEntity[]

export interface TabsItemProps {
  tab: TabProps
  panel: TabPanelItemSequence
}

export interface TabsProps {
  label: string
  tabs: TabsItemProps[],
  tabVariant?: 'subtle' | 'transparent'
  tabListVariant?: 'start' | 'center'
}
