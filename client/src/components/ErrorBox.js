import React from 'react'
import PropTypes from 'prop-types'
import { Box } from 'grommet'

const ErrorBox = ({ children }) => {
  return (
    <Box
      align="center"
      animation="fadeIn"
      background="rgb(202, 25, 0)"
      round="xsmall"
      pad="small"
      margin={{ top: '15px' }}
      pt={3}
    >
      {children}
    </Box>
  )
}

ErrorBox.propTypes = {
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.node])
}

export default ErrorBox
