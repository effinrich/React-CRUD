/** @format */
import React, { useEffect, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Avatar, Box, Button } from 'grommet'
import { Edit, Trash } from 'grommet-icons'
import DataTable from 'react-data-table-component'
import styled from 'styled-components'
import { space } from 'styled-system'

import PageHeader from 'components/PageHeader'
import RoutedButton from 'components/RoutedButton'
import Notification from 'components/Notification'

import { fetchUsers, deleteUser } from 'store/users'

const StyledDashboard = styled(Box)`
  ${space};
`

const customStyles = {
  cells: {
    style: {
      minHeight: '60px'
    }
  }
}

const Dashboard = () => {
  const dispatch = useDispatch()
  const {
    users,
    isLoading,
    isCreateUserSuccess,
    isPatchUserSuccess,
    totalRows,
    perPage,
    currentPage
  } = useSelector(state => state.users)

  const handleFetchUsers = useCallback(
    (page, size = perPage) => {
      dispatch(fetchUsers(page, size))
    },
    [dispatch, perPage]
  )

  const handleDeleteUser = useCallback(
    row => {
      // see the store action for how i'm handling the delete effect
      dispatch(deleteUser(row.id))
    },
    [dispatch]
  )

  useEffect(() => {
    handleFetchUsers(1, 10)
  }, [handleFetchUsers])

  const columns = [
    {
      cell: row => (
        <RoutedButton
          plain
          path={`/edit-user/${row.id}`}
          icon={<Edit color="status-ok" />}
        />
      ),
      width: '65px'
    },
    {
      cell: row => (
        <Button
          plain
          onClick={() => handleDeleteUser(row)}
          icon={<Trash color="status-error" />}
        />
      ),
      width: '65px'
    },
    {
      cell: row => <Avatar src={row.avatar} size="medium" />,
      button: false
    },
    {
      selector: 'first_name',
      name: 'First name',
      primary: true
    },
    {
      selector: 'last_name',
      name: 'Last Name'
    },
    {
      selector: 'email',
      name: 'Email',
      sortable: true
    },
    {
      selector: 'id',
      name: 'ID',
      sortable: true,
      right: true
    }
  ]

  const handlePageChange = page => {
    handleFetchUsers(page)
  }

  const handlePerRowsChange = async (newPerPage, page) => {
    handleFetchUsers(page, newPerPage)
  }

  return (
    <StyledDashboard flex={false} pad="medium">
      <PageHeader
        name="Dashboard"
        headerElement={
          <RoutedButton
            label="Add New User"
            primary
            size="small"
            path="/add-user"
          />
        }
      />
      <Box
        width="100%"
        pad="medium"
        round="small"
        background="white"
        fill
        elevation="small"
      >
        <DataTable
          striped
          customStyles={customStyles}
          columns={columns}
          data={users}
          disabled={isLoading}
          pagination
          paginationServer
          paginationTotalRows={totalRows}
          paginationDefaultPage={currentPage}
          onChangeRowsPerPage={handlePerRowsChange}
          onChangePage={handlePageChange}
        />
      </Box>
      <Notification isReady={isCreateUserSuccess || isPatchUserSuccess} />
    </StyledDashboard>
  )
}

export default Dashboard
