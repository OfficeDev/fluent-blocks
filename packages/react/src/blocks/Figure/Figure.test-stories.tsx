import { Figure, FigureProps } from './Figure'
import { Parameters } from '@storybook/addons'

export default {
  title: 'Tests/Figure',
  component: Figure,
}

const FigureTemplate = (props: FigureProps) => <Figure {...props} />

export const FigureJsonTest: typeof FigureTemplate & {
  args?: FigureProps
  parameters?: Parameters
} = FigureTemplate.bind({})

FigureJsonTest.args = {
  media: {
    light: 'https://i.ibb.co/LdW9rHH/deploy.png',
    dark: 'https://i.ibb.co/LdW9rHH/deploy.png',
    highContrast: 'https://i.ibb.co/LdW9rHH/deploy.png',
    label: '0c9c1a2c-f75c-4a03-a2eb-a84a097ea33d',
  },
  caption: '56fe5be3-ad5a-481e-b971-cab910f1c99b',
}
FigureJsonTest.parameters = { chromatic: { disableSnapshot: true } }
