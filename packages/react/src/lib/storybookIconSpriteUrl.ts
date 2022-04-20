import isChromatic from 'chromatic/isChromatic'

const storybookPublicIconUrl = '/basic-icons.svg'
const devWorkspaceIconUrl: string = require('@fluent-blocks/basic-icons/basic-icons.svg')

export default isChromatic() ? storybookPublicIconUrl : devWorkspaceIconUrl
