import { z } from 'zod'
import {
  accentScheme,
  anyActionPayload,
  themeName,
} from '@fluent-blocks/schemas'

import {
  FluentBlocksProvider,
  ParseBoundary,
  withActionHandler,
  translations,
  defaultTranslations,
} from '../../lib'

import { Main } from '../../surfaces'
import { sectionContentProps } from '../../blocks'

export const viewProps = z.object({
  // sidebar: z.object({}).optional(),
  // topbar: z.object({}).optional(),
  // modal: z.object({}).optional(),
  main: sectionContentProps,
  themeName: themeName.optional(),
  accentScheme: accentScheme.optional(),
  translations: translations.optional(),
  ...withActionHandler(anyActionPayload),
})

export type ViewProps = z.infer<typeof viewProps>

/** An experience provided to the user via their device’s canvas. */
export const View = (data: ViewProps) => (
  <ParseBoundary<ViewProps>
    schema={viewProps}
    data={data}
    children={({
      main,
      themeName = 'light',
      accentScheme = 'web',
      translations = defaultTranslations,
      onAction,
    }) => (
      <FluentBlocksProvider
        {...{ themeName, accentScheme, translations, onAction }}
      >
        <Main {...main} />
      </FluentBlocksProvider>
    )}
  />
)
