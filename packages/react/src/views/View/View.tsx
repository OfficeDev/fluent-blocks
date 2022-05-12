import { useState } from 'react'

import { ViewProps as NaturalViewProps } from '@fluent-blocks/schemas'
import { mergeClasses as cx, makeStyles } from '@fluentui/react-components'

import { SectionContentProps } from '../../blocks'
import {
  FluentBlocksProvider,
  defaultTranslations,
  rem,
  useCommonStyles,
} from '../../lib'
import { WithActionHandler } from '../../props'
import { Main, Sidebar, Topbar } from '../../surfaces'

export interface ViewProps
  extends Omit<NaturalViewProps, 'main'>,
    WithActionHandler<any> {
  main: SectionContentProps
  iconSpriteUrl?: string
}

const useViewStyles = makeStyles({
  root: {
    position: 'relative',
    height: '100%',
  },
  mainScrollContext: {
    height: '100%',
    overflowY: 'auto',
    overflowX: 'hidden',
    backgroundColor: 'var(--surface-background)',
    color: 'var(--surface-foreground)',
  },
  'mainScrollContext--sidebarActive': {
    marginInlineStart: rem(280),
  },
  'mainScrollContext--topbar': {
    '&:before': {
      content: '""',
      display: 'block',
      height: rem(48),
    },
  },
})

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
  const viewStyles = useViewStyles()
  const commonStyles = useCommonStyles()
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
      <div
        role="none"
        className={cx(viewStyles.root, commonStyles.baseSurface)}
      >
        <div
          role="none"
          className={cx(
            viewStyles.mainScrollContext,
            sidebar && viewStyles['mainScrollContext--sidebarActive'],
            topbar && viewStyles['mainScrollContext--topbar']
          )}
        >
          <Main {...main} />
        </div>
        {sidebar && <Sidebar {...sidebar} {...{ contextualViewState }} />}
        {topbar && <Topbar {...topbar} {...{ contextualViewState }} />}
      </div>
    </FluentBlocksProvider>
  )
}
