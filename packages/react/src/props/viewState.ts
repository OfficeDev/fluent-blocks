import { Dispatch, SetStateAction } from 'react'

export interface ContextualViewStateProps {
  contextualViewState?: {
    sidebarActive?: boolean
    setSidebarActive?: Dispatch<SetStateAction<boolean>>
  }
}
