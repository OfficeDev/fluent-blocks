import { warn } from './log'

export const invalidInline = warn('Invalid inline element')
export const invalidBlock = warn('Invalid block element')
export const invalidLayoutItem = warn('Invalid layout item element')
export const invalidLayoutItemSelf = warn(
  'Layout and LayoutItem are tightly-bound; Layout will only accept LayoutItem props or elements as items.'
)
export const invalidCardContentItem = warn('Invalid card content item element')
export const invalidTabPanelItem = warn('Invalid tab panel item element')
export const invalidShortInput = warn('Invalid short input element')
export const invalidMedia = warn('Invalid media element')
export const invalidChart = warn('Invalid chart element')
