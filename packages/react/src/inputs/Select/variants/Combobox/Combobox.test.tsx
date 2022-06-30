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
        this.page
          .locator('[id="6f72b1df-7e3e-4825-ae1b-200bd136a69f"]')
          .selectOption('e44accde-e3ab-4080-a3de-109431277fe6')
        const dialog = await this.page.waitForEvent('dialog')
        expect(dialog.message()).toEqual(
          '6f72b1df-7e3e-4825-ae1b-200bd136a69f::e44accde-e3ab-4080-a3de-109431277fe6'
        )
      })
    })
  })
})
