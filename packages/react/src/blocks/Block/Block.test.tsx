/* eslint func-names: 0 */
import get from 'lodash/get'
import renderer from 'react-test-renderer'

import { expect } from '@playwright/test'

import { Block } from './Block'

describe('Block', function () {
  describe('unit tests', function () {
    it('won’t render an unknown block.', async function () {
      const nWarnings = this.warnings.length
      const block = renderer
        .create(
          // @ts-ignore
          <Block {...{ potato: 'squirrel' }} />
        )
        .toJSON()

      expect(get(block, ['children', 0], 'not present')).toEqual('not present')

      expect(this.warnings.length).toBeGreaterThan(nWarnings)
    })
  })

  describe('interactions', function () {
    this.timeout(5e3)
    describe('using serializeable props', function () {
      before(async function () {
        await this.goto(this.storybookUrl('tests-block--block-json-test'))
      })

      it('renders to the page', async function () {
        expect(
          await this.page.locator('#root figcaption').first().innerText()
        ).toEqual('8efae607-15cd-4294-a71b-c585ca28278f')
        expect(await this.page.locator('#root p').first().innerText()).toEqual(
          '3b517894-57f8-4ed2-824b-90285b4686ce'
        )
      })
    })

    describe('using JSX', function () {
      before(async function () {
        await this.goto(this.storybookUrl('tests-block--block-jsx-test'))
      })

      it('renders to the page', async function () {
        expect(
          await this.page.locator('#root figcaption').first().innerText()
        ).toEqual('2bc0f585-7129-41be-aa66-ab8fd24372bc')
        expect(await this.page.locator('#root p').first().innerText()).toEqual(
          '76cbfb72-0703-4cc0-8b39-a733d6f34b4b'
        )
      })
    })

    describe('using `Escape`', function () {
      before(async function () {
        await this.goto(this.storybookUrl('tests-block--block-escape-test'))
      })

      it('renders to the page', async function () {
        await expect(
          this.page.locator('text=2fe399c7-c5bc-443e-8116-42ee17e4acd3')
        ).toHaveCount(1)
      })
    })
  })
})
