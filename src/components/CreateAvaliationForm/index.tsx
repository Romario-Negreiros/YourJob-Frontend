import React from 'react'

import { useForm, SubmitHandler } from 'react-hook-form'
import { useAppSelector } from '../../app/hooks'

import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import CircularProgress from '@mui/material/CircularProgress'
import MenuItem from '@mui/material/MenuItem'

import { Company } from '../../app/slices/company/interfaces'
import { Props, Inputs } from './interfaces'

import toastHandler from '../../context/Toast'

const CreateAvaliationForm: React.FC<Props> = ({ company, setCompany }) => {
  const [isLoaded, setIsLoaded] = React.useState(true)
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    reset
  } = useForm<Inputs>()
  const { handleOpen } = React.useContext(toastHandler)
  const currentCompany = useAppSelector(state => state.company.data)

  const onSubmit: SubmitHandler<Inputs> = async data => {
    try {
      setIsLoaded(false)
      const jwt = localStorage.getItem('jwt')
      if (!currentCompany) {
        if (jwt) {
          const response = await fetch(
            `https://yourjob-api.herokuapp.com/avaliations/${company.id}/create`,
            {
              method: 'POST',
              body: JSON.stringify(data),
              headers: new Headers({
                'Content-Type': 'application/json',
                authorization: jwt
              })
            }
          )
          const body = await response.json()
          if (response.ok) {
            const companyCopy: Company = JSON.parse(JSON.stringify(company))
            company['company:avaliations'].push(body.avaliation)
            setCompany(companyCopy)
            handleOpen('Succesfully created avaliation!', 'success')
            reset()
            return
          }
          throw new Error(body.error)
        }
        throw new Error('You need to log in to complete this action!')
      }
      throw new Error('Companies cannot avaliate companies!')
    } catch (err) {
      err instanceof Error ? handleOpen(err.message, 'error') : handleOpen('Failed to create avaliation!', 'error')
    } finally {
      setIsLoaded(true)
    }
  }

  if (!isLoaded) {
    return (
      <Grid sx={{ display: 'grid', placeItems: 'center' }}>
        <CircularProgress color="secondary" />
      </Grid>
    )
  }
  return (
    <Grid container component="form" onSubmit={handleSubmit(onSubmit)} spacing={4}>
      <Grid item xs={12} sx={{ textAlign: 'center' }}>
        <TextField
          label="Comment"
          multiline
          {...register('comment', {
            required: 'Comment is required!',
            maxLength: { value: 120, message: 'Max of 120 characters!' }
          })}
          rows={4}
          sx={{ width: '100%' }}
          error={errors.comment && true}
          helperText={errors.comment?.message}
        />
      </Grid>
      <Grid item xs={12} md={6} sx={{ textAlign: 'center' }}>
        <TextField
          {...register('grade', { required: 'Grade is required!' })}
          sx={{ width: 240 }}
          select
          label="Grade"
          SelectProps={{
            defaultValue: getValues().grade ? getValues().grade : ''
          }}
          error={errors.grade && true}
          helperText={errors.grade?.message}
        >
          <MenuItem value={0}>0</MenuItem>
          <MenuItem value={1}>1</MenuItem>
          <MenuItem value={2}>2</MenuItem>
          <MenuItem value={3}>3</MenuItem>
          <MenuItem value={4}>4</MenuItem>
          <MenuItem value={5}>5</MenuItem>
        </TextField>
      </Grid>
      <Grid item xs={12} md={6} sx={{ textAlign: 'center' }}>
        <TextField
          {...register('recommendation', { required: 'Recommendation is required!' })}
          sx={{ width: 240 }}
          select
          label="Recommendation"
          SelectProps={{
            defaultValue: getValues().recommendation ? getValues().recommendation : ''
          }}
          error={errors.recommendation && true}
          helperText={errors.recommendation?.message}
        >
          <MenuItem value="I recommend">I recommend</MenuItem>
          <MenuItem value="I don't recommend">I don&apos;t recommend</MenuItem>
          <MenuItem value="I'm neutral">I&apos;m neutral</MenuItem>
        </TextField>
      </Grid>
      <Grid item xs={12} sx={{ textAlign: 'center' }}>
        <Button variant="contained" type="submit">
          Create
        </Button>
      </Grid>
    </Grid>
  )
}

export default CreateAvaliationForm
