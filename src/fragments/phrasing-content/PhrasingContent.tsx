import { PhrasingContent as PhrasingContentProps, Text as TextProps, Icon as IconProps } from '../../../types/view'
import { Text } from '../../phrasing/text/Text'
import { Icon } from '../../phrasing/icon/Icon'
import values from 'lodash/values'

export const PhrasingContent = (phrasingElements: PhrasingContentProps) => (
  <>
    {Array.prototype.map.call(Array.isArray(phrasingElements) ? phrasingElements : values(phrasingElements), (phrasingElement) => {
      if (phrasingElement.hasOwnProperty('text')) {
        return <Text {...(phrasingElement as TextProps)} />
      }
      if (phrasingElement.hasOwnProperty('icon')) {
        return <Icon {...(phrasingElement as IconProps)} />
      } else {
        console.warn('Unsupporting phrasing element:', phrasingElement)
        return null
      }
    })}
  </>
)
