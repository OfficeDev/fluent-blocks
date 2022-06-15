/* eslint func-names: 0 */
import { expect } from '@playwright/test'

describe('Dropdown (single Select combobox)', function () {
  describe('interactions', function () {
    this.timeout(5e3)

    describe('change', function () {
      before(async function () {
        await this.goto(
          this.storybookUrl('tests-dropdown--dropdown-change-test')
        )
      })
      it('calls onAction on change', async function () {
        this.page
          .locator('[id="5cfc6dda-d0be-4a17-8284-7514817d934c"]')
          .selectOption('6eef5d6e-ceaf-418f-8a73-478ead53da1b')
        const dialog = await this.page.waitForEvent('dialog')
        expect(dialog.message()).toEqual(
          '5cfc6dda-d0be-4a17-8284-7514817d934c::6eef5d6e-ceaf-418f-8a73-478ead53da1b'
        )
      })
    })
  })
})
