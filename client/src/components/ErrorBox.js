import React from 'react'
import PropTypes from 'prop-types'
import { Box, Text } from 'grommet'

const ErrorBox = ({ children }) => {
  return (
    <Box
      align="center"
      animation="fadeIn"
      background="status-error"
      round="small"
      pad="small"
      margin={{ top: '15px' }}
    >
      <Text weight={600}>{children}</Text>
    </Box>
  )
}

ErrorBox.propTypes = {
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.node])
}

export default ErrorBox
