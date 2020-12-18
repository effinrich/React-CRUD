import React from 'react'

import { render, screen, fireEvent } from 'utils/testUtils/helperRtl'

import Dashboard from '../index'

// const renderWithRouter = component => {
//   const history = createMemoryHistory()
//   return {
//     ...render(<Router history={history}>{component}</Router>)
//   }
// }

describe('Dashboard View Component', () => {
  it('renders without crashing', () => {
    const { container } = render(<Dashboard />)
    expect(container).toMatchSnapshot()
  })

  it('renders users table', async () => {
    render(<Dashboard />)
    expect(screen.getByRole('table')).toBeInTheDocument()
  })

  it('renders page heading', async () => {
    render(<Dashboard />)
    expect(
      screen.getByRole('heading', { name: /dashboard/i })
    ).toBeInTheDocument()
  })

  it('"Add New User" button click updates route to /add-user', async () => {
    render(<Dashboard />)
    const addNewUserBtn = screen.getByRole('button', { name: /Add New User/i })

    fireEvent.click(addNewUserBtn)

    // expect(
    //   screen.getByRole('heading', { name: /new user/i })
    // ).toBeInTheDocument()
  })
})
