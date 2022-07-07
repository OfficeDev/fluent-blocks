![Fluent Blocks logo](https://cdn.jsdelivr.net/gh/OfficeDev/fluent-blocks@next/packages/react/.storybook/public/brandImage.svg#gh-light-mode-only|width=320px)
![Fluent Blocks logo](https://cdn.jsdelivr.net/gh/OfficeDev/fluent-blocks@next/packages/react/.storybook/public/brandImageDark.svg#gh-dark-mode-only|width=320px)

This package contains the TypeScript types that specify the platform-agnostic API surface for Fluent Blocks.

## Concepts

When it comes to props, all components* must have an eponymous prop which parent components can use to validate what they’re asked to render. For example, in the React package, the `Chart` component has a required `chart` prop, and since it's a kind of media it also has a required `label` prop.

*: There are exceptions, but we’ll revisit them.

## Defining platform-specific schemas

This package is intended to formalize the ontology that should remain true for all Fluent Blocks packages. Individual packages can extend these schemas to support situations unique to a particular platform, however the original types as specified here _must always be compatible_.

```tsx
import { ReactElement } from 'react'
import { TextProps as NaturalTextProps } from '@fluentui/blocks-schemas'

type ReactTextVariant = 'liquid' | 'animated'

// Here we extend the 'variant' prop to add aditional variants supported in this particular package:
export interface TextProps extends Omit<NaturalTextProps, 'variant'> {
  variant: NaturalTextProps['variant'] | ReactTextVariant
}

export const Text = (props: TextProps) => <span>{textMagicHere}</span>

// This particular package needs to work with additional derived types, which is also fine:
export type TextElement = ReactElement<TextProps, typeof Text>
export type TextPropsOrElement = TextProps | TextElement
```
