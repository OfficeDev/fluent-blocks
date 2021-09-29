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

[figma-fluent]: https://www.figma.com/community/file/836828295772957889/Microsoft-Fluent-Web
[figma-uikit]: https://www.figma.com/community/file/916836509871353159/Microsoft-Teams-UI-Kit
[fluentui-v9]: https://www.npmjs.com/package/@fluentui/react-components
[react-teams]: https://www.npmjs.com/package/@fluentui/react-teams
