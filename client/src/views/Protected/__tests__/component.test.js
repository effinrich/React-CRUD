import React from 'react'
import { mount } from 'enzyme'
import { MemoryRouter } from 'react-router-dom'
import { act } from 'react-dom/test-utils'

import { User } from 'models'
import MockLDProvider from 'utils/testing/MockLDProvider'

jest.mock('../../Admin/container', () => {
  const MockAdmin = () => null
  return MockAdmin
})

jest.mock('../../Partner/component', () => {
  const MockPartner = () => null
  return MockPartner
})

jest.mock('../../PartnerV3/component', () => {
  const MockPartnerV3 = () => null
  return MockPartnerV3
})

const Protected = require('../component').default

// eslint-disable-next-line
const ProtectedWrapper = ({ flags, ...props }) => (
  <MemoryRouter initialEntries={['/dashboard']} initialIndex={0}>
    <MockLDProvider flags={flags}>
      <Protected {...props} />
    </MockLDProvider>
  </MemoryRouter>
)

describe('Protected View Component', () => {
  it('renders without crashing', async () => {
    const spyFetchMe = jest.fn().mockReturnValue(Promise.resolve({ error: false }))
    const me = new User({ profile: { name: 'Chuck Bronson' }, geo: [-118, 32] })
    mount(<ProtectedWrapper me={me} fetchMe={spyFetchMe} />)
    await act(() => new Promise(setImmediate))
  })

  it('renders <LoadingView /> if no me', () => {
    const spyFetchMe = jest.fn().mockReturnValue(Promise.resolve({ error: false }))
    const wrapper = mount(<ProtectedWrapper fetchMe={spyFetchMe} />)
    expect(wrapper.find('LoadingView')).toHaveLength(1)
  })

  it('should call fetchMe if isMeLoaded is false', async () => {
    const me = new User()
    const spyFetchMe = jest.fn().mockReturnValue(Promise.resolve({ error: false }))
    mount(<ProtectedWrapper me={me} isMeLoaded={false} fetchMe={spyFetchMe} />)
    await act(() => new Promise(setImmediate))
    expect(spyFetchMe).toHaveBeenCalled()
  })

  it('should not call fetchMe if isMeLoaded is true', async () => {
    const me = new User({ profile: { name: 'Chuck Bronson' }, geo: [-118, 32] })
    const spyFetchMe = jest.fn().mockReturnValue(Promise.resolve({ error: false }))
    mount(<ProtectedWrapper me={me} isMeLoaded fetchMe={spyFetchMe} />)
    await act(() => new Promise(setImmediate))
    expect(spyFetchMe).not.toHaveBeenCalled()
  })

  describe('Role Routing', () => {
    it('renders AdminComponent if me is admin', async () => {
      const spyFetchMe = jest.fn().mockReturnValue(Promise.resolve({ error: false }))
      const me = new User({
        profile: { name: 'Chuck Bronson' },
        roles: ['admin', 'superadmin'],
        geo: [-118, 32]
      })
      const wrapper = mount(<ProtectedWrapper me={me} fetchMe={spyFetchMe} />)
      await act(() => new Promise(setImmediate))
      wrapper.update()
      expect(wrapper.find('MockAdmin').length).toBe(1)
    })
    it('renders PartnerComponent if me is NOT admin', async () => {
      const spyFetchMe = jest.fn().mockReturnValue(Promise.resolve({ error: false }))
      const me = new User({
        profile: { name: 'Chuck Bronson' },
        roles: ['partner'],
        geo: [-118, 32]
      })
      const wrapper = mount(<ProtectedWrapper me={me} fetchMe={spyFetchMe} />)
      await act(() => new Promise(setImmediate))
      wrapper.update()
      expect(wrapper.find('MockPartner').length).toBe(1)
    })
    it('renders PartnerV3Component if me is NOT admin and portalPartner3 feature flag is on', async () => {
      const spyFetchMe = jest.fn().mockReturnValue(Promise.resolve({ error: false }))
      const me = new User({
        profile: { name: 'Chuck Bronson' },
        roles: ['partner'],
        geo: [-118, 32]
      })
      const wrapper = mount(
        <ProtectedWrapper me={me} fetchMe={spyFetchMe} flags={{ portalPartner3: true }} />
      )
      await act(() => new Promise(setImmediate))
      wrapper.update()
      expect(wrapper.find('MockPartnerV3').length).toBe(1)
    })
  })
  // it('it should call componentDidUpdate and logoutUser if 401 error', () => {
  //   const spyLogoutUser = jest.fn()
  //   const wrapper = mount(<ProtectedWrapper fetchMe={() => {}} logoutUser={spyLogoutUser} />)
  //   wrapper.instance().componentDidUpdate({ error: 'text error', errorCode: 401 })
  //   expect(spyLogoutUser).toHaveBeenCalled()
  // })
  it('it should not logoutUser if not 401 error', async () => {
    const spyFetchMe = jest.fn().mockReturnValue(Promise.resolve({ error: false }))
    const spyLogoutUser = jest.fn()
    mount(<ProtectedWrapper fetchMe={spyFetchMe} logoutUser={spyLogoutUser} />)
    expect(spyLogoutUser).not.toHaveBeenCalled()
  })
  it('it should not logoutUser if no error', async () => {
    const spyFetchMe = jest.fn().mockReturnValue(Promise.resolve({ error: false }))
    const spyLogoutUser = jest.fn()
    mount(<ProtectedWrapper fetchMe={spyFetchMe} logoutUser={spyLogoutUser} />)
    expect(spyLogoutUser).not.toHaveBeenCalled()
  })
  it('it should call fetchMe if current token !== newToken', async () => {
    const spyFetchMe = jest.fn().mockReturnValue(Promise.resolve({ error: false }))
    const wrapper = mount(<ProtectedWrapper fetchMe={spyFetchMe} token="fake.token" />)
    wrapper.setProps({ token: 'fake.newToken' })
    await act(() => new Promise(setImmediate))
    expect(spyFetchMe).toHaveBeenCalled()
  })
  it('it should update window.location if current me._id !== newMe._id', async () => {
    const spyFetchMe = jest.fn().mockReturnValue(Promise.resolve({ error: false }))
    window.location.assign = jest.fn()
    const me = new User({ _id: '1234', geo: [-118, 32] })
    const newMe = new User({ _id: '5678', geo: [-118, 32] })
    // const store = createStore()
    const wrapper = mount(<ProtectedWrapper me={me} fetchMe={spyFetchMe} />)
    wrapper.setProps({ me: newMe })
    await act(() => new Promise(setImmediate))
    expect(window.location.assign).toBeCalledWith('/')
  })
})
