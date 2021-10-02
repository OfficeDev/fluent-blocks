import { z } from 'zod'
import { Main } from '../surfaces/Main'
import { FluentKitProvider, theme, dir } from '../lib'
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
export const View = (props: ViewProps) => {
  const { main, theme = 'light', dir = 'ltr' } = viewProps.parse(props)
  return (
    <FluentKitProvider {...{ theme, dir }}>
      <Main {...main} />
    </FluentKitProvider>
  )
}
