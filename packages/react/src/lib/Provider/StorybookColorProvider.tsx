import { defaultContext } from '..'
import { Main } from '../../surfaces'
import fakeTitle from '../fakeTitle'
import iconSpriteUrl from '../storybookIconSpriteUrl'
import { FluentBlocksProvider } from './FluentBlocksProvider'

interface StorybookProviderProps {
  keyColor: string
  themeName: 'light' | 'dark'
}

export const StorybookColorProvider = ({
  keyColor,
  themeName,
}: StorybookProviderProps) => (
  <FluentBlocksProvider
    {...defaultContext}
    accentScheme={{ keyColor }}
    themeName={themeName}
    iconSpriteUrl={iconSpriteUrl}
  >
    <Main
      title="Color demonstration"
      blocks={[
        {
          inputs: [
            {
              type: 'action',
              actionId: 'primary',
              variant: 'primary',
              label: 'Primary',
            },
            {
              type: 'action',
              actionId: 'outline',
              variant: 'outline',
              label: 'Outline',
            },
            {
              type: 'action',
              actionId: 'subtle',
              variant: 'subtle',
              label: 'Subtle',
            },
            {
              type: 'action',
              actionId: 'transparent',
              variant: 'transparent',
              label: 'Transparent',
            },
          ],
        },
      ]}
    />
  </FluentBlocksProvider>
)
