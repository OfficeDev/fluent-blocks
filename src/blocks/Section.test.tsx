import React from 'react'
import pw from 'playwright-core'
import expect from 'expect'
import renderer from 'react-test-renderer'
import { Section } from './Section'
import get from 'lodash/get'

describe('Section', () => {
  it('accepts JSON props', async () => {
    const section = renderer
      .create(
        <Section
          title={[{ text: 'Title' }]}
          abstract={[{ text: 'Abstract' }]}
        />
      )
      .toJSON()

    expect(get(section, ['children', 0, 'type'])).toEqual('h2')
  })
})
