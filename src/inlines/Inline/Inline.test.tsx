/* eslint func-names: 0 */

import expect from 'expect'
import renderer from 'react-test-renderer'
import { Inline } from './Inline'
import get from 'lodash/get'

describe('Inline: unit tests', function () {
  it('won’t render an unknown inline.', async function () {
    const nWarnings = this.warnings.length
    const inline = renderer
      .create(
        // @ts-ignore
        <Inline {...{ potato: 'squirrel' }} />
      )
      .toJSON()

    expect(get(inline, ['children', 0], 'not present')).toEqual('not present')

    expect(this.warnings.length).toBeGreaterThan(nWarnings)
  })
})

describe('Inline: interactions', function () {
  this.timeout(5e3)
  describe('using serializeable props', function () {
    before(async function (this) {
      await this.page.goto(this.storybookUrl('tests-inline--inline-json-test'))
    })

    it('renders to the page', async function () {
      expect(
        await this.page
          .locator('text=d0192c39-f601-40fa-a174-1b68d87c50ee')
          .count()
      ).toEqual(1)
      expect(
        await this.page
          .locator('use[href^="/sprites/313be9f9-1c3b-4cf8-adb4-5dc59d4197a3"]')
          .count()
      ).toEqual(1)
    })
  })

  describe('using JSX', function () {
    before(async function (this) {
      await this.page.goto(this.storybookUrl('tests-inline--inline-jsx-test'))
    })

    it('renders to the page', async function () {
      expect(
        await this.page
          .locator('text=335e225e-b295-4995-8dc4-dfe9d0eed3e8')
          .count()
      ).toEqual(1)
      expect(
        await this.page
          .locator('use[href^="/sprites/3e6f7b4e-9d9c-4c4a-85fe-4e36e558b052"]')
          .count()
      ).toEqual(1)
    })
  })

  describe('using `Escape`', function () {
    before(async function (this) {
      await this.page.goto(
        this.storybookUrl('tests-inline--inline-escape-test')
      )
    })

    it('renders to the page', async function () {
      expect(
        await this.page
          .locator('text=12d046a8-1649-4d84-b240-35c7c0ee7a91')
          .count()
      ).toEqual(1)
    })
  })
})
