/* eslint func-names: 0 */

import expect from 'expect'
import renderer from 'react-test-renderer'
import { Section } from './Section'
import get from 'lodash/get'

describe('Section: unit tests', function () {
  it('accepts JSON props', async function () {
    const section = renderer
      .create(
        <Section
          title={[{ text: 'Title' }]}
          abstract={[{ text: 'Abstract' }]}
        />
      )
      .toJSON()

    expect(get(section, ['children', 0, 'type'])).toEqual('h2')
  })
})

describe('Section: interactions', function () {
  before(async function (this) {
    await this.page.goto(this.storybookUrl('tests-section--section-test'))
  })

  it('renders to the page', async function () {
    expect(await this.page.locator('h2').count()).toEqual(1)
  })
})
