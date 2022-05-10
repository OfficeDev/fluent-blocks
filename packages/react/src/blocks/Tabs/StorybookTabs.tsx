import { TabsProps } from './Tabs'
import { AccentScheme, FluentBlocksProvider, ThemeName } from '../../lib'
import { Main } from '../../surfaces'

export const Tabs = ({
  themeName,
  accentScheme,
  iconSpriteUrl,
  ...props
}: TabsProps & {
  themeName: ThemeName
  accentScheme: AccentScheme
  iconSpriteUrl: string
}) => (
  <FluentBlocksProvider {...{ themeName, accentScheme, iconSpriteUrl }}>
    <Main title={[{ text: ' ' }]} blocks={[{ card: [props] }]} />
  </FluentBlocksProvider>
)
