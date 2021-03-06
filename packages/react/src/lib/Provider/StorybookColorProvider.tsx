import {
  cssGradientFromCurve,
  curvePathFromPalette,
} from '@fluent-blocks/colors'
import { Palette } from '@fluent-blocks/schemas'

import { Escape, defaultContext } from '..'
import { View } from '../..'
import iconSpriteUrl from '../storybookIconSpriteUrl'
import { defaultPaletteConfig, getFullLCHPalette } from '../theme'

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
    <View
      {...defaultContext}
      accentScheme={{ keyColor, lightCp, darkCp, hueTorsion }}
      themeName={themeName}
      iconSpriteUrl={iconSpriteUrl}
      main={{
        title: 'Color demonstration',
        blocks: [
          {
            inputs: [
              {
                button: {
                  actionId: 'primary',
                  variant: 'primary',
                  label: 'Primary',
                },
              },
              {
                button: {
                  actionId: 'outline',
                  variant: 'outline',
                  label: 'Outline',
                },
              },
              {
                button: {
                  actionId: 'subtle',
                  variant: 'subtle',
                  label: 'Subtle',
                },
              },
              {
                button: {
                  actionId: 'transparent',
                  variant: 'transparent',
                  label: 'Transparent',
                },
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
        ],
      }}
    />
  )
}
