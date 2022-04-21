import uniqueId from 'lodash/uniqueId'
import { ReactElement, useState } from 'react'

import {
  TabsItemProps as NaturalTabsItemProps,
  TabsProps as NaturalTabsProps,
} from '@fluent-blocks/schemas'
import { makeStyles } from '@fluentui/react-components'
// todo: fix this import when it stabilizes
import { Tab, TabList } from '@fluentui/react-components/unstable'

import { ButtonProps } from '../../inputs'
import {
  EscapeElement,
  Sequence,
  invalidTabPanelItem,
  rem,
  renderIfEscape,
  sx,
} from '../../lib'
import {
  DescriptionListPropsOrElement,
  renderIfDescriptionList,
} from '../DescriptionList/DescriptionList'
import { FigurePropsOrElement, renderIfFigure } from '../Figure/Figure'
import { HeadingPropsOrElement, renderIfHeading } from '../Heading/Heading'
import {
  ParagraphPropsOrElement,
  renderIfParagraph,
} from '../Paragraph/Paragraph'
import {
  ShortInputsPropsOrElement,
  renderIfShortInputs,
} from '../ShortInputs/ShortInputs'

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
    marginInlineStart: '-.25rem',
    marginInlineEnd: '-.25rem',
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
}: TabsProps) => {
  const [activeTab, setActiveTab] = useState(0)
  const itemIds = tabs.map(() => uniqueId('tabItem'))
  const tabsStyles = useTabsStyles()
  return (
    <div aria-label={label} className={tabsStyles.tabs}>
      <TabList
        appearance={tabVariant}
        selectedValue={itemIds[activeTab]}
        size="small"
        onTabSelect={(_e, { value }) => {
          setActiveTab(itemIds.indexOf(value as string))
        }}
      >
        {tabs.map((tabItem, t) => (
          <Tab key={itemIds[t]} value={itemIds[t]} id={tabId(itemIds[t])}>
            {tabItem.tab.label}
          </Tab>
        ))}
      </TabList>
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
