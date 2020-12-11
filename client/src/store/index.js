import { configureStore } from '@reduxjs/toolkit'
import { combineReducers } from 'redux'

import auth from './auth'
import users from './users'

const reducer = combineReducers({
  auth,
  users
})

const store = configureStore({
  reducer
})

export default store
