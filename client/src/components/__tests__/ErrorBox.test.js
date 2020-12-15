import React from 'react'

import { render, cleanup } from 'utils/testUtils/helperRtl'

import ErrorBox from '../ErrorBox'

afterEach(() => {
  cleanup()
})

describe('ErrorBox Component', () => {
  it('should render without crashing', () => {
    const { asFragment } = render(<ErrorBox />)
    expect(asFragment()).toMatchSnapshot()
  })

  it('should render without crashing', () => {
    const { asFragment } = render(<ErrorBox />)
    expect(asFragment()).toMatchSnapshot()
  })

  it('should render child element', () => {
    const { container } = render(<ErrorBox />)
    expect(container.firstChild).toBeDefined()
  })
})
