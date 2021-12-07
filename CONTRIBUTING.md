# Contributing to Fluent React Patterns

We’re

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

To run tests also starting Storybook as needed (this will fail if Storybook is already running), run:

```shell
$ yarn test
```

When implementing a new pattern, be sure to:

1. Create/update all relevant Zod schemas and TypeScript types.
   - The Zod schema and TypeScript types should be lowercase and uppercase respectively, e.g. `textPropsOrElement` and `TextPropsOrElement`.
   - If the pattern is an Entity or Sequence of Entities that renders any of a union of subpatterns, be sure the names of the schemas and types indicate as much, e.g. the `Block` component exports the Zod schema `blockEntity` and the TypeScript type `BlockEntity`.
   - If the pattern is first-class (not an Entity or Sequence), it should export `…propsOrElement` schema & type.
   - If the pattern renders a sequence, _always_ use the `Sequence` component; _do not_ just use `.map(…)`.
2. Create/update all relevant component stories
   - Prefer .mdx stories except for tests
   - Offer user-friendly controls / `argTypes` at every opportunity
     - Some components should have nested controls to disambiguate when to render them or to improve ergonomics, e.g. `<Layout layout={[…]}/>`; since Storybook’s `argTypes` can’t un-nest props, it’s recommended to create a `Storybook….tsx` file containing a version of the component specific for Storybook.
   - Write useful documentation
     - What is this component for?
     - Links to design specs
3. Create/update any relevant accessibility tests:
   - Elements receive focus as expected
   - Elements announce correct content when focused / when content changes
   - Space/Enter/Arrow keys have the intended effects
   - Pointer events have the intended effects
4. Component implementation
   - Use [CSS logical properties](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Logical_Properties) (instead of left/rigt), e.g. `marginInlineStart`.
   - Always use theme color aliases; _never_ use CSS color literals.
   - If a slot in the component should support `Escape`, only do so for its JSX syntax style.
5. Recommended but unenforced code styles
   - `import` statements should occur in the following order with a line break in between:
     1. External dependencies
     2. Indexed internal packages
     3. Direct internal imports
