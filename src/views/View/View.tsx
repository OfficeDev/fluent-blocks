import { z } from 'zod'

import {
  FluentPatternsProvider,
  themeName,
  dir,
  ParseBoundary,
  withActionHandler,
  anyActionPayload,
} from '../../lib'

import { Main } from '../../surfaces'
import { sectionContentProps } from '../../blocks'

export const viewProps = z.object({
  sidebar: z.object({}).optional(),
  toolbar: z.object({}).optional(),
  modal: z.object({}).optional(),
  main: sectionContentProps,
  theme: themeName.optional(),
  dir: dir.optional(),
  ...withActionHandler(anyActionPayload),
})

export type ViewProps = z.infer<typeof viewProps>

/** An experience provided to the user via their device’s canvas. */
export const View = (data: ViewProps) => (
  <ParseBoundary<ViewProps>
    schema={viewProps}
    data={data}
    children={({ main, theme = 'light', dir = 'ltr', onAction }) => (
      <FluentPatternsProvider {...{ theme, dir, onAction }}>
        <Main {...main} />
      </FluentPatternsProvider>
    )}
  />
)
