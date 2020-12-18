import React from 'react'

import { render } from 'utils/testUtils/helperRtl'

import PageHeader from '../PageHeader'

describe('PageHeader Component', () => {
  it('should render without crashing', () => {
    const { container } = render(<PageHeader />)
    expect(container).toMatchSnapshot()
  })

  it('should render child element', () => {
    const { container } = render(<PageHeader />)
    expect(container.firstChild).toBeDefined()
  })
})
