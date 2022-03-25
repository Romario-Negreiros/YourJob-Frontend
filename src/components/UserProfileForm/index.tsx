import React from 'react'

import useStyles from './styles'
import { useForm, SubmitHandler } from 'react-hook-form'
import { useAppSelector, useAppDispatch } from '../../app/hooks'
import { updateData } from '../../app/slices/userRegisterForm'
import { storage } from '../../lib/firebase'

import Grid from '@mui/material/Grid'
import Alert from '@mui/material/Alert'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'

import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight'

import { Props, Inputs } from './interfaces'

const UserProfileForm: React.FC<Props> = ({ handleNext }) => {
  const initialState = useAppSelector(state => state.userRegisterForm.data)
  const [error, setError] = React.useState('')
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

  const onSubmit: SubmitHandler<Inputs> = async ({
    bio,
    age,
    workingArea,
    profilePicture,
    curriculum
  }) => {
    try {
      const ppRef = storage.ref(storage.storage, `users/${initialState?.email}/profilePicture`)
      const cvRef = storage.ref(storage.storage, `users/${initialState?.email}/curriculum`)
      let ppUrl = ''
      let cvUrl = ''
      if (profilePicture[0]) {
        await storage.uploadBytes(ppRef, profilePicture[0])
        ppUrl = await storage.getDownloadURL(ppRef)
      }
      if (curriculum[0]) {
        await storage.uploadBytes(cvRef, curriculum[0])
        cvUrl = await storage.getDownloadURL(cvRef)
      }

      dispatch(
        updateData({
          bio,
          age,
          workingArea,
          profilePicture: ppUrl || initialState?.profilePicture,
          curriculum: cvUrl || initialState?.curriculum
        })
      )

      handleNext()
    } catch (err) {
      setError(`${err.message} \n ${err}`)
    }
  }

  if (error) {
    return (
      <Grid className={classes.grid}>
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
          <TextField
            {...register('profilePicture')}
            type="file"
            inputProps={{
              accept: 'image/*'
            }}
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
          <TextField
            {...register('curriculum')}
            type="file"
            inputProps={{
              accept: '.docx,.pdf'
            }}
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
