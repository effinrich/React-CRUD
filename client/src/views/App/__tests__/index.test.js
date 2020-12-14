import React from 'react'
import { render, cleanup /*, screen*/ } from 'utils/custom-test-render'

import App from '../index'

afterEach(cleanup)

describe('App View Component', () => {
  it('renders without crashing', () => {
    const { asFragment } = render(<App />)
    expect(asFragment()).toMatchSnapshot()
  })
})
