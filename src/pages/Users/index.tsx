import React from 'react'

import { User } from '../../components'
import Grid from '@mui/material/Grid'
import TextField from '@mui/material/TextField'
import IconButton from '@mui/material/IconButton'
import InputAdornment from '@mui/material/InputAdornment'

import SearchIcon from '@mui/icons-material/Search'

const breakpoints = {
  xs: 12,
  sm: 6,
  md: 3
}

const Users: React.FC = () => {
  return (
    <Grid container spacing={{ xs: 1, sm: 2, md: 3 }}>
      <Grid item sx={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
        <TextField
          sx={{ width: 500 }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton size="small" edge="end">
                  <SearchIcon />
                </IconButton>
              </InputAdornment>
            )
          }}
          label="Search Users"
          variant="outlined"
        />
      </Grid>
      {new Array(15).fill(1).map((v, i) => (
        <User key={i + 'oi'} breakpoints={breakpoints}/>
      ))}
    </Grid>
  )
}

export default Users
