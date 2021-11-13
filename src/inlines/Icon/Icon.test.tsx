/* eslint func-names: 0 */

import expect from 'expect'

describe('Icon', function () {
  describe('interactions', function () {
    this.timeout(5e3)
    before(async function () {
      await this.goto(this.storybookUrl('tests-icon--icon-test'))
    })

    it('renders to the page', async function () {
      const useHref = await this.page
        .locator('#root svg use')
        .first()
        .getAttribute('href')
      expect(useHref).toContain('0aa2159c-9d11-4709-b7a9-ae477bd462dc')
      expect(useHref).toContain('48')
      expect(useHref).toContain('filled')
    })
  })
})
