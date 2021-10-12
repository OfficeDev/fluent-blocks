import { z } from 'zod'
import { Main } from '../surfaces/Main'
import { FluentKitProvider, theme, dir, ParseBoundary } from '../lib'
import { sectionContentProps } from '../blocks/Section/Section'

export const viewProps = z.object({
  sidebar: z.object({}).optional(),
  toolbar: z.object({}).optional(),
  modal: z.object({}).optional(),
  main: sectionContentProps,
  theme: theme.optional(),
  dir: dir.optional(),
})

export type ViewProps = z.infer<typeof viewProps>

/** An experience provided to the user via their device’s canvas. */
export const View = (data: ViewProps) => (
  <ParseBoundary<ViewProps>
    schema={viewProps}
    data={data}
    children={({ main, theme = 'light', dir = 'ltr' }) => (
      <FluentKitProvider {...{ theme, dir }}>
        <Main {...main} />
      </FluentKitProvider>
    )}
  />
)
