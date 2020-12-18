import React from 'react'
import PropTypes from 'prop-types'
import { Redirect, Route } from 'react-router-dom'

const PrivateRoute = ({ component: Component, location, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      localStorage.getItem('auth') ? (
        <Component {...props} />
      ) : (
        <Redirect to={{ pathname: '/login', state: { from: location } }} />
      )
    }
  />
)

PrivateRoute.propTypes = {
  component: PropTypes.object,
  location: PropTypes.object
}

export default PrivateRoute
