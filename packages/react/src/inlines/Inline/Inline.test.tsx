/* eslint func-names: 0 */
import get from 'lodash/get'
import renderer from 'react-test-renderer'

import { value expect } from '@playwright/test'

import { value Inline } from './Inline'

describe('Inline', function () {
  describe('unit tests', function () {
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

  describe('interactions', function () {
    this.timeout(5e3)
    describe('using serializeable props', function () {
      before(async function () {
        await this.goto(this.storybookUrl('tests-inline--inline-json-test'))
      })

      it('renders to the page', async function () {
        await expect(
          this.page.locator('text=d0192c39-f601-40fa-a174-1b68d87c50ee')
        ).toHaveCount(1)
        await expect(
          this.page.locator(
            'use[href^="/sprites/313be9f9-1c3b-4cf8-adb4-5dc59d4197a3"]'
          )
        ).toHaveCount(1)
      })
    })

    describe('using JSX', function () {
      before(async function () {
        await this.goto(this.storybookUrl('tests-inline--inline-jsx-test'))
      })

      it('renders to the page', async function () {
        await expect(
          this.page.locator('text=335e225e-b295-4995-8dc4-dfe9d0eed3e8')
        ).toHaveCount(1)
        await expect(
          this.page.locator(
            'use[href^="/sprites/3e6f7b4e-9d9c-4c4a-85fe-4e36e558b052"]'
          )
        ).toHaveCount(1)
      })
    })

    describe('using `Escape`', function () {
      before(async function () {
        await this.goto(this.storybookUrl('tests-inline--inline-escape-test'))
      })

      it('renders to the page', async function () {
        await expect(
          this.page.locator('text=12d046a8-1649-4d84-b240-35c7c0ee7a91')
        ).toHaveCount(1)
      })
    })
  })
})
