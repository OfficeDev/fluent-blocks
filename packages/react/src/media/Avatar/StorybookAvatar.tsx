import { Avatar as NaturalAvatar, AvatarProps } from './Avatar'
import { AccentScheme, FluentBlocksProvider, ThemeName } from '../../lib'
import { MediaProps } from '@fluent-blocks/schemas'

export const Avatar = ({
  themeName,
  accentScheme,
  iconSpriteUrl,
  label,
  ...props
}: AvatarProps['avatar'] &
  MediaProps & {
    themeName: ThemeName
    accentScheme: AccentScheme
    iconSpriteUrl: string
  }) => (
    <FluentBlocksProvider {...{ themeName, accentScheme, iconSpriteUrl }}>
      <NaturalAvatar label={label} avatar={props} />
    </FluentBlocksProvider>
  )
