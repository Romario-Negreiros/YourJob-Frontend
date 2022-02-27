import React from 'react'

import useStyles from './styles'

import Container from '@mui/material/Container'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Paper from '@mui/material/Paper'
import Link from '@mui/material/Link'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import { Link as RouterLink, useLocation } from 'react-router-dom'

const Login: React.FC = () => {
  const classes = useStyles()
  const location = useLocation()
  console.log(location.pathname)

  const handleSubmit = (data: any) => {
  }

  return (
    <Container className={classes.container}>
      <Paper className={classes.paper}>
        <Box
          component="form"
          noValidate
          autoComplete="off"
          onSubmit={handleSubmit}
          className={classes.form}
        >
          <Typography
            variant="h3"
            component="div"
            sx={{ textAlign: 'center' }}
            color="secondary.dark"
          >
            Connect to your account
          </Typography>
          <Box sx={{ width: '100%', mt: 3, textAlign: 'center' }}>
            <TextField sx={{ width: 240 }} label="Email" />
            <br />
            <TextField sx={{ width: 240, mt: 3 }} label="Password" />
          </Box>

          <Box className={classes.actions} sx={{ textAlign: 'center' }}>
            <RouterLink to="/register">
              <Link underline="always" component="button" variant="h6">
                Create Account For User
              </Link>
            </RouterLink>
            <br />
            <RouterLink to="/companies/register">
              <Link underline="always" component="button" variant="h6">
                Create Account For Company
              </Link>
            </RouterLink>
            <br />
            <RouterLink to ="/forgot_password">
              <Link underline="always" component="button" variant="h6">
                Forgot Your Password?
              </Link>
            </RouterLink>
            <br />
            <Button type="submit" variant="contained" sx={{ mt: 3, width: 250 }}>
              Log in
            </Button>
          </Box>
        </Box>
      </Paper>
    </Container>
  )
}

export default Login
