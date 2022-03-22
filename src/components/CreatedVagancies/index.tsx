import React from 'react'

import Grid from '@mui/material/Grid'
import { Vagancy } from '../../components'

import { Company } from '../../app/slices/company/interfaces'

interface Props {
  company: Company
}

const breakpoints = {
  xs: 12,
  sm: 12,
  md: 6,
  lg: 4
}

const CreatedVagancies: React.FC<Props> = ({ company }) => {
  return (
    <Grid container spacing={2}>
      {new Array(15).fill(1).map((v, i) => (
        <Vagancy key={i + 'oi'} breakpoints={breakpoints} />
      ))}
    </Grid>
  )
}

export default CreatedVagancies
