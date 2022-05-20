import { ButtonProps } from '../inputs'
import { DescriptionListProps } from './DescriptionList'
import { FigureProps } from './Figure'
import { HeadingProps } from './Heading'
import { ParagraphProps } from './Paragraph'
import { ShortInputsProps } from './ShortInputs'
import { TableProps } from './Table'

export type TabProps = Omit<
  ButtonProps['button'],
  'actionId' | 'variant' | 'iconVariant'
>

export type TabPanelItemEntity =
  | HeadingProps
  | ParagraphProps
  | FigureProps
  | ShortInputsProps
  | DescriptionListProps
  | TableProps

export type TabPanelItemSequence = TabPanelItemEntity[]

export interface TabsItemProps {
  tab: TabProps
  panel: TabPanelItemSequence
}

export interface TabsProps {
  label: string
  tabs: TabsItemProps[]
  tabVariant?: 'subtle' | 'transparent'
  tabListVariant?: 'start' | 'center'
}
