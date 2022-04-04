import React from 'react'

import Grid from '@mui/material/Grid'
import Alert from '@mui/material/Alert'
import { Vacancy } from '..'

import { User } from '../../app/slices/user/interfaces'

interface Props {
  user: User
  setUser: (user: User | null) => void
}

const breakpoints = {
  xs: 12,
  sm: 12,
  md: 6,
  lg: 4
}

const SavedVacancies: React.FC<Props> = ({ user, setUser }) => {
  if (!user.savedVacancies.length) {
    return (
      <Grid sx={{ display: 'grid', placeItems: 'center' }}>
        <Alert severity="info">No saved vacancies!</Alert>
      </Grid>
    )
  }
  return (
    <Grid container spacing={2}>
      {user.savedVacancies.map(vacancy => (
        <Vacancy
          key={vacancy.id}
          breakpoints={breakpoints}
          vacancy={vacancy}
          company={vacancy['company:vacancies']}
          currentUser={user}
          setUser={setUser}
        />
      ))}
    </Grid>
  )
}

export default SavedVacancies
