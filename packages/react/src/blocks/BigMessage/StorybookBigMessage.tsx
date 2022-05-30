import { ButtonActionPayload } from '../../inputs'
import { AccentScheme, FluentBlocksProvider, ThemeName } from '../../lib'
import { WithActionHandler } from '../../props'
import { Main } from '../../surfaces'
import { BigMessageProps } from './BigMessage'

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
