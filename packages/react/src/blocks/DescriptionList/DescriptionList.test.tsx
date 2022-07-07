/* eslint func-names: 0 */
import { expect } from '@playwright/test'

describe('Description list', function () {
  describe('interactions', function () {
    this.timeout(5e3)
    describe('using serializeable props', function () {
      before(async function () {
        await this.goto(this.storybookUrl('tests-dl--dl-json-test'))
      })
      it('renders to the page', async function () {
        await expect(
          this.page.locator(
            '#root dl dt >> text=84f20521-7e72-4c2a-8782-f931709653c3'
          )
        ).toHaveCount(1)
        await expect(
          this.page.locator(
            '#root dl dd >> text=3c15cfbd-1fc0-4b6d-8334-59f94e5b4886'
          )
        ).toHaveCount(1)
        await expect(this.page.locator('#root dl dt + dd')).toHaveCount(1)
        await expect(this.page.locator('#root dl dd + dt')).toHaveCount(0)
      })
    })
  })
})
