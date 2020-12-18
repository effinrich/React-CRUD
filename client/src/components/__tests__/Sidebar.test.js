import React from 'react'

import { render } from 'utils/testUtils/helperRtl'

import Sidebar from '../Sidebar'

describe('Sidebar Component', () => {
  it('should render without crashing', () => {
    const { container } = render(<Sidebar />)
    expect(container).toMatchSnapshot()
  })

  it('should render child element', () => {
    const { container } = render(<Sidebar />)
    expect(container.firstChild).toBeDefined()
  })
})
