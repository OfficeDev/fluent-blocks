import { Dispatch, SetStateAction } from 'react'

export enum SidebarState {
  Never,
  Hidden,
  Active,
  Docked,
}

export interface ContextualViewStateProps {
  contextualViewState?: {
    sidebarState?: SidebarState
    setSidebarState?: Dispatch<SetStateAction<SidebarState>>
  }
}
