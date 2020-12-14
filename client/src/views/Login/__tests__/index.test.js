import React from 'react'
import { render /*, screen*/, cleanup } from 'utils/custom-test-render'

import Login from '../index'

afterEach(cleanup)

describe('Login View Component', () => {
  it('renders without crashing', () => {
    const { asFragment } = render(<Login />)
    expect(asFragment()).toMatchSnapshot()
  })
})
