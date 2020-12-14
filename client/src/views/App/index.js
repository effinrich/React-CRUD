import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Switch, Route, Redirect } from 'react-router-dom'
import loadable from '@loadable/component'
import { Box, Image, ResponsiveContext, Button } from 'grommet'
import { Menu } from 'grommet-icons'

import Sidebar from 'components/Sidebar'
import PrivateRoute from 'components/PrivateRoute'
import AppBar from 'components/AppBar'
import Logo from 'assets/logo.png'

import { logout } from 'store/auth'

const Login = loadable(/* istanbul ignore next */ () => import('views/Login'))
const Dashboard = loadable(
  /* istanbul ignore next */ () => import('views/Dashboard')
)
const UserNew = loadable(
  /* istanbul ignore next */ () => import('views/UserNew')
)
const UserEdit = loadable(
  /* istanbul ignore next */ () => import('views/UserEdit')
)
const NotFound = loadable(
  /* istanbul ignore next */ () => import('views/NotFound')
)

const items = [
  {
    active: true,
    label: 'Dashboard',
    path: '/',
    exact: true
  },
  {
    active: true,
    label: 'Add User',
    path: '/add-user'
  }
]

const App = () => {
  const dispatch = useDispatch()
  const { auth } = useSelector(state => state.auth)

  const [showSidebar, setShowSidebar] = useState(false)

  const handleToggleSidebar = () => {
    setShowSidebar(!showSidebar)
  }

  const handleLogout = () => {
    dispatch(logout())
  }

  return (
    <ResponsiveContext.Consumer>
      {size => (
        <Box fill background="light-1">
          <AppBar>
            <Box>
              <Image
                fill
                src={Logo}
                style={{ width: '100%', maxWidth: '170px', height: 'auto' }}
              />
            </Box>
            {size === 'small' && auth && (
              <Box>
                <Button
                  plain
                  icon={<Menu size="medium" />}
                  onClick={() => handleToggleSidebar()}
                />
              </Box>
            )}
          </AppBar>
          <Box direction="row" fill>
            {(!showSidebar || size !== 'small') && auth && (
              <Sidebar
                items={items}
                onToggleSidebar={handleToggleSidebar}
                onLogoutClick={handleLogout}
              />
            )}
            <Box flex>
              <Switch>
                <Route exact path="/login" component={Login} />
                <PrivateRoute exact path="/" component={Dashboard} />
                <PrivateRoute path="/edit-user/:id" component={UserEdit} />
                <PrivateRoute path="/add-user" component={UserNew} />
                <Route render={() => <Redirect to="/login" />} />
                <Route component={NotFound} />
              </Switch>
            </Box>
          </Box>
        </Box>
      )}
    </ResponsiveContext.Consumer>
  )
}

export default App
