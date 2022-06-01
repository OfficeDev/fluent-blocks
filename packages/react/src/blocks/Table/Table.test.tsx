/* eslint func-names: 0 */
import { expect } from '@playwright/test'

describe('Table', function () {
  describe('interactions', function () {
    this.timeout(5e3)
    describe('using serializeable props', function () {
      before(async function () {
        await this.goto(this.storybookUrl('tests-table--table-json-test'))
      })

      it('renders to the page', async function () {
        await expect(
          this.page.locator(
            '#root [role="grid"] [role="row"][aria-labelledby="rh__a326a593-e247-4601-8f83-839cec59bfda"] >> text=1cb6d758-e3f0-4e10-8579-dbd348e680fd'
          )
        ).toHaveCount(1)
      })
    })
  })
})
