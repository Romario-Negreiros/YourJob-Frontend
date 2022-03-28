import React from 'react'

import Grid from '@mui/material/Grid'
import Alert from '@mui/material/Alert'

const NoAuthorization: React.FC = () => {
  return (
    <Grid container sx={{ display: 'grid', placeItems: 'center' }}>
      <Alert severity="error">You do not have authorization to access this area!</Alert>
    </Grid>
  )
}

export default NoAuthorization
