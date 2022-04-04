import React from 'react'

import Grid from '@mui/material/Grid'
import Alert from '@mui/material/Alert'
import { Vacancy } from '..'

import { Company } from '../../app/slices/company/interfaces'

interface Props {
  company: Company
  setCompany: (company: Company | null) => void
  isCurrentCompany?: boolean
}

const breakpoints = {
  xs: 12,
  sm: 12,
  md: 6,
  lg: 4
}

const CreatedVacancies: React.FC<Props> = ({ company, setCompany, isCurrentCompany }) => {
  if (!company['company:vacancies'].length) {
    return (
      <Grid sx={{ display: 'grid', placeItems: 'center' }}>
        <Alert severity="info">No created vacancies!</Alert>
      </Grid>
    )
  }
  return (
    <Grid container spacing={2}>
      {company['company:vacancies'].map(vacancy => (
        <Vacancy
          key={vacancy.id}
          breakpoints={breakpoints}
          company={company}
          vacancy={vacancy}
          currentCompany={isCurrentCompany ? company : undefined}
          setCompany={setCompany}
        />
      ))}
    </Grid>
  )
}

export default CreatedVacancies
