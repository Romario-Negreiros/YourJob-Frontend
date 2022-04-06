import React from 'react'

import { useForm, SubmitHandler, Controller } from 'react-hook-form'
import update from '../../utils/Update'
import { useAppDispatch } from '../../app/hooks'

import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import CircularProgress from '@mui/material/CircularProgress'
import Alert from '@mui/material/Alert'
import SalaryInput from '../custom/SalaryInput'

import { Company } from '../../app/slices/company/interfaces'
import { Props, Inputs } from './interfaces'

const CreateVacancyForm: React.FC<Props> = ({ company, setCompany }) => {
  const [error, setError] = React.useState('')
  const [success, setSuccess] = React.useState('')
  const [isLoaded, setIsLoaded] = React.useState(true)
  const dispatch = useAppDispatch()
  const {
    register,
    handleSubmit,
    formState: { errors },
    control
  } = useForm<Inputs>()
  const controller = React.useMemo(() => new AbortController(), [])

  const onSubmit: SubmitHandler<Inputs> = async data => {
    try {
      setIsLoaded(false)
      const jwt = localStorage.getItem('jwt')
      if (jwt) {
        if (data.salary) {
          const salary: number = data.salary() / 100
          if (Number.isSafeInteger(salary)) {
            const response = await fetch('https://yourjob-api.herokuapp.com/create_new_vacancy', {
              method: 'POST',
              signal: controller.signal,
              body: JSON.stringify({
                ...data,
                salary: salary
              }),
              headers: new Headers({
                'Content-Type': 'application/json',
                authorization: jwt
              })
            })
            const body = await response.json()
            if (response.ok) {
              const companyCopy: Company = JSON.parse(JSON.stringify(company))
              companyCopy['company:vacancies'].push(body.vacancy)
              await update.company(companyCopy, dispatch, controller)
              setSuccess('Successfully created vacancy!')
              setCompany(companyCopy)
              return
            }
            throw new Error(body.error)
          }
          throw new Error('Not a valid number!')
        }
        throw new Error('Salary field is required!')
      }
      throw new Error('No authorization to complete this action!')
    } catch (err) {
      err instanceof Error ? setError(err.message) : setError('Unable to create vacancy!')
    } finally {
      setIsLoaded(true)
    }
  }

  if (!isLoaded) {
    return (
      <Grid container sx={{ display: 'grid', placeItems: 'center' }}>
        <CircularProgress color="secondary" />
      </Grid>
    )
  } else if (error) {
    return (
      <Grid container sx={{ display: 'grid', placeItems: 'center' }}>
        <Alert severity="error">{error}</Alert>
        <br />
        <Button variant="contained" color="error" onClick={() => setError('')}>
          Dismiss
        </Button>
      </Grid>
    )
  } else if (success) {
    return (
      <Grid container sx={{ display: 'grid', placeItems: 'center' }}>
        <Alert severity="success">{success}</Alert>
        <br />
        <Button variant="contained" color="success" onClick={() => setSuccess('')}>
          Dismiss
        </Button>
      </Grid>
    )
  }
  return (
    <Grid container component="form" onSubmit={handleSubmit(onSubmit)} spacing={4}>
      <Grid item xs={12} sx={{ textAlign: 'center' }}>
        <TextField
          label="Description"
          multiline
          {...register('description', {
            required: 'Description is required!',
            maxLength: {
              value: 120,
              message: 'Max length of 120 characters!'
            }
          })}
          fullWidth
          error={errors.description && true}
          helperText={errors.description?.message}
        />
      </Grid>
      <Grid item xs={12} sx={{ textAlign: 'center' }}>
        <TextField
          label="Position"
          {...register('position', {
            required: 'Position is required!'
          })}
          fullWidth
          error={errors.position && true}
          helperText={errors.position?.message}
        />
      </Grid>
      <Grid item xs={12} md={6} sx={{ textAlign: 'center' }}>
        <Controller
          name="salary"
          control={control}
          render={({ field, field: { ref } }) => <SalaryInput {...field} ref={ref} />}
        />
      </Grid>
      <Grid item xs={12} md={6} sx={{ textAlign: 'center' }}>
        <TextField
          label="Category"
          {...register('category', {
            required: 'Category is required!'
          })}
          error={errors.category && true}
          helperText={errors.category?.message}
          sx={{ width: 240 }}
        />
      </Grid>
      <Grid item xs={12} sx={{ textAlign: 'center' }}>
        <Button variant="contained" type="submit">
          Create
        </Button>
      </Grid>
    </Grid>
  )
}

export default CreateVacancyForm
