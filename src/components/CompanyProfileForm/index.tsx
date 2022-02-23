import React from 'react'

import useStyles from './styles'
import { styled } from '@mui/material/styles'

import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'

const CompanyProfileForm: React.FC = () => {
  const classes = useStyles()

  const Input = styled('input')({
    display: 'none'
  })

  return (
    <Grid container className={classes.grid} rowSpacing={4}>
      <Grid item sx={{ textAlign: 'center' }} xs={12} sm={6} lg={4}>
        <TextField label="Description" sx={{ width: 240 }} />
      </Grid>
      <Grid item sx={{ textAlign: 'center' }} xs={12} sm={6} lg={4}>
        <TextField label="Country" sx={{ width: 240 }} />
      </Grid>
      <Grid item sx={{ textAlign: 'center' }} xs={12} sm={6} lg={4}>
        <TextField label="Region" sx={{ width: 240 }} />
      </Grid>
      <Grid item sx={{ textAlign: 'center' }} xs={12} sm={6} lg={4}>
        <TextField label="Address" sx={{ width: 240 }} />
      </Grid>
      <Grid item sx={{ textAlign: 'center' }} xs={12} sm={6} lg={4}>
        <TextField label="Contact Number" sx={{ width: 240 }} />
      </Grid>
      <Grid item sx={{ textAlign: 'center' }} xs={12} sm={6} lg={4}>
        <TextField label="Website" sx={{ width: 240 }} />
      </Grid>
      <Grid item sx={{ textAlign: 'center' }} xs={12}>
      <label htmlFor="company-logo">
        <Typography variant="body2">Logo</Typography>
        <Input type="file" accept="image/*" id="company-logo" sx={{ display: 'none' }}/>
        <Button variant="contained" color="secondary" component="span">
          Upload
        </Button>
      </label>
      </Grid>
    </Grid>
  )
}

export default CompanyProfileForm
