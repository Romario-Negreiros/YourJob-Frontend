import React from 'react'

import useStyles from '../../styles/global'

import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'

const ForgotPassword: React.FC = () => {
  const classes = useStyles()

  return (
    <Box className={classes.box2} sx={{ bgcolor: 'secondary' }}>
      <Paper elevation={8} className={classes.paper2}>
        <Typography variant="body1">Insert a valid email to receive a reset password link</Typography>

        <TextField label="Email" sx={{ width: 240, mt: 4 }} />

        <Button variant="contained" type="submit" sx={{ mt: 5 }}>Send reset password email</Button>
      </Paper>
    </Box>
  )
}

export default ForgotPassword
