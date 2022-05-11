import { useState } from 'react'

import { ViewProps as NaturalViewProps } from '@fluent-blocks/schemas'

import { SectionContentProps } from '../../blocks'
import { FluentBlocksProvider, defaultTranslations } from '../../lib'
import { WithActionHandler } from '../../props'
import { Main, Sidebar, Topbar } from '../../surfaces'

export interface ViewProps
  extends Omit<NaturalViewProps, 'main'>,
    WithActionHandler<any> {
  main: SectionContentProps
  iconSpriteUrl?: string
}

/** An experience provided to the user via their device’s canvas. */
export const View = ({
  main,
  sidebar,
  topbar,
  themeName = 'light',
  accentScheme = 'web',
  translations = defaultTranslations,
  iconSpriteUrl,
  onAction,
}: ViewProps) => {
  const [sidebarActive, setSidebarActive] = useState(false)
  const contextualViewState = { sidebarActive, setSidebarActive } // useMemo(()=>({sidebarActive, setSidebarActive}), [sidebarActive, setSidebarActive])
  return (
    <FluentBlocksProvider
      {...{
        themeName,
        accentScheme,
        translations,
        onAction,
        iconSpriteUrl,
      }}
    >
      <Main {...main} contextualHasTopbar={!!topbar} />
      {sidebar && <Sidebar {...sidebar} {...{ contextualViewState }} />}
      {topbar && <Topbar {...topbar} {...{ contextualViewState }} />}
    </FluentBlocksProvider>
  )
}
