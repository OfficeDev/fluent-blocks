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
import { sidebarWidth, topbarHeight } from '../../lib/surfaceDimensions'
import { SidebarState, WithActionHandler } from '../../props'
import {
  Main,
  Sidebar,
  SidebarInvoker,
  SidebarScrim,
  Topbar,
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
    overflowX: 'hidden',
    overflowY: 'hidden',
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
  'mainScrollContext--topGap': {
    '&:before': {
      content: '""',
      display: 'block',
      height: rem(topbarHeight),
    },
  },
})

export const ViewContent = ({
  main,
  sidebar,
  topbar,
}: {
  main: ViewProps['main']
  sidebar?: ViewProps['sidebar']
  topbar?: ViewProps['topbar']
}) => {
  const viewStyles = useViewStyles()
  const commonStyles = useCommonStyles()

  const [sidebarState, setSidebarState] = useState<SidebarState>(
    sidebar ? SidebarState.Hidden : SidebarState.Never
  )

  const $view = useRef<HTMLDivElement | null>(null)

  const onResize = useCallback(() => {
    setSidebarState(
      !sidebar
        ? SidebarState.Never
        : ($view.current?.clientWidth ?? 0) >= sidebarWidth * 3
        ? SidebarState.Docked
        : SidebarState.Hidden
    )
  }, [sidebar])

  useLayoutResize($view, onResize)

  const contextualViewState = { sidebarState, setSidebarState } // useMemo(()=>({sidebarState, setsidebarState}), [sidebarState, setsidebarState])

  return (
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
          (topbar ||
            sidebarState === SidebarState.Active ||
            sidebarState === SidebarState.Hidden) &&
            viewStyles['mainScrollContext--topGap']
        )}
      >
        <Main {...main} contextualVariant="view" />
      </div>
      {sidebar && <SidebarScrim contextualViewState={contextualViewState} />}
      {topbar ? (
        <Topbar {...topbar} {...{ contextualViewState }} />
      ) : sidebar ? (
        <SidebarInvoker {...{ contextualViewState }} />
      ) : null}
      {sidebar && <Sidebar {...sidebar} {...{ contextualViewState }} />}
    </div>
  )
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
}: ViewProps) => (
  <FluentBlocksProvider
    {...{
      themeName,
      accentScheme,
      translations,
      onAction,
      iconSpriteUrl,
    }}
  >
    <ViewContent {...{ main, sidebar, topbar }} />
  </FluentBlocksProvider>
)
