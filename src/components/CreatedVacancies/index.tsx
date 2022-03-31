import React from 'react'

import Grid from '@mui/material/Grid'
import { Vacancy } from '..'

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

const CreatedVacancies: React.FC<Props> = ({ company }) => {
  return (
    <Grid container spacing={2}>
      {company['company:vacancies'].map(vacancy => (
        <Vacancy
          key={vacancy.id}
          company={company}
          vacancy={vacancy}
          breakpoints={breakpoints}
        />
      ))}
    </Grid>
  )
}

export default CreatedVacancies
