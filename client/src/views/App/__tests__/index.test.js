import React from 'react'

import { render, cleanup, screen } from 'utils/testUtils/helperRtl'

import App from '../index'

afterEach(cleanup)

describe('App View Component', () => {
  it('renders without crashing', () => {
    const { asFragment } = render(<App />)
    expect(asFragment()).toMatchSnapshot()
  })

  it('renders <AppBar />', async () => {
    render(<App />)
    expect(screen.getByTestId('app-bar')).toBeInTheDocument()
  })

  // it('renders loadable/lazy components (code-splitting)', async () => {
  //   // this is how you render a component that has it's own suspense.
  //   // no need to render our own suspense in the test.
  //   render(<App />)
  //   // localStorage.setItem('auth', '2iouj2r0fijeojfnow;ncoscind')
  //   const lazyDashboard = await screen.getByText(/welcome/i)
  //   expect(lazyDashboard).toBeInTheDocument()
  // })
})
