import React from 'react'
import { MemoryRouter } from 'react-router-dom'
import { reducer as formReducer, SubmissionError } from 'redux-form'
import { createStore, combineReducers } from 'redux'
import { Provider } from 'react-redux'
import { mount } from 'enzyme'

import LoginForm from '../LoginForm'

describe('LoginForm', () => {
  const buildTarget = props => {
    const store = createStore(combineReducers({ form: formReducer }))
    return (
      <Provider store={store}>
        <MemoryRouter>
          <LoginForm {...props} />
        </MemoryRouter>
      </Provider>
    )
  }

  const buildAndFillValidForm = props => {
    const wrapper = mount(buildTarget(props))
    const form = wrapper.find('form')
    const emailInput = wrapper.find('input[name="email"]')
    const passwordInput = wrapper.find('input[name="password"]')
    emailInput.simulate('change', { target: { value: 'adam@duromedia.com' } })
    passwordInput.simulate('change', { target: { value: 'fakepass' } })

    return { wrapper, form }
  }

  it('should call handleSubmit if form is valid and submitted', () => {
    const onSubmit = jest.fn().mockImplementation(() => Promise.resolve())
    const { form } = buildAndFillValidForm({ onSubmit })
    form.simulate('submit')
    expect(onSubmit).toHaveBeenCalledTimes(1)
  })

  it('should not call handleSubmit if form is not valid', () => {
    const onSubmit = jest.fn().mockReturnValue(Promise.resolve())
    const wrapper = mount(buildTarget({ onSubmit }))
    const form = wrapper.find('form')
    const emailInput = wrapper.find('input[name="email"]')
    const passwordInput = wrapper.find('input[name="password"]')

    form.simulate('submit')
    expect(onSubmit).not.toHaveBeenCalled()

    emailInput.simulate('change', { target: { value: 'adam@duromedia.com' } })
    form.simulate('submit')
    expect(onSubmit).not.toHaveBeenCalled()

    emailInput.simulate('change', { target: { value: '' } })
    passwordInput.simulate('change', { target: { value: 'fakePass' } })
    form.simulate('submit')
    expect(onSubmit).not.toHaveBeenCalled()
  })

  it('should render <ErrorPencil /> if form submission error', async () => {
    const onSubmit = jest
      .fn()
      .mockImplementation(() =>
        Promise.reject(new SubmissionError({ _error: 'Houston we have a problem' }))
      )
    const { wrapper, form } = buildAndFillValidForm({ onSubmit })
    form.simulate('submit')
    expect(onSubmit).toHaveBeenCalledTimes(1)
    await new Promise(resolve => setTimeout(resolve, 10))
    wrapper.update()
    expect(wrapper.find('ErrorPencil')).toHaveLength(1)
  })
})
