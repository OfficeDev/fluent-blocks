/* eslint func-names: 0 */

import expect from 'expect'

describe('Button', function () {
  describe('interactions', function () {
    this.timeout(5e3)

    describe('click', function () {
      before(async function (this) {
        await this.page.goto(
          this.storybookUrl('tests-button--button-click-test'),
          { timeout: 3e3 }
        )
      })
      it('calls onAction on click', async function () {
        this.page
          .locator('text=ca227823-0eb2-42c4-a873-24a1c5068082')
          .click({ noWaitAfter: true })
        const dialog = await this.page.waitForEvent('dialog')
        expect(dialog.message()).toEqual('03cae49a-aaf5-4641-a652-6e633ffd1b75')
      })
      after(async function (this) {
        await this.page.close()
      })
    })

    describe('emit', function () {
      before(async function (this) {
        // todo: why isn't `load` or any other event firing between the button tests? Should we be closing and opening pages for each test?
        this.page = await this.browser.newPage()
        await this.page.goto(
          this.storybookUrl('tests-button--button-emit-test'),
          { timeout: 3e3 }
        )
      })
      it('calls parent onAction on click', async function () {
        this.page
          .locator('text=1c525f9a-de85-4b35-8c23-658c625a2bf8')
          .click({ noWaitAfter: true })
        const dialog = await this.page.waitForEvent('dialog')
        expect(dialog.message()).toEqual('bb35aced-ab23-4eaa-96c0-48cb8800f58f')
      })
    })

    describe('keyboard focus & activate', function () {
      // todo: why isn't this working in Playwright when it works in browsers already?
      it(
        'calls onAction on keyboard activation' /* , async function () {
        this.page.locator('text=uuid').press(' ', {noWaitAfter: true})
        const dialog = await this.page.waitForEvent('dialog')
        expect(dialog.message()).toEqual('uuid')
      }*/
      )
    })
  })
})
