/* eslint func-names: 0 */
import { expect } from '@playwright/test'

describe('Short text input', function () {
  describe('interactions', function () {
    this.timeout(5e3)

    describe('change', function () {
      before(async function () {
        await this.goto(
          this.storybookUrl('tests-shorttextinput--shorttextinput-change-test')
        )
      })
      it('calls onAction on change', async function () {
        this.page
          .locator('[id="3c4333b6-42e5-4242-8c49-8ee58e3097f9"]')
          .fill('25acec35-687b-44e7-a28b-5fb4dcefc2ad')
        const dialog = await this.page.waitForEvent('dialog')
        expect(dialog.message()).toEqual(
          '3c4333b6-42e5-4242-8c49-8ee58e3097f9::25acec35-687b-44e7-a28b-5fb4dcefc2ad'
        )
      })
    })
  })
})
