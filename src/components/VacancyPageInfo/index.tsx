import React from 'react'

import { useForm, SubmitHandler, Controller } from 'react-hook-form'
import { useAppDispatch } from '../../app/hooks'
import { updateCompany } from '../../app/slices/company'
import useStyles from '../../styles/global'

import Grid from '@mui/material/Grid'
import Paper from '@mui/material/Paper'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import CircularProgress from '@mui/material/CircularProgress'
import Alert from '@mui/material/Alert'
import SalaryInput from '../../components/custom/SalaryInput'

import { Props, Inputs } from './interfaces'

const VacancyPageInfo: React.FC<Props> = ({ vacancy, setVacancy, isCurrentCompany }) => {
  const [error, setError] = React.useState('')
  const [isLoaded, setIsLoaded] = React.useState(true)
  const [isEditing, setIsEditing] = React.useState(false)
  const {
    register,
    control,
    handleSubmit,
    formState: { errors }
  } = useForm<Inputs>({
    defaultValues: {
      description: vacancy.description,
      salary: vacancy.salary * 100,
      category: vacancy.category,
      position: vacancy.position
    }
  })
  const classes = useStyles()
  const dispatch = useAppDispatch()

  const onSubmit: SubmitHandler<Inputs> = async data => {
    try {
      setIsLoaded(false)
      const jwt = localStorage.getItem('jwt')
      if (jwt) {
        if (data.salary) {
          let salary = vacancy.salary
          if (data.salary !== vacancy.salary * 100) {
            salary = data.salary() / 100
          }
          if (Number.isSafeInteger(salary)) {
            const response = await fetch(
              `https://yourjob-api.herokuapp.com/vacancies/${vacancy.id}/update`,
              {
                method: 'PUT',
                body: JSON.stringify({
                  ...data,
                  salary: salary
                }),
                headers: new Headers({
                  'Content-Type': 'application/json',
                  authorization: jwt
                })
              }
            )
            const body = await response.json()
            if (response.ok) {
              dispatch(updateCompany(body.company))
              setVacancy(body.vacancy)
              setIsEditing(false)
              return
            }
            throw new Error(body.error)
          }
          throw new Error('Not a valid number!')
        }
        throw new Error('Salary field is required!')
      }
      throw new Error('You need to log in to complete this action!')
    } catch (err) {
      err instanceof Error ? setError(err.message) : setError('Failed to update vacancy!')
    } finally {
      setIsLoaded(true)
    }
  }

  if (!isLoaded) {
    return (
      <Grid sx={{ display: 'grid', placeItems: 'center', width: '100%' }}>
        <CircularProgress color="secondary" />
      </Grid>
    )
  } else if (error) {
    return (
      <Grid sx={{ display: 'grid', placeItems: 'center', width: '100%' }}>
        <Alert severity="error">{error}</Alert>
        <br />
        <Button variant="contained" color="error" onClick={() => setError('')}>
          Dismiss
        </Button>
      </Grid>
    )
  }
  return (
    <Grid
      container
      spacing={4}
      component={isEditing ? 'form' : 'section'}
      onSubmit={handleSubmit(onSubmit)}
    >
      <Grid item xs={12}>
        <Paper elevation={8} className={classes.infoCompPaper}>
          <TextField
            label="Description"
            {...register('description', {
              required: 'Description is required!',
              maxLength: {
                value: 120,
                message: 'Max length of 120 characters!'
              }
            })}
            multiline
            variant="standard"
            fullWidth
            InputProps={{
              readOnly: !isEditing,
              disableUnderline: !isEditing
            }}
            error={errors.description && true}
            helperText={errors.description?.message}
          />
        </Paper>
      </Grid>
      <Grid item xs={12} md={4}>
        <Paper elevation={8} className={classes.infoCompPaper}>
          <TextField
            label="Position"
            {...register('position', {
              required: 'Position is required!'
            })}
            variant="standard"
            fullWidth
            InputProps={{
              readOnly: !isEditing,
              disableUnderline: !isEditing
            }}
            error={errors.position && true}
            helperText={errors.position?.message}
          />
        </Paper>
      </Grid>
      <Grid item xs={12} md={4}>
        <Paper elevation={8} className={classes.infoCompPaper}>
          <TextField
            label="Category"
            {...register('category', {
              required: 'Category is required!',
              maxLength: {
                value: 120,
                message: 'Max length of 120 characters!'
              }
            })}
            variant="standard"
            fullWidth
            InputProps={{
              readOnly: !isEditing,
              disableUnderline: !isEditing
            }}
            error={errors.category && true}
            helperText={errors.category?.message}
          />
        </Paper>
      </Grid>
      <Grid item xs={12} md={4}>
        <Paper elevation={8} className={classes.infoCompPaper}>
          <Controller
            name="salary"
            control={control}
            render={({ field, field: { ref } }) => (
              <SalaryInput
                {...field}
                ref={ref}
                inputProps={{
                  readOnly: !isEditing,
                  disableUnderline: !isEditing
                }}
              />
            )}
          />
        </Paper>
      </Grid>
      {isCurrentCompany && (
        <>
          <Grid item xs={12} md={6}>
            <Button
              variant="contained"
              type={isEditing ? 'submit' : 'button'}
              onClick={() => {
                if (!isEditing) setIsEditing(true)
              }}
              color={isEditing ? 'success' : 'secondary'}
            >
              {isEditing ? 'Save' : 'Change'}
            </Button>
          </Grid>
          <Grid item xs={12} md={6}>
            <Button
              variant="contained"
              color="error"
              disabled={!isEditing}
              onClick={() => setIsEditing(false)}
            >
              Cancel
            </Button>
          </Grid>
        </>
      )}
    </Grid>
  )
}

export default VacancyPageInfo
