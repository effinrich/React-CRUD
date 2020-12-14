import React from 'react'
import PropTypes from 'prop-types'

import { Box, Text } from 'grommet'
import RoutedButton from './RoutedButton'

const MenuButton = ({ label, ...rest }) => {
  return (
    <RoutedButton hoverIndicator={{ color: 'control' }} {...rest}>
      <Box pad="small" gap="xsmall" justify="center">
        <Text>{label}</Text>
      </Box>
    </RoutedButton>
  )
}

MenuButton.propTypes = {
  label: PropTypes.string
}

export default MenuButton
