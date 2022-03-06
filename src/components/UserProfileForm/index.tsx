import React from 'react'

import useStyles from './styles'
import { useForm, SubmitHandler } from 'react-hook-form'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { updateData } from '../../app/slices/userRegisterForm'
import { styled } from '@mui/material/styles'

import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'

import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight'

import { Props, Inputs } from './interfaces'

const UserProfileForm: React.FC<Props> = ({ handleNext }) => {
  const initialState = useAppSelector(state => state.userRegisterForm.data)
  const dispatch = useAppDispatch()
  const classes = useStyles()
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<Inputs>({ defaultValues: { ...initialState } })

  const onSubmit: SubmitHandler<Inputs> = data => {
    dispatch(updateData({ ...data }))

    handleNext()
  }

  const Input = styled('input')({
    display: 'none'
  })

  return (
    <Grid
      container
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      className={classes.grid}
      rowSpacing={4}
    >
      <Grid item sx={{ textAlign: 'center' }} xs={12}>
        <TextField
          label="Bio"
          sx={{ width: 240 }}
          {...register('bio', {
            required: {
              value: true,
              message: 'Bio is required'
            }
          })}
          error={errors.bio && true}
          helperText={errors.bio?.message}
        />
      </Grid>
      <Grid item sx={{ textAlign: 'center' }} xs={12} sm={6}>
        <label htmlFor="profile-picture">
          <Typography variant="body2">Profile picture</Typography>
          <Input
            type="file"
            accept="image/*"
            id="profile-picture"
            sx={{ display: 'none' }}
            {...register('profilePicture')}
          />
          <Button variant="contained" color="secondary" component="span">
            Upload
          </Button>
        </label>
      </Grid>
      <Grid item sx={{ textAlign: 'center' }} xs={12} sm={6}>
        <label htmlFor="curriculum">
          <Typography variant="body2">Curriculum</Typography>
          <Input
            type="file"
            accept="file/*"
            id="curriculum"
            sx={{ display: 'none' }}
            {...register('curriculum')}
          />
          <Button variant="contained" color="secondary" component="span">
            Upload
          </Button>
        </label>
      </Grid>
      <Grid item sx={{ textAlign: 'center' }} xs={12}>
        <Button variant="contained" type="submit" endIcon={<KeyboardArrowRightIcon />}>
          Next
        </Button>
      </Grid>
    </Grid>
  )
}

export default UserProfileForm
