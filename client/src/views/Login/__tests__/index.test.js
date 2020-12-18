import React from 'react'
import { withFormik } from 'formik'

import {
  render,
  fireEvent,
  waitFor,
  // screen
  act
} from 'utils/testUtils/helperRtl'

import Login from '../index'

const initialValues = {
  email: 'test@tester.com',
  password: 'tester'
}

const renderWithFormik = (options, props) => {
  let injected: any

  const FormikForm = withFormik({
    mapPropsToValues: () => initialValues,
    handleSubmit: () => {},
    ...options
  })(props => (injected = props) && <Login {...props} />)

  return {
    getProps() {
      return injected
    },
    ...render(<FormikForm {...props} />)
  }
}

describe('Login View Component', () => {
  it('should render without crashing', () => {
    const { container } = renderWithFormik()
    expect(container).toMatchSnapshot()
  })

  it('should render child element', () => {
    const { container } = renderWithFormik()
    expect(container.firstChild).toBeDefined()
  })

  it('should call validationSchema', async () => {
    const validate = jest.fn(() => Promise.resolve())
    const { getProps } = renderWithFormik({
      validationSchema: { validate }
    })

    act(() => {
      getProps().submitForm()
    })
    await waitFor(() => expect(validate).toHaveBeenCalled())
  })

  it('should not call login if form is incomplete', async () => {
    const promise = Promise.resolve()
    const handleSubmit = jest.fn(() => promise)

    const { getByLabelText, getByText } = renderWithFormik()

    fireEvent.change(getByLabelText('Email'), {
      target: { value: 'test@emailing.com' }
    })

    getByText('Login').click()

    await waitFor(() => expect(handleSubmit).not.toHaveBeenCalled())
  })

  it('should call login if form valid', async () => {
    const promise = Promise.resolve()
    const handleSubmit = jest.fn(() => promise)

    const { getByLabelText, getByText, getProps } = renderWithFormik({
      handleSubmit
    })

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

    act(() => {
      getProps().submitForm()
    })

    await waitFor(() =>
      expect(handleSubmit).toHaveBeenCalledWith(
        {
          email: 'test@tester.com',
          password: 'tester'
        },
        expect.anything()
      )
    )
  })
})
