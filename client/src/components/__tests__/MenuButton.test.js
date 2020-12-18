import React from 'react'

import { render } from 'utils/testUtils/helperRtl'

import MenuButton from '../MenuButton'

describe('MenuButton Component', () => {
  it('should render without crashing', () => {
    const { container } = render(<MenuButton />)
    expect(container).toMatchSnapshot()
  })

  it('should render child element', () => {
    const { container } = render(<MenuButton />)
    expect(container.firstChild).toBeDefined()
  })
})
