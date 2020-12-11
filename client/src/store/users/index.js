/* eslint-disable no-console */
import { createSlice } from '@reduxjs/toolkit'

import api from './api'

const slice = createSlice({
  name: 'users',
  initialState: {
    users: [],
    isLoading: false,
    error: false
  },
  reducers: {
    startLoading: state => {
      state.isLoading = true
    },
    hasError: (state, action) => {
      state.error = action.payload
      state.isLoading = false
    },
    usersSuccess: (state, action) => {
      state.users = action.payload
      state.isLoading = false
    }
  }
})

export default slice.reducer

// Actions
const { usersSuccess, startLoading, hasError } = slice.actions

export const fetchUsers = () => async dispatch => {
  dispatch(startLoading())
  try {
    await api
      .get('/users')
      .then(response => dispatch(usersSuccess(response.data)))
  } catch (e) {
    dispatch(hasError(e.message))
  }
}
