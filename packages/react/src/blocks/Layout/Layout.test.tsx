/* eslint func-names: 0 */
import { expect } from '@playwright/test'

describe('Layout', function () {
  describe('interactions', function () {
    this.timeout(5e3)
    describe('using serializeable props', function () {
      before(async function () {
        await this.goto(this.storybookUrl('tests-layout--layout-json-test'))
      })
      it('renders to the page', async function () {
        await expect(
          this.page.locator(
            '#root [role=group] >> text=7ff644a3-eb27-4e97-8978-5d7b3d569388'
          )
        ).toHaveCount(1)
      })
    })
  })
})
