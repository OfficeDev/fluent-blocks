import { ReactElement, useState } from 'react'
import uniqueId from 'lodash/uniqueId'
import { makeStyles, mergeClasses as cx } from '@fluentui/react-components'
import {
  TabsItemProps as NaturalTabsItemProps,
  TabsProps as NaturalTabsProps,
} from '@fluent-blocks/schemas'

import {
  EscapeElement,
  invalidTabPanelItem,
  rem,
  renderIfEscape,
  Sequence,
  sx,
  useCommonStyles,
} from '../../lib'

import { ButtonProps, Button } from '../../inputs'
import { FigurePropsOrElement, renderIfFigure } from '../Figure/Figure'
import { HeadingPropsOrElement, renderIfHeading } from '../Heading/Heading'
import {
  ParagraphPropsOrElement,
  renderIfParagraph,
} from '../Paragraph/Paragraph'
import {
  renderIfShortInputs,
  ShortInputsPropsOrElement,
} from '../ShortInputs/ShortInputs'
import {
  DescriptionListPropsOrElement,
  renderIfDescriptionList,
} from '../DescriptionList/DescriptionList'

export interface TabProps
  extends Omit<
    ButtonProps,
    | 'type'
    | 'actionId'
    | 'variant'
    | 'iconVariant'
    | 'onAction'
    | 'contextualVariant'
  > {}

export type TabPanelItemEntity =
  | HeadingPropsOrElement
  | ParagraphPropsOrElement
  | FigurePropsOrElement
  | ShortInputsPropsOrElement
  | DescriptionListPropsOrElement
  | EscapeElement

export type TabPanelItemSequence = TabPanelItemEntity[]

const TabPanelItem = (o: TabPanelItemEntity) =>
  renderIfHeading(o) ||
  renderIfParagraph(o) ||
  renderIfFigure(o) ||
  renderIfShortInputs(o) ||
  renderIfDescriptionList(o) ||
  renderIfEscape(o) ||
  invalidTabPanelItem(o)

export interface TabsItemProps
  extends Omit<NaturalTabsItemProps, 'tab' | 'panel'> {
  tab: TabProps
  panel: TabPanelItemSequence
}

export interface TabsProps extends Omit<NaturalTabsProps, 'tabs'> {
  tabs: TabsItemProps[]
  contextualVariant?: 'card' | 'block'
}

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
                type: 'action',
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

export type TabsElement = ReactElement<TabsProps, typeof Tabs>
export type TabsPropsOrElement = TabsProps | TabsElement

function isTabsProps(o: any): o is TabsProps {
  return 'tabs' in o
}

function isTabsElement(o: any): o is TabsElement {
  return o?.type === Tabs
}

export function renderIfTabs(o: any) {
  return isTabsProps(o) ? <Tabs {...o} /> : isTabsElement(o) ? o : null
}
