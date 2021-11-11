import { z } from 'zod'
import { ReactNode } from 'react'

import { zodElement } from './propsElementUnion'

export const escapeProps = z.object({
  contentMeetsAccessibilityAndDesignStandards: z.literal(true),
  children: z.any().transform((val) => val as ReactNode | undefined),
})

export type EscapeProps = z.infer<typeof escapeProps>

export const Escape = ({
  contentMeetsAccessibilityAndDesignStandards,
  children,
}: EscapeProps) => {
  console.warn(
    'The `Escape` element has been rendered, adding unverified arbitrary content to this app. If you are the developer, please be sure the content added by this element:\n' +
      '  • is inclusive and accessible to all users especially those who use a screen reader or only their keyboard,\n' +
      '  • is usable on devices with viewports as narrow as 320px and as wide as 4096px without sacrificing legibility (wrapping text should not be longer than 75 characters at any breakpoint),\n' +
      '  • uses colors provided by theme context variables rather than static color literals,\n' +
      '  • meets at least the AA standard for text-to-background contrast ratio (https://www.w3.org/TR/WCAG/#contrast-minimum),\n' +
      '  • and abides by all other Microsoft design standards relevant to this app.' +
      '\n\n' +
      'If your implementation meets these criteria, consider reaching out to the maintainers of this project for inclusion of your pattern so it can be shared with the community of app developers.'
  )
  return contentMeetsAccessibilityAndDesignStandards ? <>{children}</> : null
}

export const escapeElement = zodElement<typeof escapeProps, typeof Escape>(
  escapeProps
)

export type EscapeElement = z.infer<typeof escapeElement>

export function isEscapeElement(o: any): o is EscapeElement {
  return o?.type === Escape
}

export function renderIfEscape(o: any) {
  return isEscapeElement(o) ? o : null
}
