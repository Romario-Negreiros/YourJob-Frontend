import React from 'react'

import useStyles from './styles'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { useForm, SubmitHandler } from 'react-hook-form'

import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'

import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight'

import { Props, Inputs } from './interfaces'

const AuthForm: React.FC<Props> = ({ handleNext, updateData, mode }) => {
  const classes = useStyles()
  const dispatch = useAppDispatch()
  const initialState = useAppSelector(state => {
    if (mode === 'user') {
      return state.userRegisterForm.data
    }
    return state.companyRegisterForm.data
  })
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError
  } = useForm<Inputs>({ defaultValues: { ...initialState } })

  const onSubmit: SubmitHandler<Inputs> = data => {
    if (data.password !== data.confirmPassword) {
      setError(
        'confirmPassword',
        {
          message: 'Your password and confirm password fields are different!'
        },
        {
          shouldFocus: true
        }
      )
      return
    }
    dispatch(updateData(data))

    handleNext()
  }

  return (
    <Grid
      container
      component="form"
      autoComplete="off"
      onSubmit={handleSubmit(onSubmit)}
      className={classes.grid}
      rowSpacing={4}
    >
      <Grid item xs={12} sm={6} sx={{ textAlign: 'center' }}>
        <TextField
          label="Name"
          sx={{ width: 240 }}
          {...register('name', {
            required: {
              value: true,
              message: 'Name is required!'
            }
          })}
          error={errors.name && true}
          helperText={errors.name?.message}
        />
      </Grid>
      <Grid item xs={12} sm={6} sx={{ textAlign: 'center' }}>
        <TextField
          label="Email"
          sx={{ width: 240 }}
          {...register('email', {
            required: {
              value: true,
              message: 'Email is required'
            },
            pattern: {
              value: /.*[@]{1}.*/,
              message: 'example@email.com'
            }
          })}
          error={errors.email && true}
          helperText={errors.email?.message}
        />
      </Grid>
      <Grid item xs={12} sm={6} sx={{ textAlign: 'center' }}>
        <TextField
          label="Password"
          sx={{ width: 240 }}
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
          error={errors.password && true}
          helperText={errors.password?.message}
        />
      </Grid>
      <Grid item xs={12} sm={6} sx={{ textAlign: 'center' }}>
        <TextField
          label="Confirm Password"
          sx={{ width: 240 }}
          {...register('confirmPassword', {
            required: {
              value: true,
              message: 'Repeat your password!'
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
          error={errors.confirmPassword && true}
          helperText={errors.confirmPassword?.message}
        />
      </Grid>
      <Grid item xs={12} sx={{ textAlign: 'center' }}>
        <Button variant="contained" type="submit" endIcon={<KeyboardArrowRightIcon />}>
          Next
        </Button>
      </Grid>
    </Grid>
  )
}

export default AuthForm
