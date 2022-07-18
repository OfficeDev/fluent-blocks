<img alt="Fluent Blocks logo" src="https://cdn.jsdelivr.net/gh/OfficeDev/fluent-blocks@next/packages/react/.storybook/public/brandImage.svg#gh-light-mode-only" width="320" />
<img alt="Fluent Blocks logo" src="https://cdn.jsdelivr.net/gh/OfficeDev/fluent-blocks@next/packages/react/.storybook/public/brandImageDark.svg#gh-dark-mode-only" width="320" />

### [Open Storybook ↗︎][storybook]

Fluent Blocks is a React implementation of [Fluent][figma-fluent] & [UI Kit][figma-uikit] designs for app development based on [`@fluentui/react-components`][fluentui-v9]. This project succeeds [`@fluentui/react-teams`][react-teams].

This package provides a set of components developers can use to build fully interactive & accessible experiences using whatever React coding convention they prefer, rendering experiences that match Fluent & UI Kit designs.

## ⚠️ Not yet recommended for production

This project is still being vetted. If you want to use Fluent Blocks, please bear in mind even non-prereleases don’t yet come with any particular guarantees.

For the best experience specify a specific version of Fluent Blocks when installing instead of using `~`/`^`/`*`, tags, or ranges. If you encounter issues or when you want to use new features, migrate to a newer version with care.

## Getting help & contributing

If you encounter issues, have questions, or want to participate, please don’t hesitate to [write an issue on Github][issues]. You can also [join us on Teams in our community channel][channel].

If you’d like to run the development environment or contribute to this project, please see [the Contributing file](CONTRIBUTING.md).

## Getting started

Using TypeScript and an IDE that supports type inspections will make using this project much easier!

1. Add `react@17`, `react-dom@17` if they’re not in your project already
    - Versions of React from `^16.14.0` up to `18` are supported, in case your project already uses a version in that range
3. Depending on your bundler you may need to add `chart.js@^2.9.4`, which you’ll need anyway if you want to use charts from this package
5. Install this package and the icons sprite **with `--save-exact`** using your package manager:
   - NPM: `npm install --save --save-exact @fluent-blocks/react @fluent-blocks/basic-icons`
   - Yarn: `yarn add --exact @fluent-blocks/react @fluent-blocks/basic-icons`
   - PNPM: `pnpm add --save-exact @fluent-blocks/react @fluent-blocks/basic-icons`

Fluent Blocks comes with `@fluentui/react-components@~9.1.1` as a dependency — if you anticipate wanting to use components from that library in your project alongside Fluent Blocks, you should also add it as a direct dependency.

Now anywhere you can use React, you can use Fluent Blocks. If you want to delegate the entire viewport to Fluent Blocks, use the `View` component on its own:

```tsx
import { View, Escape } from '@fluent-blocks/react';
import basicIcons from '@fluent-blocks/basic-icons/basic-icons.svg';
import { render } from 'react-dom'

render(
  <View accentScheme='teams' iconSpriteUrl={basicIcons} main={{
    title: 'Hello, world.',
    blocks: [
      {
        message: {
          title: 'Let’s do this thing…',
          variant: 'big',
          media: {illustration: 'hello', label: 'Hello'},
          viewportHeight: false,
          actions: {
            primary: <Escape contentMeetsAccessibilityAndDesignStandards>
              <span>…for real this time.</span>
            </Escape>,
            secondary: {
              actionId: 'start',
              label: 'Get started',
              icon: 'arrow_right',
              iconPosition: 'after'
            }
          }
        }
      },
    ],
  }}/>,
  document.getElementById('root')
)
```

If you want to use Fluent Blocks’ intermediary components, wrap where any will render in a single `FluentBlocksProvider` (there only needs to be one on the page):

```tsx
import { FluentBlocksProvider, Illustration } from '@fluent-blocks/react';
import basicIcons from '@fluent-blocks/basic-icons/basic-icons.svg';
import { render } from 'react-dom'

render(
  <FluentBlocksProvider iconSpriteUrl={basicIcons}>
    <Illustration illustration='hello' label='Hello'/>
  </FluentBlocksProvider>,
  document.getElementById('root')
)
```

In order to get the right background coverage and overflow behavior, you should apply `height: 100%` and `overflow: hidden` to the Fluent Blocks React root, and any parents of the Fluent Blocks React root should occupy the full height of whatever space Fluent Blocks should occupy.

If Fluent Blocks will render alone on the page, these rules are sufficient:

```css
html, body, #root {
  height: 100%;
}
#root {
    overflow: hidden;
}
```

## How design pattern usage is validated through types

Since the goal of this library is to aid in implementing experiences that conform to [Fluent][figma-fluent] & [UI Kit][figma-uikit] designs and principles, it brings with it those design systems’ opinions. Each component has a concept for what kind of properties & content it accepts, which can be provided in one of two ways:

1. As serializeable **props**, e.g. `{icon: 'fluent', size: 24}`
1. As a JSX **element**, e.g. `<Icon icon='fluent' size={24}/>`

