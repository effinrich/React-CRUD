import React from 'react'

import { render } from 'utils/testUtils/helperRtl'

import Notification from '../Notification'

describe('Notification Component', () => {
  it('should render without crashing', () => {
    const { container } = render(<Notification />)
    expect(container).toMatchSnapshot()
  })

  it('should render child element', () => {
    const { container } = render(<Notification />)
    expect(container.firstChild).toBeDefined()
  })
})
