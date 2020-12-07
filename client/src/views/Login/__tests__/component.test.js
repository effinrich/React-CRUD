import React from 'react'
import { MemoryRouter } from 'react-router-dom'
import { Map } from 'immutable'
import { shallow, mount } from 'enzyme'
import { Provider } from 'react-redux'

import createStore from 'store'

import Login from '../component'

describe('Login View Component', () => {
  it('renders without crashing', () => {
    shallow(<Login loginUser={() => {}} />)
  })
  it('should call loginUser prop when handleSubmit is called', () => {
    const spyLoginUser = jest.fn().mockReturnValue(Promise.resolve({ error: false }))
    const fakeCreds = Map({ email: 'fake@email.com', password: 'fakePass' })
    const wrapper = shallow(<Login loginUser={spyLoginUser} />)
    wrapper.instance().handleSubmit(fakeCreds)
    expect(spyLoginUser).toHaveBeenCalled()
  })
  it('should redirect if a token is passed', () => {
    const spyLoginUser = jest.fn().mockReturnValue(Promise.resolve({ error: false }))
    const store = createStore()
    const wrapper = mount(
      <Provider store={store}>
        <MemoryRouter>
          <Login token="fake.token" loginUser={spyLoginUser} />
        </MemoryRouter>
      </Provider>
    )
    expect(wrapper.html()).toBe('')
  })
})
