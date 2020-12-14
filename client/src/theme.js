import { grommet } from 'grommet'
import { deepMerge } from 'grommet/utils'

export const theme = deepMerge(grommet, {
  global: {
    colors: {
      active: 'control',
      placeholder: 'dark-1',
      brand: '#372F30',
      control: '#363636'
    },
    active: {
      background: {
        opacity: 0.75
      }
    },
    elevation: {
      light: {
        xsmall: '0 1px 3px rgba(0,0,0,0.20)',
        small: '0px 1px 4px rgba(0,0,0,0.20)'
      }
    },
    font: {
      size: '16px',
      height: '20px'
    },
    input: {
      weight: 400
    },
    size: {
      avatar: '36px',
      sidebar: '60px'
    }
  },
  paragraph: {
    medium: {
      size: '16px',
      height: '20px'
    },
    large: {
      size: '20px',
      height: '24px'
    }
  },
  button: {
    border: {
      radius: '12px'
    },
    color: '#ffeb3b',
    default: {
      color: '#ffeb3b'
    },
    primary: {
      background: { color: 'brand' }
    },
    hover: {
      default: {
        background: { color: 'control' }
      },
      primary: {
        color: '#ffeb3b',
        background: { color: 'brand', opacity: 0.9 }
      }
    }
  }
})
