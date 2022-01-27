import { z } from 'zod'
import { inlineSequenceOrString } from '../../../inlines'
import { tabsProps } from '../../Tabs/Tabs'
import { buttonProps } from '../../../inputs'
import { Card, CardProps } from '../Card'
import { ReactElement } from 'react'
import { propsElementUnion } from '../../../lib'

export const widgetProps = z.object({
  widget: tabsProps.omit({ tabVariant: true, tabListVariant: true }).merge(
    z.object({
      title: inlineSequenceOrString.optional(),
      abstract: inlineSequenceOrString.optional(),
      footerAction: buttonProps
        .omit({
          type: true,
          variant: true,
          iconOnly: true,
        })
        .optional(),
    })
  ),
})
export type WidgetProps = z.infer<typeof widgetProps>

const widgetFooterActionProps = {
  type: 'button' as 'button',
  variant: 'transparent' as 'transparent',
}

export const widgetCard = ({
  widget: { title, abstract, label, tabs, footerAction },
}: WidgetProps): CardProps => ({
  card: [
    ...(title ? [{ paragraph: title, level: 3 }] : []),
    ...(abstract ? [{ paragraph: abstract }] : []),
    ...(tabs ? (tabs.length > 1 ? [{ tabs, label }] : tabs[0].panel) : []),
    ...(footerAction
      ? [{ inputs: [{ ...footerAction, ...widgetFooterActionProps }] }]
      : []),
  ],
})

export const Widget = (props: WidgetProps) => <Card {...widgetCard(props)} />

function isWidgetProps(o: any): o is WidgetProps {
  return 'widget' in o
}

function isWidgetElement(
  o: any
): o is ReactElement<WidgetProps, typeof Widget> {
  return o?.type === Widget
}

export const widgetPropsOrElement = propsElementUnion<
  typeof widgetProps,
  typeof Widget
>(widgetProps)
export type WidgetPropsOrElement = z.infer<typeof widgetPropsOrElement>

export function renderIfWidget(o: any) {
  return isWidgetProps(o) ? <Widget {...o} /> : isWidgetElement(o) ? o : null
}
