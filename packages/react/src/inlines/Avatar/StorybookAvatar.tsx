import { MediaProps } from '@fluent-blocks/schemas'

import { AccentScheme, FluentBlocksProvider, ThemeName } from '../../lib'
import { Text } from '../Text/Text'
import { AvatarProps, Avatar as NaturalAvatar } from './Avatar'

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
    <Text text="Yesterday I chatted with " />
    <NaturalAvatar label={label} avatar={props} />
    <Text text=" about our plans for the next quarter." />
  </FluentBlocksProvider>
)
