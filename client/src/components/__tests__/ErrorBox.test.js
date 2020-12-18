import React from 'react'

import { render } from 'utils/testUtils/helperRtl'

import ErrorBox from '../ErrorBox'

describe('ErrorBox Component', () => {
  it('should render without crashing', () => {
    const { container } = render(<ErrorBox />)
    expect(container).toMatchSnapshot()
  })

  it('should render child element', () => {
    const { container } = render(<ErrorBox />)
    expect(container.firstChild).toBeDefined()
  })
})
