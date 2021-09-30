/* eslint func-names: 0 */

import expect from 'expect'
import renderer from 'react-test-renderer'
import { Section } from './Section'
import { Text as ExpectedText, Icon as ExpectedIcon } from '../../inlines'
import get from 'lodash/get'

const Text = ({ text }: { text: string }) => <span>{text}</span>

describe('Section: unit tests', function () {
  it('accepts JSON props', async function () {
    const section = renderer
      .create(
        <Section
          title={[{ text: 'Title' }, { icon: 'animal_cat' }]}
          abstract={[{ text: 'Abstract' }, { icon: 'diversity' }]}
        />
      )
      .toJSON()

    expect(get(section, ['children', 0, 'type'])).toEqual('h2')
  })

  it('accepts JSX props', async function () {
    const section = renderer
      .create(
        <Section
          title={[
            <ExpectedText
              text="9aa37e16-99b8-4f01-9cc4-ab773c3640e9"
              key="t1"
            />,
            <ExpectedIcon icon="animal_cat" key="t2" />,
          ]}
          abstract={[
            <ExpectedText
              text="97718842-fdf6-4ea3-9245-cb32bfb1daa4"
              key="t1"
            />,
            <ExpectedIcon icon="diversity" key="t2" />,
          ]}
        />
      )
      .toJSON()

    expect(get(section, ['children', 0, 'children', 0])).toEqual(
      '9aa37e16-99b8-4f01-9cc4-ab773c3640e9'
    )
    expect(get(section, ['children', 1, 'children', 0])).toEqual(
      '97718842-fdf6-4ea3-9245-cb32bfb1daa4'
    )
  })

  it('will not accept arbitrary JSX content', async function () {
    const nWarnings = this.warnings.length
    const section = renderer
      .create(
        <Section
          title={[
            <Text text="a2389698-50d0-46e5-93f7-e991e32b003c" key="t1" />,
          ]}
        />
      )
      .toJSON()

    expect(get(section, ['children', 0, 'children', 0], 'not present')).toEqual(
      'not present'
    )

    expect(this.warnings.length).toBeGreaterThan(nWarnings)
  })
})

describe('Section: interactions', function () {
  before(async function (this) {
    await this.page.goto(this.storybookUrl('tests-section--section-jsx-test'))
  })

  it('renders to the page', async function () {
    expect(
      await this.page
        .locator('text=fc1aece1-c6e0-4285-a37b-58382132fd6f')
        .count()
    ).toEqual(1)
    expect(
      await this.page
        .locator('text=fa3ac1fc-1976-459e-9a6e-1b69315cd7be')
        .count()
    ).toEqual(1)
  })
})
