import React from 'react'

import update from '../../utils/Update'
import useStyles from '../../styles/global'
import { useForm, SubmitHandler } from 'react-hook-form'
import { useAppDispatch } from '../../app/hooks'

import Grid from '@mui/material/Grid'
import Alert from '@mui/material/Alert'
import Avatar from '@mui/material/Avatar'
import TextField from '@mui/material/TextField'
import CircularProgress from '@mui/material/CircularProgress'
import Paper from '@mui/material/Paper'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Link from '@mui/material/Link'
import IconButton from '@mui/material/IconButton'

import UploadIcon from '@mui/icons-material/UploadFileRounded'

import { Props, Inputs } from './interfaces'
import updateData from './functions/updateData'

const UserProfileInfo: React.FC<Props> = ({ user, setUser, isCurrentUser }) => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<Inputs>({
    defaultValues: {
      bio: user.bio,
      age: user.age,
      workingArea: user.workingArea
    }
  })
  const [error, setError] = React.useState('')
  const [isLoaded, setIsLoaded] = React.useState(true)
  const [isEditing, setIsEditing] = React.useState(false)
  const classes = useStyles()
  const dispatch = useAppDispatch()

  const onSubmit: SubmitHandler<Inputs> = async data => {
    try {
      setIsLoaded(false)
      const updatedUser = await updateData(user, data)
      await update.user(updatedUser, dispatch)

      setUser(updatedUser)
      setIsEditing(false)
    } catch (err) {
      err instanceof Error ? setError(err.message) : setError('Unable to update information!')
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
  } else if (error) {
    return (
      <Grid sx={{ display: 'grid', placeItems: 'center' }}>
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
      autoComplete="off"
    >
      <Grid item xs={12}>
        <label htmlFor="profile-picture">
          <TextField
            {...register('profilePicture')}
            type="file"
            inputProps={{
              accept: 'image/*'
            }}
            id={isEditing ? 'profile-picture' : 'inative'}
            sx={{ display: 'none' }}
          />
          {isEditing ? (
            <Avatar sx={{ margin: 'auto', cursor: 'pointer' }}>
              <UploadIcon />
            </Avatar>
          ) : (
            <Avatar sx={{ margin: 'auto' }} src={user.profilePicture || ''}>
              {user.name.charAt(0).toUpperCase()}
            </Avatar>
          )}
        </label>
      </Grid>
      <Grid item xs={12} md={6}>
        <Paper elevation={8} className={classes.infoCompPaper}>
          <TextField
            label="Name"
            variant="standard"
            fullWidth
            defaultValue={user.name}
            InputProps={{
              readOnly: true,
              disableUnderline: true
            }}
          />
        </Paper>
      </Grid>
      <Grid item xs={12} md={6}>
        <Paper elevation={8} className={classes.infoCompPaper}>
          <TextField
            label="Email"
            variant="standard"
            fullWidth
            defaultValue={user.email}
            InputProps={{
              readOnly: true,
              disableUnderline: true
            }}
          />
        </Paper>
      </Grid>
      <Grid item xs={12} md={6}>
        <Paper elevation={8} className={classes.infoCompPaper}>
          <TextField
            label="Age"
            {...register('age', {
              required: 'Age is required!',
              min: {
                value: 18,
                message: 'Minimum age is 18'
              },
              maxLength: {
                value: 2,
                message: 'Maximum of two digits'
              }
            })}
            variant="standard"
            fullWidth
            InputProps={{
              readOnly: !isEditing,
              disableUnderline: !isEditing
            }}
            error={errors.age && true}
            helperText={errors.age?.message}
          />
        </Paper>
      </Grid>
      <Grid item xs={12} md={6}>
        <Paper elevation={8} className={classes.infoCompPaper}>
          <TextField
            label="Bio"
            {...register('bio', {
              required: 'Bio is required!'
            })}
            fullWidth
            variant="standard"
            multiline
            InputProps={{
              readOnly: !isEditing,
              disableUnderline: !isEditing
            }}
            error={errors.bio && true}
            helperText={errors.bio?.message}
          />
        </Paper>
      </Grid>
      <Grid item xs={12} md={6}>
        <Paper elevation={8} className={classes.infoCompPaper}>
          <TextField
            label="Working Area"
            {...register('workingArea', {
              required: 'Working area is required!'
            })}
            variant="standard"
            fullWidth
            InputProps={{
              readOnly: !isEditing,
              disableUnderline: !isEditing
            }}
            error={errors.workingArea && true}
            helperText={errors.workingArea?.message}
          />
        </Paper>
      </Grid>
      <Grid item xs={12} md={6}>
        <Paper elevation={8} className={classes.infoCompPaper}>
          <Box>
            <Typography
              sx={{
                fontSize: '0.8rem',
                fontWeight: '400',
                lineHeight: '1.4375em',
                letterSpacing: '0.00938em',
                color: 'rgba(0, 0, 0, 0.6)'
              }}
              component="div"
            >
              Curriculum
            </Typography>
            <Link
              href={user.curriculum || ''}
              variant="subtitle2"
              underline="always"
              target="_blank"
              download={user.curriculum && true}
            >
              {user.curriculum ? 'Download' : 'Nothing to see here...'}
            </Link>
            {isEditing && (
              <label style={{ display: 'inline-block', marginLeft: 2 }} htmlFor="curriculum">
                <TextField
                  {...register('curriculum')}
                  type="file"
                  inputProps={{
                    accept: 'file/*'
                  }}
                  id={isEditing ? 'curriculum' : 'inative'}
                  sx={{ display: 'none' }}
                />
                <IconButton>
                  <UploadIcon color="secondary" />
                </IconButton>
              </label>
            )}
          </Box>
        </Paper>
      </Grid>
      {isCurrentUser && (
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

export default UserProfileInfo
