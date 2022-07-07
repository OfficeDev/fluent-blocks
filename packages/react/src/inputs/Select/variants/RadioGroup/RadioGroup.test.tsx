/* eslint func-names: 0 */
import { expect } from '@playwright/test'

describe('Radio group (single Select group)', function () {
  describe('interactions', function () {
    this.timeout(5e3)

    describe('change', function () {
      before(async function () {
        await this.goto(
          this.storybookUrl('tests-radiogroup--radiogroup-change-test')
        )
      })
      it('calls onAction on change', async function () {
        this.page
          .locator('[value="a179b0c9-dbb5-419c-8879-8bfc1f5bf6c3"]')
          .check()
        const dialog = await this.page.waitForEvent('dialog')
        expect(dialog.message()).toEqual(
          '8fafabd0-5bcb-4f04-b5ef-36fb5de07ba7::a179b0c9-dbb5-419c-8879-8bfc1f5bf6c3'
        )
      })
    })
  })
})
