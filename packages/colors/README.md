![Fluent Blocks logo](https://cdn.jsdelivr.net/gh/OfficeDev/fluent-blocks@next/packages/react/.storybook/public/brandImage.svg#gh-light-mode-only|width=320px)
![Fluent Blocks logo](https://cdn.jsdelivr.net/gh/OfficeDev/fluent-blocks@next/packages/react/.storybook/public/brandImageDark.svg#gh-dark-mode-only|width=320px)

# LAB curved color system tooling

This package exports functions that help generate sRGB color systems by drawing bézier curves through CIELAB color space.

This package is a direct successor to [thure/cielab-curved-palette](https://github.com/thure/cielab-curved-palette/), which has substantially better documentation, so go there if you want to read how this works in greater detail, but file issues here if you have any questions or encounter issues.

Unlike that project, this package has no dependencies, so `@fluent-blocks/colors` can be used anywhere TypeScript can transpile to.

## Usage

The most often used top-level function is `hexColorsFromPalette`. Fluent Blocks React uses it (generally) like so:

```ts
import { hexColorsFromPalette, hex_to_LCH } from '@fluent-blocks/colors'

const paletteConfig = {
  nShades: 16,
  range: [1.42, 83.57],
  linearity: 0.77,
}

const hexColors = hexColorsFromPalette(
  {
    keyColor: hex_to_LCH('#6264a7'),
    darkCp: 2 / 3,
    lightCp: 1 / 3,
    hueTorsion: 0,
  },
  paletteConfig.nShades,
  paletteConfig.range,
  paletteConfig.linearity
)

console.log('[hex colors]\n', hexColors)
```
