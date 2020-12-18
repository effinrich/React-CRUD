import React from 'react'

import { render, screen } from 'utils/testUtils/helperRtl'

import App from '../index'

describe('App View Component', () => {
  it('renders without crashing', () => {
    const { container } = render(<App />)
    expect(container).toMatchSnapshot()
  })

  it('renders <AppBar />', async () => {
    render(<App />)
    expect(screen.getByTestId('app-bar')).toBeInTheDocument()
  })
})
