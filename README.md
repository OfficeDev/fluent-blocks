# Fluent React Patterns

## [Open Storybook ↗︎][storybook]

An implementation of [Fluent][figma-fluent] & [UI Kit][figma-uikit] designs for app development based on [`@fluentui/react-components`][fluentui-v9]. This project succeeds [`@fluentui/react-teams`][react-teams].

This package provides a set of components developers can use to build fully interactive & accessible experiences using whatever React coding convention they prefer, rendering experiences that match Fluent & UI Kit designs.

## Getting started

Install `node` greater than or equal to v10 and `yarn`, then run:

```shell
$ yarn install
```

Then, to start Storybook, run:

```shell
$ yarn dev
```

To test while Storybook is running, run:

```shell
$ yarn test:run
```

To run tests also starting Storybook as needed (Storybook should _not_ already be running), run:

```shell
$ yarn test
```

## Concepts

Since the goal of this library is to implement experiences adhering faithfully to Fluent & UI Kit designs, it brings with it the opinions of the design system. Each component has a concept for what kind of content it allows, which can be provided in one of two ways:

1. As serializeable **props**, e.g. `{icon: 'fluent', size: 24}`
1. As a JSX **element**, e.g. `<Icon icon='fluent' size={24}/>`

The bolded terms are used in the TypeScript types for the components in this project, e.g. `IconProps`, `IconElement`, and `IconPropsOrElement`.

A union of specific `…PropsOrElement` types characterizing a certain class is called an `…Entity`, e.g. icon content is an `InlineEntity` along with text content. An ordered set of entities is called a `…Sequence`, e.g. `InlineSequence`.

If the component was imported from the index of this package, e.g. `import { View } from '@fluentui/react-patterns'`, that component will check the props it was provided and provide a detailed error if the props are incorrect in any way. If the component was imported directly from within the package, e.g. `import { Icon } from '@fluentui/react-patterns/inlines/Icon'`, it won’t check for issues and will simply refuse to render unexpected content. In either case, the developer can explicitly mark where exceptions should be made (see `Escape` below).

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

## Escape

This project won’t render a slot which has incorrect props or an unexpected JSX element. If you feel the need to use content not provided by this project, you can do so using the `Escape` component as a JSX element anywhere JSX elements are supported, e.g.:

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

Make sure the content you add meets Microsoft’s design & accessibility standards for the app you’re developing.

[figma-fluent]: https://www.figma.com/community/file/836828295772957889/Microsoft-Fluent-Web
[figma-uikit]: https://www.figma.com/community/file/916836509871353159/Microsoft-Teams-UI-Kit
[fluent-icons]: https://github.com/microsoft/fluentui-system-icons
[fluentui-v9]: https://www.npmjs.com/package/@fluentui/react-components
[react-teams]: https://www.npmjs.com/package/@fluentui/react-teams
[storybook]: https://staging--6168794438f17a003a2f124a.chromatic.com
