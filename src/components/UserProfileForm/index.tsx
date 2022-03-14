import React from 'react'

import useStyles from './styles'
import { useForm, SubmitHandler } from 'react-hook-form'
import { useAppSelector, useAppDispatch } from '../../app/hooks'
import { updateData } from '../../app/slices/userRegisterForm'
import { styled } from '@mui/material/styles'
import convertFileObj from '../../utils/convertFileObj'

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
  } = useForm<Inputs>({
    defaultValues: {
      bio: initialState?.bio,
      age: initialState?.age,
      workingArea: initialState?.workingArea
    }
  })

  const onSubmit: SubmitHandler<Inputs> = ({ bio, age, workingArea, profilePicture, curriculum }) => {
    const stringifiedProfilePicture = convertFileObj(profilePicture[0])
    const stringifiedCurriculum = convertFileObj(curriculum[0])

    dispatch(
      updateData({
        bio,
        age,
        workingArea,
        profilePicture: stringifiedProfilePicture,
        curriculum: stringifiedCurriculum
      })
    )

    handleNext()
  }

  const Input = styled('input')({
    display: 'none'
  })

  return (
    <Grid
      container
      component="form"
      autoComplete="off"
      onSubmit={handleSubmit(onSubmit)}
      className={classes.grid}
      rowSpacing={4}
    >
      <Grid item sx={{ textAlign: 'center' }} xs={12}>
        <TextField
          label="Bio"
          sx={{ width: '100%' }}
          {...register('bio', {
            required: {
              value: true,
              message: 'Bio is required'
            }
          })}
          multiline
          rows={3}
          error={errors.bio && true}
          helperText={errors.bio?.message}
        />
      </Grid>
      <Grid item sx={{ textAlign: 'center' }} xs={12} sm={6}>
        <TextField
          label="Age"
          sx={{ width: 240 }}
          type="number"
          {...register('age', {
            required: {
              value: true,
              message: 'Age is required'
            },
            min: {
              value: 18,
              message: 'Minimum age is 18'
            },
            maxLength: {
              value: 2,
              message: 'Maximum of two digits'
            }
          })}
          error={errors.age && true}
          helperText={errors.age?.message}
        />
      </Grid>
      <Grid item sx={{ textAlign: 'center' }} xs={12} sm={6}>
        <TextField
          label="Working Area"
          sx={{ width: 240 }}
          {...register('workingArea', {
            required: {
              value: true,
              message: 'Your working area is required'
            }
          })}
          error={errors.workingArea && true}
          helperText={errors.workingArea?.message}
        />
      </Grid>
      <Grid item sx={{ textAlign: 'center' }} xs={12} sm={6}>
        <label htmlFor="profile-picture">
          <Typography variant="body2">Profile picture</Typography>
          <Input
            {...register('profilePicture')}
            type="file"
            accept="image/*"
            id="profile-picture"
            sx={{ display: 'none' }}
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
            {...register('curriculum')}
            type="file"
            accept="file/*"
            id="curriculum"
            sx={{ display: 'none' }}
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
