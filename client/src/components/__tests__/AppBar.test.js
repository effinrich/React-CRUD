import React from 'react'
import { Box, Image, Button } from 'grommet'
import { Menu } from 'grommet-icons'

import { render, screen } from 'utils/testUtils/helperRtl'
import Logo from 'assets/logo.png'

import AppBar from '../AppBar'

const children = () => (
  <div>
    <Box>
      <Image
        fill
        alt="logo"
        src={Logo}
        style={{ width: '100%', maxWidth: '170px', height: 'auto' }}
      />
    </Box>

    <Box>
      <Button plain icon={<Menu size="medium" />} />
    </Box>
  </div>
)

describe('AppBar Component', () => {
  it('should render without crashing', () => {
    const { container } = render(<AppBar />)
    expect(container).toMatchSnapshot()
  })

  it('should render a logo image', () => {
    const { getByAltText } = render(<AppBar children={children()} />)
    expect(getByAltText(/logo/i)).toBeInTheDocument()
  })

  it('should render a menu button', () => {
    render(<AppBar children={children()} />)
    expect(screen.getByRole('button', { name: /Menu/i })).toBeInTheDocument()
  })
})
