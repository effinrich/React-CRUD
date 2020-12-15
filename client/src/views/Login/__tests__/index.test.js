import React from 'react'

import {
  render,
  cleanup,
  fireEvent,
  waitFor,
  // screen
  act
} from 'utils/testUtils/helperRtl'

import Login from '../index'

afterEach(() => {
  cleanup()
})

describe('Login View Component', () => {
  beforeEach(() => {
    Object.defineProperty(window, 'localStorage', {
      value: {
        getItem: jest.fn(() => null),
        setItem: jest.fn(() => null)
      },
      writable: true
    })
  })

  it('should render without crashing', () => {
    const { asFragment } = render(<Login />)
    expect(asFragment()).toMatchSnapshot()
  })

  it('should not call login if form is incomplete', async () => {
    const promise = Promise.resolve()
    const handleSubmit = jest.fn(() => promise)

    const { getByLabelText, getByText } = render(
      <Login onSubmit={handleSubmit} />
    )

    fireEvent.change(getByLabelText('Email'), {
      target: { value: 'test@emailing.com' }
    })

    getByText('Login').click()

    await waitFor(() => expect(handleSubmit).not.toHaveBeenCalled())
  })

  it('should call login if form valid', async () => {
    const promise = Promise.resolve()
    const handleSubmit = jest.fn(() => promise)

    const { getByLabelText, getByText } = render(
      <Login onSubmit={handleSubmit} />
    )

    await waitFor(() => {
      fireEvent.change(getByLabelText('Email'), {
        target: { name: 'email', value: 'test@tester.com' }
      })
    })

    await waitFor(() => {
      fireEvent.change(getByLabelText('Email'), {
        target: { name: 'email', value: 'test@tester.com' }
      })
    })

    await waitFor(() => {
      fireEvent.change(getByLabelText('Password'), {
        target: { name: 'password', value: 'tester' }
      })
    })

    await waitFor(() => {
      getByText('Login').click()
    })

    setTimeout(
      () =>
        expect(handleSubmit).toHaveBeenCalledWith(
          {
            email: 'admin@epcvip.com',
            password: 'admin'
          },
          expect.anything()
        ),
      1000
    )
    await act(() => promise)
  })
})
