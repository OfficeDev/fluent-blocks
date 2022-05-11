import { SidebarProps as NaturalSidebarProps } from '@fluent-blocks/schemas'

import { ContextualViewStateProps } from '../../props'

export interface SidebarProps
  extends NaturalSidebarProps,
    ContextualViewStateProps {}

export const Sidebar = (props: SidebarProps) => <div />
