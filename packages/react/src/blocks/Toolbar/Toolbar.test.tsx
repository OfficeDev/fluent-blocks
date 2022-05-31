/* eslint func-names: 0 */
import { value expect } from '@playwright/test'

describe('Toolbar', function () {
  describe('interactions', function () {
    this.timeout(5e3)
    describe('using serializeable props', function () {
      before(async function () {
        await this.goto(this.storybookUrl('tests-toolbar--toolbar-json-test'))
      })
      it('renders to the page and hides content that can’t fit', async function () {
        await expect(
          this.page.locator('#root button[id="51e6eeb9"]')
        ).toBeVisible()
        await expect(
          this.page.locator('#root button[id="b3ccb472"]')
        ).not.toBeVisible()
      })
    })
  })
})
