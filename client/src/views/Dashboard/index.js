/** @format */
/* eslint-disable no-console */
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import { space } from 'styled-system'

import { fetchUsers } from 'store/users'

const StyledDashboard = styled.div`
  ${space};
`

const Dashboard = () => {
  const dispatch = useDispatch()
  const { users, isLoading } = useSelector(state => state.users)

  useEffect(() => {
    dispatch(fetchUsers())
  }, [dispatch])

  console.log(users, isLoading)

  return <StyledDashboard>Hello</StyledDashboard>
}

export default Dashboard
