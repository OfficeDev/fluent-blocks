import { PhrasingContent as PhrasingContentProps, Text as TextProps, Icon as IconProps } from '../../../types/view'
import { Text } from '../../phrasing/text/Text'
import { Icon } from '../../phrasing/icon/Icon'
import values from 'lodash/values'
import concat from 'lodash/concat'
import { PropsWithPath } from '../../lib/types'

export const PhrasingContent = ({ path, elements }: PropsWithPath<{ elements: PhrasingContentProps }>) => (
  <>
    {Array.prototype.map.call(Array.isArray(elements) ? elements : values(elements), (phrasingElement, p) => {
      const key = concat(path, p).join(':')
      switch (true) {
        case phrasingElement.hasOwnProperty('text'):
          return <Text {...(phrasingElement as TextProps)} key={key} />
        case phrasingElement.hasOwnProperty('icon'):
          return <Icon {...(phrasingElement as IconProps)} key={key} />
        default:
          console.warn('Unsupported phrasing element:', phrasingElement, key)
          return null
      }
    })}
  </>
)
