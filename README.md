# Fluent Kit

An implementation of [Fluent][figma-fluent] & [UI Kit][figma-uikit] designs for app development based on [`@fluentui/react-components`][fluentui-v9]. This project succeeds [`@fluentui/react-teams`][react-teams].

THe kit provides an API developers can use to build fully interactive & accessible experiences using straightforward, serializeable and parseable props, that render experiences matching Fluent & UI Kit designs.

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

## Icons

This project supports using icons from [`fluentui-system-icons`][fluent-icons] through SVG sprites implemented in [an experimental fork of that project](https://github.com/thure/fluentui-system-icons/tree/master/packages/svg-sprites). The `Icon` component will render an SVG of the appropriate size containing a `use` element with an `href` to the appropriate sprite, e.g.

```tsx
// If used with any parent of `InlineSequence, both the props
// syntax and element syntax will be rendered the same way.
const catIcon =
  { icon: 'animal_cat', size: 24, variant: 'outline' } ||
  <Icon icon='animal_cat' size={24} variant='outline'/>
```

This project currently expects any requests to `/sprites/**` to serve an SVG sprite with the appropriate content, which for the Storybook development server is proxied to a specific release on jsdelivr.net.

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
