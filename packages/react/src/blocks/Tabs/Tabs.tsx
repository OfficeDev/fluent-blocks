import { z } from 'zod'
import { ReactElement, useState } from 'react'
import uniqueId from 'lodash/uniqueId'
import { makeStyles, mergeClasses as cx } from '@fluentui/react-components'
import {
  tabsItemProps as naturalTabsItemProps,
  tabsProps as naturalTabsProps,
} from '@fluentui/blocks-schemas'

import {
  escapeElement,
  invalidTabPanelItem,
  propsElementUnion,
  rem,
  renderIfEscape,
  Sequence,
  sx,
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
import {
  descriptionListPropsOrElement,
  renderIfDescriptionList,
} from '../DescriptionList/DescriptionList'

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
  descriptionListPropsOrElement,
  escapeElement,
])
export type TabPanelItemEntity = z.infer<typeof tabPanelItemEntity>

export const tabPanelItemSequence = z.array(tabPanelItemEntity)
export type TabPanelItemSequence = z.infer<typeof tabPanelItemSequence>

const TabPanelItem = (o: TabPanelItemEntity) =>
  renderIfHeading(o) ||
  renderIfParagraph(o) ||
  renderIfFigure(o) ||
  renderIfShortInputs(o) ||
  renderIfDescriptionList(o) ||
  renderIfEscape(o) ||
  invalidTabPanelItem(o)

export const tabsItemProps = naturalTabsItemProps.merge(
  z.object({
    tab: tabProps,
    panel: tabPanelItemSequence,
  })
)
export type TabsItemProps = z.infer<typeof tabsItemProps>

export const tabsProps = naturalTabsProps
  .merge(z.object({ tabs: z.array(tabsItemProps) }))
  .extend({
    contextualVariant: z
      .union([z.literal('card'), z.literal('block')])
      .default('block')
      .optional(),
  })
export type TabsProps = z.infer<typeof tabsProps>

const useTabsStyles = makeStyles({
  tabScrollCtx: {
    overflowX: 'hidden',
    overflowY: 'hidden',
  },
  tabList: {
    display: 'flex',
    ...sx.flexFlow('row', 'nowrap'),
    paddingBlockStart: rem(2),
    paddingBlockEnd: rem(2),
  },
  tabListCardContext: {
    marginInlineStart: '-.5rem',
    marginInlineEnd: '-.5rem',
  },
  tabListCenter: {
    justifyContent: 'center',
  },
  tabs: {
    flexGrow: 1,
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
  contextualVariant = 'block',
}: TabsProps) => {
  const [activeTab, setActiveTab] = useState(0)
  const itemIds = tabs.map(() => uniqueId('tabItem'))
  const tabsStyles = useTabsStyles()
  const commonStyles = useCommonStyles()
  return (
    <div aria-label={label} className={tabsStyles.tabs}>
      <div className={cx(commonStyles.centerBlock, tabsStyles.tabScrollCtx)}>
        <div
          role="tablist"
          className={cx(
            tabsStyles.tabList,
            tabListVariant === 'center' && tabsStyles.tabListCenter,
            contextualVariant === 'card' && tabsStyles.tabListCardContext
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
                size: contextualVariant === 'block' ? 'medium' : 'small',
                onAction: () => {
                  setActiveTab(t)
                },
              }}
            />
          ))}
        </div>
      </div>
      {tabs.map((tabItem, t) => (
        <div
          key={itemIds[t]}
          id={panelId(itemIds[t])}
          tabIndex={activeTab !== t ? -1 : 0}
          role="tabpanel"
          aria-labelledby={tabId(itemIds[t])}
          {...(activeTab !== t && { hidden: true })}
        >
          {Sequence<TabPanelItemEntity>(tabItem.panel, TabPanelItem, {
            contextualVariant: 'tabPanel',
          })}
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
