import React from 'react'

import { useForm, SubmitHandler, Controller } from 'react-hook-form'
import useStyles from '../../styles/global'

import Grid from '@mui/material/Grid'
import Paper from '@mui/material/Paper'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import CircularProgress from '@mui/material/CircularProgress'
import Alert from '@mui/material/Alert'
import SalaryInput from '../../components/custom/SalaryInput'

import { Props, Inputs } from './interfaces'

const VacancyPageInfo: React.FC<Props> = ({ vacancy, company, setVacancy, isCurrentCompany }) => {
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
      salary: vacancy.salary,
      category: vacancy.category,
      position: vacancy.position
    }
  })
  const classes = useStyles()

  const onSubmit: SubmitHandler<Inputs> = async data => {
    try {
      setIsLoaded(false)
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
            rules={{
              required: 'Salary is required',
              max: {
                value: 100000,
                message: "Bro, com'on"
              }
            }}
            render={({ field, field: { ref } }) => (
              <SalaryInput
                {...field}
                ref={ref}
                inputProps={{
                  readOnly: !isEditing,
                  disableUnderline: !isEditing,
                  error: errors.salary && true
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
