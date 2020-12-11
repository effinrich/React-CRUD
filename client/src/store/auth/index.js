/* eslint-disable no-console */
import { createSlice } from '@reduxjs/toolkit'

import api from './api'

// Slice
const initialAuth = localStorage.getItem('auth')
  ? JSON.parse(localStorage.getItem('auth'))
  : null

const slice = createSlice({
  name: 'auth',
  initialState: {
    auth: initialAuth
  },
  reducers: {
    loginSuccess: (state, action) => {
      console.log(state, action.payload)
      state.auth = action.payload
      localStorage.setItem('auth', JSON.stringify(action.payload))
    },
    logoutSuccess: (state, action) => {
      state.auth = null
      localStorage.removeItem('auth')
    }
  }
})

export default slice.reducer

// Actions
const { loginSuccess, logoutSuccess } = slice.actions

export const login = ({ email, password }) => async dispatch => {
  try {
    const { data } = await api.post('/auth/login', { email, password })
    dispatch(loginSuccess(data.access_token))
  } catch (e) {
    return console.error(e.message)
  }
}

export const logout = () => async dispatch => {
  try {
    return dispatch(logoutSuccess())
  } catch (e) {
    return console.error(e.message)
  }
}
