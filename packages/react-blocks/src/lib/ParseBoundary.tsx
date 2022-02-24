import { ParseParams, ZodError } from 'zod'

export function ParseBoundary<P>(props: {
  schema: {
    safeParse(
      data: unknown,
      params?: Partial<ParseParams>
    ):
      | {
          success: true
          data: P
        }
      | {
          success: false
          error: ZodError
        }
  }
  data: P
  children: (parsedProps: P) => JSX.Element
}) {
  const parsedProps = props.schema.safeParse(props.data)
  if (parsedProps.success) {
    return props.children(parsedProps.data)
  } else {
    return <pre>{JSON.stringify(parsedProps.error, null, 2)}</pre>
  }
}
