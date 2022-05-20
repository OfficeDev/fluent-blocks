import { ReactElement } from 'react'

import { WidgetProps as NaturalWidgetProps } from '@fluent-blocks/schemas'

import { InlineSequenceOrString } from '../../../inlines'
import { ButtonProps } from '../../../inputs'
import { CardProps } from '../../../props'
import { TabsProps } from '../../Tabs/Tabs'
import { Card } from '../Card'

export interface WidgetProps extends Omit<NaturalWidgetProps, 'widget'> {
  widget: Omit<
    NaturalWidgetProps['widget'],
    'title' | 'abstract' | 'footerAction' | 'tabs'
  > & {
    title: InlineSequenceOrString
    abstract?: InlineSequenceOrString
    footerAction?: Omit<ButtonProps, 'type' | 'variant' | 'iconOnly'>
    tabs: TabsProps['tabs']
  }
  contextualVariant?: CardProps['contextualVariant']
}

const widgetFooterActionProps = {
  variant: 'transparent' as 'transparent',
}

export const widgetCard = ({
  widget: { title, abstract, label, tabs, footerAction },
  contextualVariant,
}: WidgetProps): CardProps => ({
  card: {
    title,
    body: [
      ...(abstract ? [{ paragraph: abstract }] : []),
      ...(tabs ? (tabs.length > 1 ? [{ tabs, label }] : tabs[0].panel) : []),
      ...(footerAction
        ? [{ inputs: [{ ...footerAction, ...widgetFooterActionProps }] }]
        : []),
    ],
  },
  contextualVariant,
})

export const Widget = (props: WidgetProps) => <Card {...widgetCard(props)} />

export type WidgetElement = ReactElement<WidgetProps, typeof Widget>
export type WidgetPropsOrElement = WidgetProps | WidgetElement

function isWidgetProps(o: any): o is WidgetProps {
  return 'widget' in o
}

function isWidgetElement(o: any): o is WidgetElement {
  return o?.type === Widget
}

export function renderIfWidget(o: any) {
  return isWidgetProps(o) ? <Widget {...o} /> : isWidgetElement(o) ? o : null
}
