# Basic icons for Fluent Blocks

This package manages the “basic icons” to include with Fluent Blocks. These are the icons that other packages in this project will be able to use without relying on a proxy.

The sprite should be served as a regular asset file (versioned if necessary) to take best advantage of the UAs’ cache.

Fluent Blocks can still fall back to remote one-off sprites if the developer asks for an icon that isn't included in `basic-icons.json`.

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
