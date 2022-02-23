import React from 'react'

import Grid from '@mui/material/Grid'
import { Vagancy } from '../../components'

const breakpoints = {
  xs: 12,
  sm: 12,
  md: 6,
  lg: 4
}

const SavedVagancies: React.FC = () => {
  return (
    <Grid container spacing={2}>
      {new Array(15).fill(1).map((v, i) => (
        <Vagancy key={i + 'oi'}breakpoints={breakpoints}/>
      ))}
    </Grid>
  )
}

export default SavedVagancies
