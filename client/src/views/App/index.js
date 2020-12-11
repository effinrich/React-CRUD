/** @format */
import React, { useState } from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import loadable from '@loadable/component'
import {
  Box,
  Button,
  Collapsible,
  // Main,
  // Heading,
  // DropButton,
  Grommet,
  Image,
  ResponsiveContext,
  Layer
} from 'grommet'
import { FormClose /*, Menu*/ } from 'grommet-icons'

import PrivateRoute from 'components/PrivateRoute'

import Logo from './logo.png'

const Login = loadable(/* istanbul ignore next */ () => import('views/Login'))
const Dashboard = loadable(
  /* istanbul ignore next */ () => import('views/Dashboard')
)

const theme = {
  global: {
    colors: {
      brand: '#372F30',
      control: '#363636'
    },
    font: {
      family: 'Roboto',
      size: '18px',
      height: '20px'
    }
  }
}

const AppBar = props => (
  <Box
    tag="header"
    direction="row"
    align="center"
    justify="between"
    background="brand"
    pad={{ left: 'medium', right: 'small', vertical: 'small' }}
    elevation="medium"
    style={{ zIndex: '1' }}
    {...props}
  />
)

const App = () => {
  const [showSidebar, setShowSidebar] = useState(false)

  return (
    <Grommet theme={theme} full>
      <ResponsiveContext.Consumer>
        {size => (
          <Box fill>
            <AppBar>
              <Image
                fill
                src={Logo}
                style={{ width: '100%', maxWidth: '170px', height: 'auto' }}
              />
              {/* <DropButton
                icon={<Menu />}
                dropAlign={{ top: 'bottom', right: 'right' }}
                items={[
                  {
                    label: 'Logout',
                    onClick: () => setShowSidebar(!showSidebar),
                  },
                ]}
                // onClick={() => setShowSidebar(!showSidebar)}
              /> */}
            </AppBar>
            <Box direction="row" flex overflow={{ horizontal: 'hidden' }}>
              <Box flex align="center" justify="center">
                <Switch>
                  <Route exact path="/login" component={Login} />
                  <PrivateRoute exact path="/dashboard" component={Dashboard} />
                  <Route render={() => <Redirect to="/login" />} />
                </Switch>
              </Box>
              {!showSidebar || size !== 'small' ? (
                <Collapsible direction="horizontal" open={showSidebar}>
                  <Box
                    flex
                    width="medium"
                    background="light-2"
                    elevation="small"
                    align="center"
                    justify="center"
                  >
                    sidebar
                  </Box>
                </Collapsible>
              ) : (
                <Layer>
                  <Box
                    background="light-2"
                    tag="header"
                    justify="end"
                    align="center"
                    direction="row"
                  >
                    <Button
                      icon={<FormClose />}
                      onClick={() => setShowSidebar(false)}
                    />
                  </Box>
                  <Box
                    fill
                    background="light-2"
                    align="center"
                    justify="center"
                  >
                    sidebar
                  </Box>
                </Layer>
              )}
            </Box>
          </Box>
        )}
      </ResponsiveContext.Consumer>
    </Grommet>
  )
}

export default App
