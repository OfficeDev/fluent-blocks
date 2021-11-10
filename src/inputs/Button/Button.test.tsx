/* eslint func-names: 0 */

import expect from 'expect'

describe('Button: interactions', function () {
  this.timeout(5e3)

  before(async function (this) {
    await this.page.goto(this.storybookUrl('tests-button--button-test'))
  })

  it('emits onActive on click', async function () {
    this.page
      .locator('text=ca227823-0eb2-42c4-a873-24a1c5068082')
      .click({ noWaitAfter: true })
    const dialog = await this.page.waitForEvent('dialog')
    expect(dialog.message()).toEqual('03cae49a-aaf5-4641-a652-6e633ffd1b75')
  })

  // todo: why isn't this working in Playwright when it works in browsers already?
  it(
    'emits onActive on keyboard activate' /* , async function () {
    this.page.locator('text=1c525f9a-de85-4b35-8c23-658c625a2bf8').press('Spacebar', {noWaitAfter: true})
    const dialog = await this.page.waitForEvent('dialog')
    expect(dialog.message()).toEqual('bb35aced-ab23-4eaa-96c0-48cb8800f58f')
  }*/
  )
})
