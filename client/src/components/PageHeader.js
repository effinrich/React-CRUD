import React from 'react'
import PropTypes from 'prop-types'
import { Box, Heading } from 'grommet'

const PageHeader = ({ name, headerElement }) => (
  <Box
    flex={false}
    margin={{ bottom: 'medium' }}
    justify="between"
    align="center"
    direction="row"
    border={{ side: 'bottom', color: 'light-4' }}
  >
    <Heading level={1} size="xsmall" margin={{ top: 'xsmall' }}>
      {name}
    </Heading>
    {headerElement && <Box alignSelf="center">{headerElement}</Box>}
  </Box>
)

PageHeader.propTypes = {
  name: PropTypes.string,
  headerElement: PropTypes.node
}

export default PageHeader
