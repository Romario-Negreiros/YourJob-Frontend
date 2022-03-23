import React from 'react'

import { useForm, SubmitHandler } from 'react-hook-form'
import useStyles from './styles'
import { useAppDispatch } from '../../app/hooks'
import { setUser } from '../../app/slices/user'
import { setCompany } from '../../app/slices/company'

import Container from '@mui/material/Container'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Paper from '@mui/material/Paper'
import Link from '@mui/material/Link'
import Alert from '@mui/material/Alert'
import CircularProgress from '@mui/material/CircularProgress'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import InputAdornment from '@mui/material/InputAdornment'
import { Link as RouterLink, useNavigate } from 'react-router-dom'

import VisibilityOffIcon from '@mui/icons-material/VisibilityOff'
import VisibilityIcon from '@mui/icons-material/Visibility'

interface Inputs {
  email: string
  password: string
}

const Login: React.FC = () => {
  const [loginMode, setLoginMode] = React.useState('users')
  const [error, setError] = React.useState('')
  const [isLoaded, setIsLoaded] = React.useState(true)
  const [isVisible, setIsVisible] = React.useState(false)
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<Inputs>()
  const dispatch = useAppDispatch()
  const classes = useStyles()
  const navigate = useNavigate()

  const handleLoginMode = () => {
    if (loginMode === 'users') {
      setLoginMode('companies')
      return
    }
    setLoginMode('users')
  }

  const handleVisibility = () => setIsVisible(!isVisible)

  const onSubmit: SubmitHandler<Inputs> = async data => {
    setIsLoaded(false)
    try {
      const response = await fetch(`https://yourjob-api.herokuapp.com/${loginMode}/authenticate`, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json'
        }
      })
      const body = await response.json()
      if (response.ok) {
        localStorage.setItem('jwt', body.token)
        if (body.user) {
          dispatch(setUser(body.user))
          navigate(`/profile/${body.user.id}`)
          return
        }
        dispatch(setCompany(body.company))
        navigate(`/companies/profile/${body.company.id}`)
        return
      }
      if (body.error) {
        throw new Error(body.error)
      }
    } catch (err) {
      err instanceof Error ? setError(err.message) : setError('Failed to log in, please try again!')
    } finally {
      setIsLoaded(true)
    }
  }

  if (!isLoaded) {
    return (
      <Container className={classes.container}>
        <CircularProgress color="secondary" />
      </Container>
    )
  } else if (error) {
    return (
      <Container className={classes.container} sx={{ flexDirection: 'column' }}>
        <Alert severity="error">{error}</Alert>
        <br />
        <Button onClick={() => setError('')} variant="contained" color="error">
          Dismiss
        </Button>
      </Container>
    )
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
              label="Password"
              sx={{ width: 240, mt: 3 }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end" sx={{ cursor: 'pointer' }} onClick={handleVisibility}>
                    {isVisible
                      ? (
                      <VisibilityOffIcon color="secondary" />
                        )
                      : (
                      <VisibilityIcon color="secondary" />
                        )}
                  </InputAdornment>
                )
              }}
              type={isVisible ? 'text' : 'password'}
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
              sx={{ mt: 3, mb: 1, width: 240 }}
              onClick={handleLoginMode}
            >
              Logging in as {loginMode === 'users' ? 'a user' : 'an company'}
            </Button>
            <Button type="submit" variant="contained" sx={{ mt: 1, mb: 2, width: 240 }}>
              Log in
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
          </Box>
        </Box>
      </Paper>
    </Container>
  )
}

export default Login
