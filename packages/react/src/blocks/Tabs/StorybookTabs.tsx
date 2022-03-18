import { TabsProps } from './Tabs'
import { AccentScheme, FluentBlocksProvider, ThemeName } from '../../lib'
import { Main } from '../../surfaces'

export const Tabs = ({
  themeName,
  accentScheme,
  basicSpriteUrl,
  ...props
}: TabsProps & {
  themeName: ThemeName
  accentScheme: AccentScheme
  basicSpriteUrl: string
}) => (
  <FluentBlocksProvider {...{ themeName, accentScheme, basicSpriteUrl }}>
    <Main title={[{ text: ' ' }]} blocks={[{ card: [props] }]} />
  </FluentBlocksProvider>
)
