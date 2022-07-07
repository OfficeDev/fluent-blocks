/* eslint func-names: 0 */
import { expect } from '@playwright/test'

describe('Combobox (multiple Select combobox)', function () {
  describe('interactions', function () {
    this.timeout(5e3)

    describe('change', function () {
      before(async function () {
        await this.goto(
          this.storybookUrl('tests-combobox--combobox-change-test')
        )
      })
      it('calls onAction on change', async function () {
        await this.page.locator('input[role=combobox]').click()
        this.page
          .locator('text=9e7a193d-c6cb-4d53-9a26-e5abc4030e32')
          .click({ noWaitAfter: true })
        const dialog = await this.page.waitForEvent('dialog')
        expect(dialog.message()).toEqual(
          '6f72b1df-7e3e-4825-ae1b-200bd136a69f::b7a63920-a6fe-4c46-85fe-aa98b8e9dbd6'
        )
      })
    })
  })
})
