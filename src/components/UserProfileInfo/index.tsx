import React from 'react'

import useStyles from '../../styles/global'

import Grid from '@mui/material/Grid'
import Avatar from '@mui/material/Avatar'
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Link from '@mui/material/Link'

import { User } from '../../app/slices/user/interfaces'

interface Props {
  user: User
  isCurrentUser?: boolean
}

const UserProfileInfo: React.FC<Props> = ({ user, isCurrentUser }) => {
  const classes = useStyles()

  return (
    <Grid container spacing={4}>
      <Grid item xs={12}>
        <Avatar sx={{ margin: 'auto' }}>H</Avatar>
      </Grid>
      <Grid item xs={12} md={6}>
        <Paper elevation={8} className={classes.infoCompPaper}>
          <Box>
            <Typography variant="h6" component="div">
              Name
            </Typography>
            <Typography variant="body1" component="div" sx={{ mt: 2 }}>
              {user.name}
            </Typography>
          </Box>
          <Button variant="contained">Change</Button>
        </Paper>
      </Grid>
      <Grid item xs={12} md={6}>
        <Paper elevation={8} className={classes.infoCompPaper}>
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
      <Grid item xs={12} md={6}>
        <Paper elevation={8} className={classes.infoCompPaper}>
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
      <Grid item xs={12} md={6}>
        <Paper elevation={8} className={classes.infoCompPaper}>
          <Box>
            <Typography variant="h6" component="div">
              Curriculum
            </Typography>
            <Link href="#" variant="body1" underline="always" download sx={{ display: 'inline-block', mt: 2 }}>
              Download
            </Link>
          </Box>
          <Box>
            <Button variant="contained">Change</Button>
            <Button variant="contained" sx={{ ml: 2 }}>Preview</Button>
          </Box>
        </Paper>
      </Grid>
    </Grid>
  )
}

export default UserProfileInfo
