import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { FormClose, StatusGood } from 'grommet-icons'
import { Box, Button, Layer, Text } from 'grommet'

const NotificationLayer = ({ isReady }) => {
  const [open, setOpen] = useState()

  const onOpen = () => {
    setOpen(true)
    setTimeout(() => {
      setOpen(undefined)
    }, 5000)
  }

  const onClose = () => setOpen(undefined)

  useEffect(() => {
    if (isReady) {
      onOpen()
    }
  }, [isReady])

  return (
    <Layer
      position="top"
      modal={false}
      margin={{ vertical: 'medium', horizontal: 'small' }}
      onEsc={onClose}
      responsive={false}
      plain
    >
      {open && (
        <Box
          align="center"
          direction="row"
          gap="small"
          justify="between"
          round="small"
          elevation="small"
          pad={{ vertical: 'xsmall', horizontal: 'small' }}
          background="status-ok"
        >
          <Box align="center" direction="row" gap="xsmall">
            <StatusGood color="white" />
            <Text color="white">
              A user has been successfully created or modified (this
              notification will close after 5 seconds)
            </Text>
          </Box>
          <Button icon={<FormClose color="white" />} onClick={onClose} plain />
        </Box>
      )}
    </Layer>
  )
}

NotificationLayer.propTypes = {
  isReady: PropTypes.bool
}

export default NotificationLayer
