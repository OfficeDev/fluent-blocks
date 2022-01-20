# Fluent React Patterns

## [Open Storybook ↗︎][storybook]

An implementation of [Fluent][figma-fluent] & [UI Kit][figma-uikit] designs for app development based on [`@fluentui/react-components`][fluentui-v9]. This project succeeds [`@fluentui/react-teams`][react-teams].

This package provides a set of components developers can use to build fully interactive & accessible experiences using whatever React coding convention they prefer, rendering experiences that match Fluent & UI Kit designs.

## ⚠️ In active development

This project’s API is subject to unannounced breaking changes and is not yet on any release cycle.

## Contributing

If you’d like to contribute to this project, please see [the Contributing file][contributing].

## Getting started

1. Using TypeScript and an IDE that supports type inspections will make using this project much easier
2. Make sure you have the correct peer dependencies listed in `package.json`
3. Install from Github: `yarn add OfficeDev/fluent-react-patterns`
4. Use the `View` component to hand off all UI responsibility to this project, or use individual components as you need, whichever suits your needs best.

## How design pattern usage is validated through types

Since the goal of this library is to aid in implementing experiences that conform to [Fluent][figma-fluent] & [UI Kit][figma-uikit] designs and principles, it brings with it those design systems’ opinions. Each component has a concept for what kind of properties & content it accepts, which can be provided in one of two ways:

1. As serializeable **props**, e.g. `{icon: 'fluent', size: 24}`
1. As a JSX **element**, e.g. `<Icon icon='fluent' size={24}/>`

The bolded terms are used in the TypeScript types for the components in this project, e.g. a valid icon instance matches `IconPropsOrElement`, which is either 1) `IconProps`, or 2) `IconElement`.

For consistency between the two syntaxes, the `children` prop and its implicit nesting equivalent in JSX is avoided in favor of named content props that parallel the serializeable syntax.

Some top-level components like `View` will check the props it was provided and provide a detailed error if the props are incorrect in any way. All other components won’t check for issues and will simply refuse to render unexpected content. In either case, developers can explicitly mark where exceptions should be made using the `Escape` component described below.

## Escaping validation

These components won’t render a component that has unexpected props or content, unless you use `Escape`. If you feel the need to use a pattern not provided by this project, you can do so using the `Escape` component as a JSX element in any of a component’s content props, e.g.:

```tsx
<Section
  title={[
    <Escape contentMeetsAccessibilityAndDesignStandards key="t1">
      <strong>You can put anything here</strong>
      <span> and it will be rendered.</span>
    </Escape>,
  ]}
/>
```

Make sure the content you add this way conforms to [WCAG 2.1][wcag] and is designed inclusively. If you would like to share the pattern for the community, [we’d welcome your contribution][contributing]!

## Pattern structure

The components in this project are usually organized by their pattern type, which is determined by shared props if relevant, otherwise by its [formatting context in normal flow][fmtctx]:

- Components with shared props:
  - Media, e.g.:
    - `Illustration`
    - `Chart`
  - Inputs, e.g.:
    - `RadioGroup`
    - `ShortTextInput`
- Components with shared formatting context:
  - Block, e.g.:
    - `Section`
    - `Heading`
  - Inline, e.g.:
    - `Text`
    - `Icon`
- Special classes:
  - Surfaces, each of which expect to be unique in a given view
  - Views, the top-level components which validate props and render an entire UI in a viewport

## Icons

This project supports using icons from [`fluentui-system-icons`][fluent-icons] through SVG sprites implemented in [an experimental fork of that project](https://github.com/thure/fluentui-system-icons/tree/master/packages/svg-sprites). The `Icon` component will render an SVG of the appropriate size containing a `use` element with an `href` to the appropriate sprite, e.g.:

```tsx
// If used wherever `InlineSequence` or `IconPropsOrElement` is accepted,
// both the props syntax and element syntax will be rendered the same way.
const catIcon =
  { icon: 'animal_cat', size: 24, variant: 'outline' } ||
  <Icon icon='animal_cat' size={24} variant='outline'/>
```

This project currently expects any requests to `/sprites/**` to serve an SVG sprite with the appropriate content, which for the Storybook development server is proxied to a specific release on jsDelivr.

In your own project, we recommend serving just the sprites you need locally if possible. Do not use proxies for icons in production.

[figma-fluent]: https://www.figma.com/community/file/836828295772957889/Microsoft-Fluent-Web
[figma-uikit]: https://www.figma.com/community/file/916836509871353159/Microsoft-Teams-UI-Kit
[fluent-icons]: https://github.com/microsoft/fluentui-system-icons
[fluentui-v9]: https://www.npmjs.com/package/@fluentui/react-components
[react-teams]: https://www.npmjs.com/package/@fluentui/react-teams
[storybook]: https://aka.ms/fluent-patterns-storybook
[wcag]: https://www.w3.org/TR/WCAG21
[contributing]: /blob/main/CONTRIBUTING.md
[fmtctx]: https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Flow_Layout/Block_and_Inline_Layout_in_Normal_Flow
