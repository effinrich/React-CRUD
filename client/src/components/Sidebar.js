import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import { Box, Button, Layer, ResponsiveContext } from 'grommet'
import { FormClose } from 'grommet-icons'

import MenuButton from './MenuButton'

const Sidebar = ({ items = [], onToggleSidebar, onLogoutClick, ...rest }) => {
  const size = useContext(ResponsiveContext)

  const SidebarContent = () => (
    <Box fill background="#555">
      {size === 'small' && (
        <Box align="end" background="#372F30">
          <Button
            icon={<FormClose size="medium" />}
            onClick={onToggleSidebar}
          />
        </Box>
      )}
      {items.map(({ active, exact, label, path }) => (
        <MenuButton
          active={active}
          exact={exact}
          path={path}
          label={label}
          key={label}
        />
      ))}
      <MenuButton onClick={() => onLogoutClick()} label="Logout" />
    </Box>
  )

  return (
    <div>
      {size === 'small' ? (
        <Layer {...rest}>
          <SidebarContent />
        </Layer>
      ) : (
        <Box
          fill="vertical"
          width="small"
          background="#555"
          elevation="xsmall"
          {...rest}
        >
          <SidebarContent />
        </Box>
      )}
    </div>
  )
}

Sidebar.propTypes = {
  items: PropTypes.array,
  onToggleSidebar: PropTypes.func,
  onLogoutClick: PropTypes.func
}

export default Sidebar
