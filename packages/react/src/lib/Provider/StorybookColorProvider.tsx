import {
  cssGradientFromCurve,
  curvePathFromPalette,
} from '@fluent-blocks/colors'
import { Palette } from '@fluent-blocks/schemas'

import { Escape, defaultContext } from '..'
import { Main } from '../../surfaces'
import fakeTitle from '../fakeTitle'
import iconSpriteUrl from '../storybookIconSpriteUrl'
import { defaultPaletteConfig, getFullLCHPalette } from '../theme'
import { FluentBlocksProvider } from './FluentBlocksProvider'

interface StorybookProviderProps
  extends Pick<Palette, 'lightCp' | 'darkCp' | 'hueTorsion'> {
  keyColor: string
  themeName: 'light' | 'dark'
}

export const StorybookColorProvider = ({
  keyColor,
  lightCp,
  darkCp,
  hueTorsion,
  themeName,
}: StorybookProviderProps) => {
  const curve = curvePathFromPalette(
    getFullLCHPalette({ keyColor, darkCp, lightCp, hueTorsion })
  )
  return (
    <FluentBlocksProvider
      {...defaultContext}
      accentScheme={{ keyColor, lightCp, darkCp, hueTorsion }}
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
          <Escape key="e1" contentMeetsAccessibilityAndDesignStandards>
            <div
              style={{
                height: '2rem',
                borderRadius: '.5rem',
                backgroundImage: cssGradientFromCurve(
                  curve,
                  defaultPaletteConfig.nShades,
                  defaultPaletteConfig.range,
                  defaultPaletteConfig.linearity
                ),
              }}
            />
          </Escape>,
        ]}
      />
    </FluentBlocksProvider>
  )
}
