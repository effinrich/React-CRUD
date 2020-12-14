import React from 'react'
import PropTypes from 'prop-types'
import { matchPath, withRouter } from 'react-router'
import { Button, Tip } from 'grommet'

// A simple component that shows the pathname of the current location
const RoutedButton = ({
  active,
  exact,
  match,
  location,
  history,
  path,
  strict,
  onClick,
  tooltipContent,
  ...rest
}) => {
  const pathMatch = matchPath(location.pathname, { exact, path, strict })

  const handleOnClick = event => {
    event.preventDefault()

    if (onClick) {
      onClick(event)
    }

    history.push(path)
    event.stopPropagation()
  }

  return tooltipContent ? (
    <Tip content={tooltipContent}>
      <Button
        active={active && !!pathMatch}
        onClick={handleOnClick}
        {...rest}
      />
    </Tip>
  ) : (
    <Button active={active && !!pathMatch} onClick={handleOnClick} {...rest} />
  )
}

RoutedButton.propTypes = {
  location: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  path: PropTypes.string,
  active: PropTypes.bool,
  exact: PropTypes.bool,
  match: PropTypes.object,
  strict: PropTypes.bool,
  onClick: PropTypes.func,
  tooltipContent: PropTypes.string
}

export default withRouter(RoutedButton)
