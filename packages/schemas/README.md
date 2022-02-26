<img alt="Fluent Blocks logo" src="https://cdn.jsdelivr.net/gh/OfficeDev/fluent-blocks@main/packages/react/.storybook/public/brandImage.svg" width="320" />

This package contains the schemas that specify the platform-agnostic API surface for Fluent Blocks.

## Using these schemas

There are at least two meaningful ways to use these schemas: (1) direct use in platform-specific components (as-is or by merging/extending), and (2) rendering to JSON schemas.

### Direct use

Just import the schema you want to use, and use as you like.

#### Parsing / validating

```ts
import { cardProps } from '@fluentui/blocks-schemas'

const receivedProps = await getUserInput();

const parseResult = cardProps.safeParse(receivedProps)

if(parseResult.success){
  renderCard(parseResult.data)
}else{
  renderError(parseResult.error)
}
```

#### Defining platform-specific schemas

```ts
import { z } from 'zod'
import { ReactElement } from 'react'
import { textProps as naturalTextProps } from '@fluentui/blocks-schemas'

import Text from './Text.tsx'

const textElement = z.object({ props })
  .catchall(z.any())
  .transform((el) => el as ReactElement<z.infer<typeof naturalTextProps>, Text>)

export const textPropsOrElement = z.union([
  textProps,
  textElement
])
```

### JSON schemas

To use the JSON schemas, they need to be built. Install dependencies before building with `pnpm install`, then from within this package, run:

```shell
$ pnpm render:json-schemas
```

The JSON schemas will populate in the `json` directory in this package.
