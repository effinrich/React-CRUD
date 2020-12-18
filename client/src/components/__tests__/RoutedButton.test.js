import React from 'react'

import { render } from 'utils/testUtils/helperRtl'

import RoutedButton from '../RoutedButton'

describe('RoutedButton Component', () => {
  it('should render without crashing', () => {
    const { container } = render(<RoutedButton />)
    expect(container).toMatchSnapshot()
  })

  it('should render child element', () => {
    const { container } = render(<RoutedButton />)
    expect(container.firstChild).toBeDefined()
  })
})
