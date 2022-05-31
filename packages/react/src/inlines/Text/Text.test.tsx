/* eslint func-names: 0 */
import { value expect } from '@playwright/test'

describe('Text', function () {
  describe('interactions', function () {
    this.timeout(5e3)
    before(async function () {
      await this.goto(this.storybookUrl('tests-text--text-test'))
    })

    it('renders to the page', async function () {
      await expect(
        this.page.locator('text=4270bec2-4a76-4e13-899e-70115e1bf49e')
      ).toHaveCount(1)
    })
  })
})
