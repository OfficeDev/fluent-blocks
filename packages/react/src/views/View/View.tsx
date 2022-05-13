import { useCallback, useRef, useState } from 'react'

import { ViewProps as NaturalViewProps } from '@fluent-blocks/schemas'
import { mergeClasses as cx, makeStyles } from '@fluentui/react-components'

import { SectionContentProps } from '../../blocks'
import {
  FluentBlocksProvider,
  defaultTranslations,
  rem,
  useCommonStyles,
  useLayoutResize,
} from '../../lib'
import { SidebarState, WithActionHandler } from '../../props'
import {
  Main,
  Sidebar,
  Topbar,
  sidebarWidth,
  topbarHeight,
} from '../../surfaces'

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
  'mainScrollContext--sidebarDocked': {
    marginInlineStart: rem(sidebarWidth),
  },
  'mainScrollContext--topbar': {
    '&:before': {
      content: '""',
      display: 'block',
      height: rem(topbarHeight),
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
  const [sidebarState, setsidebarState] = useState<SidebarState>(
    sidebar ? SidebarState.Hidden : SidebarState.Never
  )
  const contextualViewState = { sidebarState, setsidebarState } // useMemo(()=>({sidebarState, setsidebarState}), [sidebarState, setsidebarState])
  const viewStyles = useViewStyles()
  const commonStyles = useCommonStyles()
  const $view = useRef<HTMLDivElement | null>(null)

  const onResize = useCallback(() => {
    setsidebarState(
      !sidebar
        ? SidebarState.Never
        : ($view.current?.clientWidth ?? 0) >= sidebarWidth * 3
        ? SidebarState.Docked
        : SidebarState.Hidden
    )
  }, [sidebar])

  useLayoutResize($view, onResize)

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
        ref={$view}
        className={cx(viewStyles.root, commonStyles.baseSurface)}
      >
        <div
          role="none"
          className={cx(
            viewStyles.mainScrollContext,
            sidebarState === SidebarState.Docked &&
              viewStyles['mainScrollContext--sidebarDocked'],
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
