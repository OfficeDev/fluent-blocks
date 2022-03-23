import { ReactElement } from 'react'
import { mergeClasses as cx } from '@fluentui/react-components'
import { CodeProps as NaturalCodeProps } from '@fluent-blocks/schemas'

import { useCommonStyles, useTextBlockStyles, useTextStyles } from '../../lib'

export type CodeProps = NaturalCodeProps

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

export type CodeElement = ReactElement<CodeProps, typeof Code>
export type CodePropsOrElement = CodeProps | CodeElement

function isCodeProps(o: any): o is CodeProps {
  return 'code' in o
}

function isCodeElement(o: any): o is CodeElement {
  return o?.type === Code
}

export function renderIfCode(o: any) {
  return isCodeProps(o) ? <Code {...o} /> : isCodeElement(o) ? o : null
}
