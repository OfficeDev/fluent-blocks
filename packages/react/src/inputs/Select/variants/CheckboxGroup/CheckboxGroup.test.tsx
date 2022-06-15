/* eslint func-names: 0 */
import { expect } from '@playwright/test'

describe('Checkbox group (multiple Select group)', function () {
  describe('interactions', function () {
    this.timeout(5e3)

    describe('change', function () {
      before(async function () {
        await this.goto(
          this.storybookUrl('tests-checkboxgroup--checkboxgroup-change-test')
        )
      })
      it('calls onAction on change', async function () {
        this.page
          .locator('[value="f15bf8e1-77a6-4a35-9f70-ad4f6c9fc4aa"]')
          .check()
        const dialog = await this.page.waitForEvent('dialog')
        expect(dialog.message()).toEqual(
          '62d0da32-ef0f-4976-b387-35a0861c2fd3::f15bf8e1-77a6-4a35-9f70-ad4f6c9fc4aa'
        )
      })
    })
  })
})
