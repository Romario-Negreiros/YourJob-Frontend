import React from 'react'

import useStyles from './styles'

import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

const Footer: React.FC = () => {
  const classes = useStyles()

  return (
    <Box component="footer" className={classes.box}>
      <Typography variant="h6" component="div" color="common.white">
        YourJob
      </Typography>
      <Typography variant="caption" component="div" color="common.white">
        &copy;RomarioNegreiros
      </Typography>
    </Box>
  )
}

export default Footer
