import { IllustrationProps } from './Illustration'
import { AccentScheme, FluentBlocksProvider, ThemeName } from '../../lib'
import { Main } from '../../surfaces'

export const Illustration = ({
  themeName,
  accentScheme,
  iconSpriteUrl,
  ...props
}: IllustrationProps & {
  themeName: ThemeName
  accentScheme: AccentScheme
  iconSpriteUrl: string
}) => (
  <FluentBlocksProvider {...{ themeName, accentScheme, iconSpriteUrl }}>
    <Main
      blocks={[{ media: props, variant: 'narrow' }]}
      title={[{ text: ' ' }]}
    />
  </FluentBlocksProvider>
)
