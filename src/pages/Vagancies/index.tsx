import React from 'react'

import { Vagancy } from '../../components'
import Grid from '@mui/material/Grid'
import TextField from '@mui/material/TextField'
import IconButton from '@mui/material/IconButton'
import InputAdornment from '@mui/material/InputAdornment'

import SearchIcon from '@mui/icons-material/Search'

const Vagancies: React.FC = () => {
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
          label="Search Vagancy"
          variant="outlined"
        />
      </Grid>
      {new Array(15).fill(1).map((v, i) => (
        <Vagancy key={i + 'oi'} />
      ))}
    </Grid>
  )
}

export default Vagancies
