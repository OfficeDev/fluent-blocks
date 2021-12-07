/* eslint func-names: 0 */

import expect from 'expect'

describe('BigMessage', function () {
  describe('interactions', function () {
    this.timeout(5e3)
    describe('using serializeable props', function () {
      before(async function () {
        await this.goto(
          this.storybookUrl('tests-bigmessage--big-message-json-test')
        )
      })

      it('renders to the page', async function () {
        expect(await this.page.locator('#root svg').count()).toEqual(1)

        expect(await this.page.locator('#root h3').first().innerText()).toEqual(
          '9bd4bf8e-6747-440f-bba2-fe419a17bbc5'
        )

        expect(await this.page.locator('#root p').first().innerText()).toEqual(
          '11d3f07b-e9a4-4186-bcbc-88f05f8c8b74'
        )

        expect(
          await this.page.locator('#root button').nth(0).innerText()
        ).toEqual('6598f3b6-42b1-48bf-89e9-5b4f497df4b9')

        expect(
          await this.page.locator('#root button').nth(1).innerText()
        ).toEqual('ee1997e3-7947-45f9-b9dc-cef3b9622a9f')

        expect(
          await this.page.locator('#root button').nth(2).innerText()
        ).toEqual('5aa32db6-9968-4822-a88e-f8db12a9b0e6')
      })
    })

    describe('using JSX props', function () {
      before(async function () {
        await this.goto(
          this.storybookUrl('tests-bigmessage--big-message-jsx-test')
        )
      })

      it('renders to the page', async function () {
        expect(await this.page.locator('#root svg').count()).toEqual(1)

        expect(await this.page.locator('#root h3').first().innerText()).toEqual(
          '13ec92f2-57b6-4e50-9e5b-eb3924f4da88'
        )

        expect(await this.page.locator('#root p').first().innerText()).toEqual(
          '24b5f53d-38d4-4895-b655-c79bbd74bc19'
        )
      })
    })

    describe('using `Escape`', function () {
      before(async function () {
        await this.goto(
          this.storybookUrl('tests-bigmessage--big-message-escape-test')
        )
      })

      it('renders to the page', async function () {
        expect(
          await this.page
            .locator('text=ea3f02bc-b278-436e-b57a-9bfdba917bab')
            .count()
        ).toEqual(1)
        expect(
          await this.page
            .locator('text=c9ed0a93-3488-484b-bc18-6da5aa378f74')
            .count()
        ).toEqual(1)
        expect(
          await this.page
            .locator('text=ab4a937c-c7e1-4be3-9dcf-2cb6d9685c0a')
            .count()
        ).toEqual(1)
        expect(
          await this.page
            .locator('text=e4612e68-b851-47d6-8fc8-8694c00e591b')
            .count()
        ).toEqual(1)
      })
    })
  })
})
