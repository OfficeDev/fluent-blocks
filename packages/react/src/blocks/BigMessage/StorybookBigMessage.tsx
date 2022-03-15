import { BigMessageProps } from './BigMessage'
import {
  AccentScheme,
  ActionHandler,
  FluentBlocksProvider,
  ThemeName,
} from '../../lib'
import { Main } from '../../surfaces'

export const BigMessage = ({
  themeName,
  accentScheme,
  onAction,
  ...props
}: BigMessageProps['message'] & {
  themeName: ThemeName
  accentScheme: AccentScheme
  onAction: ActionHandler
}) => (
  <FluentBlocksProvider {...{ themeName, accentScheme, onAction }}>
    <Main
      blocks={[
        { message: { ...props, variant: 'big', viewportHeight: false } },
      ]}
      title={[{ text: ' ' }]}
    />
  </FluentBlocksProvider>
)
