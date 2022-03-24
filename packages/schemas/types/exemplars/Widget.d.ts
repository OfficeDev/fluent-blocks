import { TabsProps } from '../blocks'
import { ButtonProps } from '../inputs'
import { InlineSequenceOrString } from '../inlines'

// Widget is an exemplar of Card.

interface Widget extends Omit<TabsProps, 'tabVariant' | 'tabListVariant'> {
  title?: InlineSequenceOrString
  abstract?: InlineSequenceOrString
  footerAction?: Omit<ButtonProps, 'type' | 'variant' | 'iconOnly'>
}

export interface WidgetProps {
  widget: Widget
}
