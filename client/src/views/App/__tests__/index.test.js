import React from 'react'

import { render, cleanup } from 'utils/testUtils/helperRtl'

import App from '../index'

afterEach(cleanup)

describe('App View Component', () => {
  it('renders without crashing', () => {
    const { asFragment } = render(<App />)
    expect(asFragment()).toMatchSnapshot()
  })
})
