import React from 'react'

import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'

import { Company } from '../../app/slices/company/interfaces'

interface Props {
  company: Company
}

const CreateVagancyForm: React.FC<Props> = ({ company }) => {
  return (
    <Grid container component="form" spacing={4}>
      <Grid item xs={12} md={6} sx={{ textAlign: 'center' }}>
        <TextField label="Description" sx={{ width: 240 }}/>
      </Grid>
      <Grid item xs={12} md={6} sx={{ textAlign: 'center' }}>
        <TextField label="Salary" type="number" sx={{ width: 240 }}/>
      </Grid>
      <Grid item xs={12} md={6} sx={{ textAlign: 'center' }}>
        <TextField label="Position" sx={{ width: 240 }}/>
      </Grid>
      <Grid item xs={12} md={6} sx={{ textAlign: 'center' }}>
        <TextField label="Category" sx={{ width: 240 }}/>
      </Grid>
      <Grid item xs={12} sx={{ textAlign: 'center' }}>
        <Button variant="contained" type="submit">Create</Button>
      </Grid>
    </Grid>
  )
}

export default CreateVagancyForm
