import React from 'react'

import { render } from 'utils/testUtils/helperRtl'

import PrivateRoute from '../PrivateRoute'

describe('PrivateRoute Component', () => {
  it('should render without crashing', () => {
    const { container } = render(<PrivateRoute />)
    expect(container).toMatchSnapshot()
  })

  it('should render child element', () => {
    const { container } = render(<PrivateRoute />)
    expect(container.firstChild).toBeDefined()
  })
})
