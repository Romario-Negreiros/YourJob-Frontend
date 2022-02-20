import React from 'react'

import useStyles from './styles'

import Grid from '@mui/material/Grid'
import TextField from '@mui/material/TextField'

const AuthForm: React.FC = () => {
  const classes = useStyles()

  return (
    <Grid container className={classes.grid} rowSpacing={4}>
      <Grid item xs={12} sm={6} sx={{ textAlign: 'center' }}>
        <TextField label="Name" sx={{ width: 240 }} />
      </Grid>
      <Grid item xs={12} sm={6} sx={{ textAlign: 'center' }}>
        <TextField label="Email" sx={{ width: 240 }} />
      </Grid>
      <Grid item xs={12} sm={6} sx={{ textAlign: 'center' }}>
        <TextField label="Password" sx={{ width: 240 }} />
      </Grid>
      <Grid item xs={12} sm={6} sx={{ textAlign: 'center' }}>
        <TextField label="Confirm Password" sx={{ width: 240 }} />
      </Grid>
    </Grid>
  )
}

export default AuthForm
