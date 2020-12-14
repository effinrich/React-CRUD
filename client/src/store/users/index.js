import { createSlice } from '@reduxjs/toolkit'

import api from './api'

const slice = createSlice({
  name: 'users',
  initialState: {
    users: [],
    isCreateUserSuccess: false,
    isPatchUserSuccess: false,
    user: {
      firstName: '',
      lastName: '',
      email: ''
    },
    totalRows: null,
    perPage: null,
    currentPage: 1,
    isLoading: false,
    error: false
  },
  reducers: {
    startLoading: state => {
      state.isLoading = true
      state.isCreateUserSuccess = false
      state.isPatchUserSuccess = false
    },
    startLoadingFetchUser: state => {
      state.user = {
        firstName: '',
        lastName: '',
        email: ''
      }
    },
    hasError: (state, action) => {
      state.error = action.payload
      state.isLoading = false
    },
    fetchUsersSuccess: (state, action) => {
      state.users = action.payload.data
      state.totalRows = action.payload.total
      state.perPage = action.payload.per_page
      state.currentPage = action.payload.page
      state.isLoading = false
    },
    createUserSuccess: (state, action) => {
      state.isLoading = false
      state.isCreateUserSuccess = action.payload
    },
    fetchUserByIdSuccess: (state, action) => {
      state.user = {
        firstName: action.payload.data.first_name,
        lastName: action.payload.data.last_name,
        email: action.payload.data.email
      }
    },
    patchUserSuccess: (state, action) => {
      state.isLoading = false
      state.isPatchUserSuccess = action.payload
    },
    deleteSuccess: (state, action) => {
      state.isLoading = false
      // Little hack to keep the users visually deleted. reqres.in doesn't truly delete the user
      state.users = state.users.filter(user => action.payload !== user.id)
      state.totalRows = state.totalRows - 1
    }
  }
})

export default slice.reducer

// Actions
const {
  fetchUsersSuccess,
  startLoading,
  hasError,
  deleteSuccess,
  createUserSuccess,
  startLoadingFetchUser,
  fetchUserByIdSuccess,
  patchUserSuccess
} = slice.actions

export const fetchUsers = (page, size) => async dispatch => {
  dispatch(startLoading())
  try {
    await api
      .get(`/users?page=${page}&per_page=${size}&delay=1`)
      .then(response => dispatch(fetchUsersSuccess(response.data)))
  } catch (e) {
    dispatch(hasError(e.message))
  }
}

export const fetchUserById = userId => async dispatch => {
  dispatch(startLoadingFetchUser())
  try {
    await api
      .get(`/users/${userId}`)
      .then(response => dispatch(fetchUserByIdSuccess(response.data)))
  } catch (e) {
    dispatch(hasError(e.message))
  }
}

export const createUser = user => async dispatch => {
  dispatch(startLoading())
  try {
    await api
      .post('/users', JSON.stringify(user))
      .then(response => dispatch(createUserSuccess(true)))
  } catch (e) {
    dispatch(hasError(e.message))
  }
}

export const patchUser = user => async dispatch => {
  dispatch(startLoading())
  try {
    await api
      .patch('/users', JSON.stringify(user))
      .then(response => dispatch(patchUserSuccess(true)))
  } catch (e) {
    dispatch(hasError(e.message))
  }
}

export const deleteUser = userId => async dispatch => {
  dispatch(startLoading())
  try {
    await api
      .delete(`/users/${userId}`)
      .then(response => dispatch(deleteSuccess(userId)))
  } catch (e) {
    dispatch(hasError(e.message))
  }
}
