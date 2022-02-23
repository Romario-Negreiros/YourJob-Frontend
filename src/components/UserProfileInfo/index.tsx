import React from 'react'

import useStyles from './styles'

import Grid from '@mui/material/Grid'
import Avatar from '@mui/material/Avatar'
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Link from '@mui/material/Link'

const UserProfileInfo: React.FC = () => {
  const classes = useStyles()

  return (
    <Grid container spacing={4}>
      <Grid item xs={12}>
        <Avatar sx={{ margin: 'auto' }}>H</Avatar>
      </Grid>
      <Grid item xs={12} sm={6}>
        <Paper elevation={8} className={classes.paper}>
          <Box>
            <Typography variant="h6" component="div">
              Name
            </Typography>
            <Typography variant="body1" component="div" sx={{ mt: 2 }}>
              user.name
            </Typography>
          </Box>
          <Button variant="contained">Change</Button>
        </Paper>
      </Grid>
      <Grid item xs={12} sm={6}>
        <Paper elevation={8} className={classes.paper}>
          <Box>
            <Typography variant="h6" component="div">
              Password
            </Typography>
            <Typography variant="body1" component="div" sx={{ mt: 2 }}>
              secret :)
            </Typography>
          </Box>
          <Button variant="contained">Change</Button>
        </Paper>
      </Grid>
      <Grid item xs={12} sm={6}>
        <Paper elevation={8} className={classes.paper}>
          <Box>
            <Typography variant="h6" component="div">
              Bio
            </Typography>
            <Typography variant="body1" component="div" sx={{ mt: 2 }}>
              user.bio
            </Typography>
          </Box>
          <Button variant="contained">Change</Button>
        </Paper>
      </Grid>
      <Grid item xs={12} sm={6}>
        <Paper elevation={8} className={classes.paper}>
          <Box>
            <Typography variant="h6" component="div">
              Curriculum
            </Typography>
            <Link href="#" variant="body1" underline="always" download sx={{ mt: 2 }}>
              Download
            </Link>
          </Box>
          <Box>
            <Button variant="contained">Change</Button>
            <Button variant="contained">Preview</Button>
          </Box>
        </Paper>
      </Grid>
    </Grid>
  )
}

export default UserProfileInfo
