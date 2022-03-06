import React from 'react'

import { useForm, SubmitHandler } from 'react-hook-form'
import useStyles from './styles'

import Container from '@mui/material/Container'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Paper from '@mui/material/Paper'
import Link from '@mui/material/Link'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import { Link as RouterLink } from 'react-router-dom'

interface Inputs {
  email: string
  password: string
}

const Login: React.FC = () => {
  const [loginMode, setLoginMode] = React.useState('user')
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<Inputs>()
  const classes = useStyles()

  const handleLoginMode = () => {
    if (loginMode === 'user') {
      setLoginMode('company')
      return
    }
    setLoginMode('user')
  }

  const onSubmit: SubmitHandler<Inputs> = data => {
    console.log(data)
  }

  return (
    <Container className={classes.container}>
      <Paper className={classes.paper}>
        <Box
          component="form"
          noValidate
          autoComplete="off"
          onSubmit={handleSubmit(onSubmit)}
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
            <TextField
              sx={{ width: 240 }}
              label="Email"
              {...register('email', { required: { value: true, message: 'Email is required!' } })}
              error={errors.email && true}
              helperText={errors.email?.message}
            />
            <br />
            <TextField
              sx={{ width: 240, mt: 3 }}
              label="Password"
              {...register('password', {
                required: { value: true, message: 'Password is required!' }
              })}
              error={errors.password && true}
              helperText={errors.password?.message}
            />
          </Box>

          <Box className={classes.actions} sx={{ textAlign: 'center' }}>
            <Button
              type="button"
              variant="contained"
              color="secondary"
              sx={{ mt: 3, mb: 3, width: 240 }}
              onClick={handleLoginMode}
            >
              Log in as {loginMode === 'user' ? 'a company' : 'an user'}
            </Button>
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
            <RouterLink to="/forgot_password">
              <Link underline="always" component="button" variant="h6">
                Forgot Your Password?
              </Link>
            </RouterLink>
            <br />
            <Button type="submit" variant="contained" sx={{ mt: 3, width: 240 }}>
              Log in
            </Button>
          </Box>
        </Box>
      </Paper>
    </Container>
  )
}

export default Login
