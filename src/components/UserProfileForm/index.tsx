import React from 'react'

import useStyles from './styles'
import { styled } from '@mui/material/styles'

import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'

const UserProfileForm: React.FC = () => {
  const classes = useStyles()

  const Input = styled('input')({
    display: 'none'
  })

  return (
    <Grid container className={classes.grid} rowSpacing={4}>
      <Grid item sx={{ textAlign: 'center' }} xs={12}>
        <TextField label="Bio" sx={{ width: 240 }} />
      </Grid>
      <Grid item sx={{ textAlign: 'center' }} xs={12} sm={6}>
      <label htmlFor="profile-picture">
        <Typography variant="body2">Profile picture</Typography>
        <Input type="file" accept="image/*" id="profile-picture" sx={{ display: 'none' }}/>
        <Button variant="contained" color="secondary" component="span">
          Upload
        </Button>
      </label>
      </Grid>
      <Grid item sx={{ textAlign: 'center' }} xs={12} sm={6}>
        <label htmlFor="curriculum">
        <Typography variant="body2">Curriculum</Typography>
          <Input type="file" accept="file/*" id="curriculum" sx={{ display: 'none' }}/>
          <Button variant="contained" color="secondary" component="span">
            Upload
          </Button>
        </label>
      </Grid>
    </Grid>
  )
}

export default UserProfileForm
