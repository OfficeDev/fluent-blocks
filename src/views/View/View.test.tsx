/* eslint func-names: 0 */

import expect from 'expect'

describe('View', function () {
  describe('interactions', function () {
    this.timeout(5e3)

    describe('onAction handles actions at the context', function () {
      before(async function () {
        await this.goto(this.storybookUrl('tests-view--view-on-action-test'))
      })
      it('calls onAction on click', async function () {
        this.page
          .locator('text=0094cea7-6ab5-43be-8975-eb4952d5fd60')
          .click({ noWaitAfter: true })
        const dialog = await this.page.waitForEvent('dialog')
        expect(dialog.message()).toEqual('ff92e203-0767-4bcd-a483-df5e7857a5bb')
      })
    })
  })
})