The bolded terms are used in the TypeScript types for the components in this project, e.g. a valid icon instance matches `IconPropsOrElement`, which is either 1) `IconProps`, or 2) `IconElement`.

For consistency between the two syntaxes, the `children` prop and its implicit nesting equivalent in JSX is avoided in favor of named content props that parallel the serializeable syntax.

Some top-level components like `View` will check the props it was provided and provide a detailed error if the props are incorrect in any way. All other components won’t check for issues and will simply refuse to render unexpected content. In either case, developers can explicitly mark where exceptions should be made using the `Escape` component described below.

## Escaping validation

These components won’t render a component that has unexpected props or content, unless you use `Escape`. If you feel the need to use a pattern not provided by this project, you can do so using the `Escape` component as a JSX element in any of a component’s content props that aren’t “tightly-bound”, e.g.:

```tsx
// Only Escape imported from this package will render,
// so make sure you’ve imported it:
import { Section, Escape } from '@fluentui/react-blocks';

<Section
  title={[
    <Escape contentMeetsAccessibilityAndDesignStandards key="t1">
      <strong>You can put anything here</strong>
      <span> and it will be rendered.</span>
    </Escape>,
  ]}
/>
```

### Exceptions: tightly bound components

A component may ignore `Escape` only if it is “tightly-bound” with another component. Components are tightly-bound when they make sense only when used together, e.g. `Layout` and `LayoutItem` where `Layout` will only render `LayoutItems` in its `items` prop. If you need to render special content in such a situation, you can either replace the entire parent with `Escape`, or use `Escape` as the _content_ of one of the children.

### Escape inclusively, and share your designs!

Make sure the content you add using `Escape` conforms to [WCAG 2.1][wcag] and is designed inclusively.

If you would like to share your pattern with the community, [we’d welcome your contribution](CONTRIBUTING.md)! We’d all thank you to submit PR’s that extend this project with your accessible high-quality patterns.

## Concepts

This library harmonizes the patterns in Fluent and the UI Kit with concepts from web layout & interactivity by delivering components organized into these categories:

- General components based on [formatting context][fmtctx]:
    - `Block` vs `Inline`
- Specialized clusters of components with shared interactivity considerations:
    - **Media**, e.g.:
        - `Illustration`
        - `Chart`
    - **Inputs**, e.g.:
        - `RadioGroup`
        - `ShortTextInput`
- **Surfaces**, each of which expect to be unique in a given view
- **Views**, the top-level components which render an entire UI in a viewport

Any component may also have **Exemplars**, which render the same component but with a specialized API surface optimized for a specific use-case for the pattern, e.g. `Widget` always renders a `Card` though its props are based on the more constrained scope of content for cards in a dashboard from the UI Kit.

## Icons

This project supports using icons from [`fluentui-system-icons`][fluent-icons] through `@fluent-blocks/basic-icons`.

First, give Fluent Blocks’ Provider or View a URL to where your project serves the SVG sprite included in `@fluent-blocks/basic-icons`:

```tsx
import {View} from '@fluent-blocks/react'

const iconSpriteUrl = require('@fluent-blocks/basic-icons/basic-icons.svg')

return <View iconSpriteUrl={iconSpriteUrl}  
  {/* etc */}
/>
```

The `Icon`/`{icon: …}` component will render an SVG of the appropriate size containing a `use` element with an `href` to the appropriate sprite, e.g.:

```tsx
// If used wherever `InlineSequence` or `IconPropsOrElement` is accepted,
// both the props syntax and element syntax will be rendered the same way.
const catIcon =
  { icon: 'animal_cat', size: 24, variant: 'outline' } ||
  <Icon icon='animal_cat' size={24} variant='outline'/>
```

In your own project, we recommend serving just the sprites you need locally if possible. Do not use proxies for icons in production.

[channel]: https://teams.microsoft.com/l/team/19%3atKKC3lewTMtk4IopGy7Seq7fok-lNW7lGEK-HmzfaKY1%40thread.tacv2/conversations?groupId=4f925ae9-c713-434b-a1f6-44b58ac57210&tenantId=72f988bf-86f1-41af-91ab-2d7cd011db47
[issues]: https://github.com/OfficeDev/fluent-blocks/issues
[figma-fluent]: https://www.figma.com/community/file/836828295772957889/Microsoft-Fluent-Web
[figma-uikit]: https://www.figma.com/community/file/916836509871353159/Microsoft-Teams-UI-Kit
[fluent-icons]: https://github.com/microsoft/fluentui-system-icons
[fluentui-v9]: https://www.npmjs.com/package/@fluentui/react-components
[react-teams]: https://www.npmjs.com/package/@fluentui/react-teams
[storybook]: https://aka.ms/fluent-blocks-storybook
[wcag]: https://www.w3.org/TR/WCAG21
[fmtctx]: https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Flow_Layout/Block_and_Inline_Layout_in_Normal_Flow
