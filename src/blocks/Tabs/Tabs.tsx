import { z } from 'zod'
import uniqueId from 'lodash/uniqueId'
import { Button, buttonProps } from '../../inputs'
import { figurePropsOrElement } from '../Figure/Figure'
import { headingPropsOrElement } from '../Heading/Heading'
import { paragraphPropsOrElement } from '../Paragraph/Paragraph'
import { escapeElement, propsElementUnion, Sequence } from '../../lib'
import { ReactElement, useState } from 'react'
import { Block } from '../Block/Block'

export const tabProps = buttonProps.omit({
  type: true,
  actionId: true,
  variant: true,
  iconVariant: true,
  onAction: true,
  contextualVariant: true,
})

export const tabPanelItemEntity = z.union([
  figurePropsOrElement,
  headingPropsOrElement,
  paragraphPropsOrElement,
  escapeElement,
])
export type TabPanelItemEntity = z.infer<typeof tabPanelItemEntity>

export const tabPanelItemSequence = z.array(tabPanelItemEntity)

export const tabsItemProps = z.object({
  tab: tabProps,
  panel: tabPanelItemSequence,
})
export type TabsItemProps = z.infer<typeof tabsItemProps>

export const tabsProps = z.object({
  label: z.string(),
  tabs: z.array(tabsItemProps),
  variant: z.union([z.literal('subtle'), z.literal('transparent')]).optional(),
})
export type TabsProps = z.infer<typeof tabsProps>

function tabId(itemId: string) {
  return `${itemId}__tab`
}
function panelId(itemId: string) {
  return `${itemId}__panel`
}

export const Tabs = ({ tabs, label, variant }: TabsProps) => {
  const [activeTab, setActiveTab] = useState(0)
  const itemIds = tabs.map(() => uniqueId('tabItem'))
  return (
    <div aria-label={label}>
      <div role="tablist">
        {tabs.map((tabItem, t) => (
          <Button
            key={itemIds[t]}
            {...{
              ...tabItem.tab,
              type: 'button',
              actionId: tabId(itemIds[t]),
              variant,
              contextualVariant: 'tabs',
              selected: activeTab === t,
              controls: panelId(itemIds[t]),
            }}
          />
        ))}
      </div>
      {tabs.map((tabItem, t) => (
        <div
          key={itemIds[t]}
          id={panelId(itemIds[t])}
          tabIndex={0}
          role="tabpanel"
          aria-labelledby={tabId(itemIds[t])}
          {...(activeTab !== t && { hidden: true })}
        >
          {Sequence<TabPanelItemEntity>(tabItem.panel, Block)}
        </div>
      ))}
    </div>
  )
}

function isTabsProps(o: any): o is TabsProps {
  return 'tabs' in o
}

function isTabsElement(o: any): o is ReactElement<TabsProps, typeof Tabs> {
  return o?.type === Tabs
}

export const tabsPropsOrElement = propsElementUnion<
  typeof tabsProps,
  typeof Tabs
>(tabsProps)
export type TabsPropsOrElement = z.infer<typeof tabsPropsOrElement>

export function renderIfTabs(o: any) {
  return isTabsProps(o) ? <Tabs {...o} /> : isTabsElement(o) ? o : null
}
