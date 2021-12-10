import { z } from 'zod'
import { ReactElement, useState } from 'react'
import uniqueId from 'lodash/uniqueId'
import { makeStyles, mergeClasses as cx } from '@fluentui/react-components'

import {
  escapeElement,
  invalidTabPanelItem,
  propsElementUnion,
  renderIfEscape,
  Sequence,
  useCommonStyles,
} from '../../lib'

import { buttonProps, Button } from '../../inputs'
import { figurePropsOrElement, renderIfFigure } from '../Figure/Figure'
import { headingPropsOrElement, renderIfHeading } from '../Heading/Heading'
import {
  paragraphPropsOrElement,
  renderIfParagraph,
} from '../Paragraph/Paragraph'
import {
  renderIfShortInputs,
  shortInputsPropsOrElement,
} from '../ShortInputs/ShortInputs'

export const tabProps = buttonProps.omit({
  type: true,
  actionId: true,
  variant: true,
  iconVariant: true,
  onAction: true,
  contextualVariant: true,
})

export const tabPanelItemEntity = z.union([
  headingPropsOrElement,
  paragraphPropsOrElement,
  figurePropsOrElement,
  shortInputsPropsOrElement,
  escapeElement,
])
export type TabPanelItemEntity = z.infer<typeof tabPanelItemEntity>

export const tabPanelItemSequence = z.array(tabPanelItemEntity)

const TabPanelItem = (o: TabPanelItemEntity) =>
  renderIfHeading(o) ||
  renderIfParagraph(o) ||
  renderIfFigure(o) ||
  renderIfShortInputs(o) ||
  renderIfEscape(o) ||
  invalidTabPanelItem(o)

export const tabsItemProps = z.object({
  tab: tabProps,
  panel: tabPanelItemSequence,
})
export type TabsItemProps = z.infer<typeof tabsItemProps>

export const tabsProps = z.object({
  label: z.string(),
  tabs: z.array(tabsItemProps),
  tabVariant: z
    .union([z.literal('subtle'), z.literal('transparent')])
    .default('transparent')
    .optional(),
  tabListVariant: z
    .union([z.literal('start'), z.literal('center')])
    .default('start')
    .optional(),
})
export type TabsProps = z.infer<typeof tabsProps>

const useTabsStyles = makeStyles({
  tabScrollCtx: {
    overflowX: 'auto',
    overflowY: 'hidden',
  },
  tabList: {
    display: 'flex',
    flexFlow: 'row nowrap',
  },
  tabListCenter: {
    justifyContent: 'center',
  },
})

function tabId(itemId: string) {
  return `${itemId}__tab`
}
function panelId(itemId: string) {
  return `${itemId}__panel`
}

export const Tabs = ({
  tabs,
  label,
  tabVariant = 'transparent',
  tabListVariant = 'start',
}: TabsProps) => {
  const [activeTab, setActiveTab] = useState(0)
  const itemIds = tabs.map(() => uniqueId('tabItem'))
  const tabsStyles = useTabsStyles()
  const commonStyles = useCommonStyles()
  return (
    <div aria-label={label}>
      <div className={cx(commonStyles.centerBlock, tabsStyles.tabScrollCtx)}>
        <div
          role="tablist"
          className={cx(
            tabsStyles.tabList,
            tabListVariant === 'center' && tabsStyles.tabListCenter
          )}
        >
          {tabs.map((tabItem, t) => (
            <Button
              key={itemIds[t]}
              {...{
                ...tabItem.tab,
                type: 'button',
                actionId: tabId(itemIds[t]),
                variant: tabVariant,
                contextualVariant: 'tabs',
                selected: activeTab === t,
                controls: panelId(itemIds[t]),
              }}
            />
          ))}
        </div>
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
          {Sequence<TabPanelItemEntity>(tabItem.panel, TabPanelItem)}
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
