import { z } from 'zod'
import uniqueId from 'lodash/uniqueId'
import { Button, buttonProps } from '../../inputs'
import { figurePropsOrElement } from '../Figure/Figure'
import { headingPropsOrElement } from '../Heading/Heading'
import { paragraphPropsOrElement } from '../Paragraph/Paragraph'
import { escapeElement, Sequence } from '../../lib'
import { useState } from 'react'
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

export const Tabs = ({ tabs, label, variant }: TabsProps) => {
  const [activeTab, setActiveTab] = useState(0)
  const tabIds = tabs.map(() => uniqueId('tabItem'))
  return (
    <div aria-label={label}>
      <div role="tablist">
        {tabs.map((tabItem, t) => (
          <Button
            key={tabIds[t]}
            {...{
              ...tabItem.tab,
              type: 'button',
              actionId: `${tabIds[t]}__tab`,
              variant,
              contextualVariant: 'tabs',
              selected: activeTab === t,
              controls: `${tabIds[t]}__panel`,
            }}
          />
        ))}
      </div>
      {tabs.map((tabItem, t) => (
        <div
          key={tabIds[t]}
          id={`${tabIds[t]}__panel`}
          tabIndex={0}
          role="tabpanel"
          aria-labelledby={`${tabIds[t]}__tab`}
          {...(activeTab !== t && { hidden: true })}
        >
          {Sequence<TabPanelItemEntity>(tabItem.panel, Block)}
        </div>
      ))}
    </div>
  )
}
