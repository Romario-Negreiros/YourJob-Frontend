import React from 'react'

import { useForm, SubmitHandler } from 'react-hook-form'
import useStyles from '../../styles/global'
import resetPassword from './functions/resetPassword'

import { useParams, Link as RouterLink } from 'react-router-dom'
import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import Link from '@mui/material/Link'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import Alert from '@mui/material/Alert'
import CircularProgress from '@mui/material/CircularProgress'
import Button from '@mui/material/Button'

import { Inputs, Feedback } from './interfaces'

const ResetPassword: React.FC = () => {
  const [feedback, setFeedback] = React.useState<Feedback | null>(null)
  const [isLoaded, setIsLoaded] = React.useState(true)
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<Inputs>()
  const classes = useStyles()
  const params = useParams()

  const onSubmit: SubmitHandler<Inputs> = async ({ password, confirmPassword }) => {
    try {
      setIsLoaded(false)
      if (password !== confirmPassword) {
        throw new Error('Password and confirm password fieds are different!')
      }

      if (!params.email || !params.token || !params.mode) {
        throw new Error('Invalid reset password link!')
      }

      const feedback = await resetPassword(params.email, password, params.token, params.mode)
      setFeedback(feedback)
    } catch (err) {
      err instanceof Error ? setFeedback({
        severity: 'error',
        message: err.message
      }) : setFeedback({
        severity: 'error',
        message: 'Unable to reset password!'
      })
    } finally {
      setIsLoaded(true)
    }
  }

  if (!isLoaded) {
    return (
      <Box className={classes.box2}>
        <CircularProgress color="secondary" />
      </Box>
    )
  } else if (feedback) {
    return (
      <Box sx={{ display: 'grid', placeItems: 'center' }}>
        <Alert severity={feedback.severity}>{feedback.message}</Alert>
        {feedback.severity === 'success' ? (
          <RouterLink to="/login" style={{ display: 'block', marginTop: 4 }}>
            <Link underline="always" component="button" variant="h6">
              Log in
            </Link>
          </RouterLink>
        ) : (
          <Button
            variant="contained"
            color={feedback.severity}
            onClick={() => setFeedback(null)}
            sx={{ mt: 4 }}
          >
            Dismiss
          </Button>
        )}
      </Box>
    )
  }
  return (
    <Box className={classes.box2}>
      <Paper
        elevation={8}
        className={classes.paper2}
        component="form"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Typography variant="body1">Choose your new password</Typography>

        <TextField
          label="Password"
          {...register('password', {
            required: {
              value: true,
              message: 'Password is required'
            },
            minLength: {
              value: 6,
              message: 'At least 6 characters'
            },
            pattern: {
              value: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%¨&*])[A-Za-z\d!@#$%¨&*]{6,}$/,
              message: 'At least one special character and one number'
            }
          })}
          sx={{ width: 240, mt: 4 }}
          error={errors.password && true}
          helperText={errors.password?.message}
        />
        <TextField
          label="Confirm Password"
          {...register('confirmPassword', {
            required: {
              value: true,
              message: 'Confirm password is required'
            },
            minLength: {
              value: 6,
              message: 'At least 6 characters'
            },
            pattern: {
              value: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%¨&*])[A-Za-z\d!@#$%¨&*]{6,}$/,
              message: 'At least one special character and one number'
            }
          })}
          sx={{ width: 240, mt: 4 }}
          error={errors.confirmPassword && true}
          helperText={errors.confirmPassword?.message}
        />

        <Button variant="contained" type="submit" sx={{ mt: 5 }}>
          Change
        </Button>
      </Paper>
    </Box>
  )
}

export default ResetPassword
