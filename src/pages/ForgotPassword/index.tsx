import React from 'react'

import useStyles from '../../styles/global'
import sendResetPwdLink from './functions/sendResetPwdLink'
import { useForm, SubmitHandler } from 'react-hook-form'

import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'
import Alert from '@mui/material/Alert'
import CircularProgress from '@mui/material/CircularProgress'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'

import { Input, Feedback } from './interfaces'

const ForgotPassword: React.FC = () => {
  const [feedback, setFeedback] = React.useState<Feedback | null>()
  const [path, setPath] = React.useState<'users' | 'companies'>('users')
  const [isLoaded, setIsLoaded] = React.useState(true)
  const { register, handleSubmit, formState: { errors } } = useForm<Input>()
  const classes = useStyles()

  const changePath = () => (path === 'users' ? setPath('companies') : setPath('users'))

  const onSubmit: SubmitHandler<Input> = async ({ email }) => {
    try {
      setIsLoaded(false)
      const feedback = await sendResetPwdLink(email, path)
      setFeedback(feedback)
    } catch (err) {
      err instanceof Error ? setFeedback({
        severity: 'error',
        message: err.message
      }) : setFeedback({
        severity: 'error',
        message: 'Unable to send reset password link!'
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
        <Button
          variant="contained"
          color={feedback.severity}
          onClick={() => setFeedback(null)}
          sx={{ mt: 4 }}
        >
          Dismiss
        </Button>
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
        <Typography variant="body1">
          Insert a valid email to receive a reset password link
        </Typography>

        <TextField
          label="Email"
          {...register('email', {
            required: 'Email is required!',
            pattern: {
              value: /.*[@]{1}.*/,
              message: 'example@email.com'
            }
          })}
          error={errors.email && true}
          helperText={errors.email?.message}
          sx={{ width: 240, mt: 4 }}
        />

        <Typography variant="body2" component="div" sx={{ mt: 3 }}>
          Is this an user or a company account?
        </Typography>
        <Button variant="contained" type="button" onClick={changePath}>
          {path === 'users' ? 'User' : 'Company'}
        </Button>
        <Button variant="contained" type="submit" sx={{ mt: 5 }}>
          Send reset password email
        </Button>
      </Paper>
    </Box>
  )
}

export default ForgotPassword
