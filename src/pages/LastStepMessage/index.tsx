import React from 'react'

import useStyles from './styles'

import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'
import Link from '@mui/material/Link'
import { Link as RouterLink } from 'react-router-dom'

const LastStepMessage: React.FC = () => {
  const classes = useStyles()

  return (
    <Box className={classes.box} sx={{ p: 4 }}>
      <Paper className={classes.paper} elevation={8}>
        <Typography
          variant="h3"
          color="secondary"
          component="div"
          sx={{ width: '100%', textAlign: 'center' }}
        >
          Just One More Step
        </Typography>
        <Box sx={{ width: '100%', textAlign: 'center' }}>
          <Typography variant="body1">
            In order to use yourjob, you need first verify your email by clicking on the link that
            has just been sent in less than one hour, otherwise, the link will expirate, and you
            will need to register again!
          </Typography>
        </Box>

        <RouterLink to="/login" className={classes.link}>
          <Link underline="always" variant="h6">
            Already verified? Log in
          </Link>
        </RouterLink>
      </Paper>
    </Box>
  )
}

export default LastStepMessage
