import { createSlice } from '@reduxjs/toolkit'

import api from './api'

// Slice
const initialAuth = localStorage.getItem('auth')
  ? JSON.parse(localStorage.getItem('auth'))
  : null

const slice = createSlice({
  name: 'auth',
  initialState: {
    auth: initialAuth,
    error: false
  },
  reducers: {
    loginSuccess: (state, action) => {
      state.auth = action.payload
      localStorage.setItem('auth', JSON.stringify(action.payload))
    },
    hasError: (state, action) => {
      state.error = action.payload
    },
    logoutSuccess: (state, action) => {
      state.auth = null
      localStorage.removeItem('auth')
    }
  }
})

export default slice.reducer

// Actions
const { loginSuccess, logoutSuccess, hasError } = slice.actions

export const login = ({ email, password }) => async dispatch => {
  try {
    const { data } = await api.post('/auth/login', { email, password })
    dispatch(loginSuccess(data.access_token))
  } catch (e) {
    dispatch(hasError(e.response.data.message))
  }
}

export const logout = () => async dispatch => {
  return dispatch(logoutSuccess())
}
