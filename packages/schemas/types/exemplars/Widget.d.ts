import { TabsProps } from '../blocks'
import { InlineSequenceOrString } from '../inlines'
import { ButtonProps } from '../inputs'

// Widget is an exemplar of Card.

interface Widget extends Omit<TabsProps, 'tabVariant' | 'tabListVariant'> {
  title: InlineSequenceOrString
  abstract?: InlineSequenceOrString
  footerAction?: Omit<ButtonProps, 'type' | 'variant' | 'iconOnly'>
}

export interface WidgetProps {
  widget: Widget
}
