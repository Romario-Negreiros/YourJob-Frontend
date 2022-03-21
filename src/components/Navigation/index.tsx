import React from 'react'

import { useNavigate } from 'react-router-dom'

import Box from '@mui/material/Box'
import Button from '@mui/material/Button'

const Navigation: React.FC = () => {
  const navigate = useNavigate()

  return (
    <Box
      sx={{
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'stretch',
        justifyContent: 'center',
        gap: '5px',
        '@media screen and (min-width: 350px)': {
          flexDirection: 'row'
        }
      }}
    >
      <Button variant="outlined" color="secondary" onClick={() => navigate('/companies')}>
        Companies
      </Button>
      <Button variant="outlined" color="secondary" onClick={() => navigate('/users')}>
        Users
      </Button>
      <Button variant="outlined" color="secondary" onClick={() => navigate('/vagancies')}>
        Vagancies
      </Button>
    </Box>
  )
}

export default Navigation
