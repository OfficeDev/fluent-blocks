import { PropsWithChildren } from 'react'

import { FluentProvider, makeStyles } from '@fluentui/react-components'

import { getTheme } from '../theme'
import {
  FluentBlocksContext,
  FluentPatternsBlocksData,
  defaultContext,
} from './FluentBlocksContext'

const useProviderStyles = makeStyles({
  root: {
    display: 'contents',
  },
})

export const FluentBlocksProvider = ({
  children,
  ...props
}: PropsWithChildren<Partial<Omit<FluentPatternsBlocksData, 'theme'>>>) => {
  const theme = getTheme(props.themeName, props.accentScheme)
  const providerStyles = useProviderStyles()
  const context: FluentPatternsBlocksData = {
    ...defaultContext,
    ...props,
    theme,
  }
  return (
    <FluentProvider
      {...{
        theme,
        targetDocument: typeof document === 'undefined' ? void 0 : document,
        dir: context.translations.dir,
        className: providerStyles.root,
      }}
    >
      <FluentBlocksContext.Provider value={context}>
        {children}
      </FluentBlocksContext.Provider>
    </FluentProvider>
  )
}
