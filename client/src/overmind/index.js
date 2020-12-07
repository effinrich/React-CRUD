/** @format */

import { Overmind } from 'overmind'
import { createHook } from 'overmind-react'

const overmind = new Overmind({
  state: {
    isLoadingUsers: true,
    showCount: '10',
    users: [],
    filteredUsers: state => state.users.slice(0, state.showCount)
  },
  actions: {
    getUsers: async ({ state, effects }) => {
      state.isLoadingUsers = true
      state.users = await effects.request('https://reqres.in/api/users')
      state.isLoadingUsers = false
    },
    changeShowCount: ({ state }, event) => {
      state.showCount = event.target.value
    }
  },
  effects: {
    request: async url => {
      const response = await fetch(url)
      return response.json()
    }
  }
})

export const useOvermind = createHook(overmind)
