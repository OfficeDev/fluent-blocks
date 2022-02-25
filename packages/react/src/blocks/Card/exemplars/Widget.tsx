import { z } from 'zod'
import { ReactElement } from 'react'

import { inlineSequenceOrString } from '../../../inlines'
import { propsElementUnion } from '../../../lib'
import { buttonProps } from '../../../inputs'

import { tabsProps } from '../../Tabs/Tabs'
import { Card } from '../Card'
import { cardContextualVariants, CardProps } from '../card-properties'

export const widgetProps = z
  .object({
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
  .extend(cardContextualVariants)
export type WidgetProps = z.infer<typeof widgetProps>

const widgetFooterActionProps = {
  type: 'button' as 'button',
  variant: 'transparent' as 'transparent',
}

export const widgetCard = ({
  widget: { title, abstract, label, tabs, footerAction },
  contextualVariant,
}: WidgetProps): CardProps => ({
  card: [
    ...(title ? [{ paragraph: title, level: 3 }] : []),
    ...(abstract ? [{ paragraph: abstract }] : []),
    ...(tabs ? (tabs.length > 1 ? [{ tabs, label }] : tabs[0].panel) : []),
    ...(footerAction
      ? [{ inputs: [{ ...footerAction, ...widgetFooterActionProps }] }]
      : []),
  ],
  contextualVariant,
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
