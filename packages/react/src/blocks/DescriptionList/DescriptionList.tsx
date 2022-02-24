import { z } from 'zod'
import { InlineContent, inlineSequenceOrString } from '../../inlines'
import { makeStyles, mergeClasses as cx } from '@fluentui/react-components'
import {
  key,
  propsElementUnion,
  sx,
  useCommonStyles,
  useTextBlockStyles,
} from '../../lib'
import { ReactElement } from 'react'

export const descriptionListProps = z.object({
  descriptionList: z.array(
    z.object({
      title: inlineSequenceOrString,
      description: inlineSequenceOrString,
    })
  ),
})
export type DescriptionListProps = z.infer<typeof descriptionListProps>

const useDescriptionListStyles = makeStyles({
  listItem: {
    display: 'flex',
    ...sx.flexFlow('column', 'nowrap'),
    marginBlockEnd: '1.5rem',
    '&:last-child': { marginBlockEnd: 0 },
  },
  itemTitle: {
    order: 1,
    fontSize: '.75rem',
    lineHeight: 4 / 3,
  },
  itemDescription: {
    order: 0,
    fontSize: '1.5rem',
    lineHeight: 4 / 3,
    marginLeft: 0,
  },
})

export const DescriptionList = ({ descriptionList }: DescriptionListProps) => {
  const commonStyles = useCommonStyles()
  const textBlockStyles = useTextBlockStyles()
  const descriptionListStyles = useDescriptionListStyles()
  return (
    <dl
      className={cx(
        commonStyles.mainContentWidth,
        commonStyles.centerBlock,
        textBlockStyles.root
      )}
    >
      {descriptionList.map((item) => (
        <div key={key(item)} className={descriptionListStyles.listItem}>
          <dt className={descriptionListStyles.itemTitle}>
            <InlineContent inlines={item.title} />
          </dt>
          <dd className={descriptionListStyles.itemDescription}>
            <InlineContent inlines={item.description} />
          </dd>
        </div>
      ))}
    </dl>
  )
}

function isDescriptionListProps(o: any): o is DescriptionListProps {
  return 'descriptionList' in o
}

function isDescriptionListElement(
  o: any
): o is ReactElement<DescriptionListProps, typeof DescriptionList> {
  return o?.type === DescriptionList
}

export const descriptionListPropsOrElement = propsElementUnion<
  typeof descriptionListProps,
  typeof DescriptionList
>(descriptionListProps)
export type DescriptionListPropsOrElement = z.infer<typeof descriptionListProps>

export function renderIfDescriptionList(o: any) {
  return isDescriptionListProps(o) ? (
    <DescriptionList {...o} />
  ) : isDescriptionListElement(o) ? (
    o
  ) : null
}
