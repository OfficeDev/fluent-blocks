<img alt="Fluent Blocks logo" src="https://cdn.jsdelivr.net/gh/OfficeDev/fluent-blocks@next/packages/react/.storybook/public/brandImage.svg#gh-light-mode-only" width="320" />
<img alt="Fluent Blocks logo" src="https://cdn.jsdelivr.net/gh/OfficeDev/fluent-blocks@next/packages/react/.storybook/public/brandImageDark.svg#gh-dark-mode-only" width="320" />

# Basic icons

This package manages the “basic icons” to include with Fluent Blocks. These are the icons that other packages in this project will be able to use without relying on a proxy or the complete Fluent System Icons repository.

The sprite should be served as a regular asset file (versioned if necessary) to take best advantage of the UAs’ cache.

Fluent Blocks can still fall back to remote one-off sprites if the developer asks for an icon that isn't included in `basic-icons.json`, but it requires a proxy.

## Configuring

Edit the `basic-icons.json` file to change which icons are included in the sprite.

## Building

Install dependencies first, as usual:

```shell
$ pnpm install
```

Then from within this package, run:

```shell
$ pnpm bundle
```
