import {PhrasingContent as PhrasingContentProps, Text as TextProps, Icon as IconProps} from "../../../types/view";
import {Text} from "../../phrasing/text/Text";
import {Icon} from "../../phrasing/icon/Icon";
import values from 'lodash/values';

export const PhrasingContent = (phrasingElements: PhrasingContentProps) => {
  console.log('phrasing elements', phrasingElements)
  return <>{Array.prototype.map.call(Array.isArray(phrasingElements) ? phrasingElements : values(phrasingElements), phrasingElement=>{
    if(phrasingElement.hasOwnProperty('text')) return <Text {...phrasingElement as TextProps}/>;
    if(phrasingElement.hasOwnProperty('icon')) return <Icon {...phrasingElement as IconProps}/>;
    else return null;
  })}</>
}
