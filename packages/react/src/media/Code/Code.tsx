import { z } from 'zod'
import { ReactElement } from 'react'
import { mergeClasses as cx } from '@fluentui/react-components'
import { codeProps } from '@fluent-blocks/schemas'

import {
  propsElementUnion,
  useCommonStyles,
  useTextBlockStyles,
  useTextStyles,
} from '../../lib'

export type CodeProps = z.infer<typeof codeProps>

export const Code = ({ code }: CodeProps) => {
  const textStyles = useTextStyles()
  const commonStyles = useCommonStyles()
  const textBlockStyles = useTextBlockStyles()

  return (
    <pre
      className={cx(
        textBlockStyles.root,
        textStyles.code,
        textBlockStyles.code,
        commonStyles.mainContentWidth
      )}
    >
      {code}
    </pre>
  )
}

function isCodeProps(o: any): o is CodeProps {
  return 'code' in o
}

function isCodeElement(o: any): o is ReactElement<CodeProps, typeof Code> {
  return o?.type === Code
}

export const codePropsOrElement = propsElementUnion<
  typeof codeProps,
  typeof Code
>(codeProps)
export type CodePropsOrElement = z.infer<typeof codePropsOrElement>

export function renderIfCode(o: any) {
  return isCodeProps(o) ? <Code {...o} /> : isCodeElement(o) ? o : null
}
