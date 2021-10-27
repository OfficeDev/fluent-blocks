/* eslint func-names: 0 */

import expect from 'expect'

describe('Text: interactions', function () {
  before(async function (this) {
    await this.page.goto(this.storybookUrl('tests-text--text-test'))
  })

  it('renders to the page', async function () {
    expect(
      await this.page
        .locator('text=4270bec2-4a76-4e13-899e-70115e1bf49e')
        .count()
    ).toEqual(1)
  })
})