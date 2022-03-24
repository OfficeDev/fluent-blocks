import { BigMessageProps } from './BigMessage'
import {
  AccentScheme,
  FluentBlocksProvider,
  ThemeName,
  WithActionHandler,
} from '../../lib'
import { Main } from '../../surfaces'
import { ButtonActionPayload } from '../../inputs'

export const BigMessage = ({
  themeName,
  accentScheme,
  onAction,
  iconSpriteUrl,
  ...props
}: BigMessageProps['message'] & {
  themeName: ThemeName
  accentScheme: AccentScheme
  iconSpriteUrl: string
} & WithActionHandler<ButtonActionPayload>) => (
  <FluentBlocksProvider
    {...{ themeName, accentScheme, onAction, iconSpriteUrl }}
  >
    <Main
      blocks={[
        { message: { ...props, variant: 'big', viewportHeight: false } },
      ]}
      title={[{ text: ' ' }]}
    />
  </FluentBlocksProvider>
)
