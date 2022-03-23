import React from 'react'

import useStyles from '../../styles/global'
// import { storage } from '../../lib/firebase'
import { useForm, SubmitHandler } from 'react-hook-form'

import Grid from '@mui/material/Grid'
import Avatar from '@mui/material/Avatar'
import TextField from '@mui/material/TextField'
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Link from '@mui/material/Link'
import IconButton from '@mui/material/IconButton'

import UploadIcon from '@mui/icons-material/UploadFileRounded'

import { User } from '../../app/slices/user/interfaces'

interface Props {
  user: User
  setUser: (user: User | null) => void
  isCurrentUser?: boolean
}

interface Inputs {
  profilePicture: FileList
  name: string
  bio: string
  age: number
  workingArea: string
  curriculum: FileList
}

const UserProfileInfo: React.FC<Props> = ({ user, setUser, isCurrentUser }) => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<Inputs>({
    defaultValues: {
      name: user.name,
      bio: user.bio,
      age: user.age,
      workingArea: user.workingArea
    }
  })
  const [isEditing, setIsEditing] = React.useState(false)
  const classes = useStyles()

  const onSubmit: SubmitHandler<Inputs> = async data => {
  }

  return (
    <Grid
      container
      spacing={4}
      component="form"
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
          {isEditing
            ? (
            <Avatar sx={{ margin: 'auto', cursor: 'pointer' }}>
              <UploadIcon />
            </Avatar>
              )
            : (
            <Avatar sx={{ margin: 'auto' }} src={user.profilePicture ? user.profilePicture : ''}>
              {user.profilePicture ? '' : user.name.charAt(0).toUpperCase()}
            </Avatar>
              )}
        </label>
      </Grid>
      <Grid item xs={12} md={6}>
        <Paper elevation={8} className={classes.infoCompPaper}>
          <Box>
            <TextField
              label="Name"
              {...register('name', {
                required: 'Name is required!'
              })}
              variant="standard"
              InputProps={{
                readOnly: !isEditing,
                disableUnderline: !isEditing
              }}
              error={errors.name && true}
              helperText={errors.name?.message}
            />
          </Box>
        </Paper>
      </Grid>
      <Grid item xs={12} md={6}>
        <Paper elevation={8} className={classes.infoCompPaper}>
          <Box>
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
              InputProps={{
                readOnly: !isEditing,
                disableUnderline: !isEditing
              }}
              error={errors.age && true}
              helperText={errors.age?.message}
            />
          </Box>
        </Paper>
      </Grid>
      <Grid item xs={12} md={6}>
        <Paper elevation={8} className={classes.infoCompPaper}>
          <Box>
            <TextField
              label="Bio"
              {...register('bio', {
                required: 'Bio is required!'
              })}
              variant="standard"
              multiline
              InputProps={{
                readOnly: !isEditing,
                disableUnderline: !isEditing
              }}
              error={errors.bio && true}
              helperText={errors.bio?.message}
            />
          </Box>
        </Paper>
      </Grid>
      <Grid item xs={12} md={6}>
        <Paper elevation={8} className={classes.infoCompPaper}>
          <Box>
            <TextField
              label="Working Area"
              {...register('workingArea', {
                required: 'Working area is required!'
              })}
              variant="standard"
              InputProps={{
                readOnly: !isEditing,
                disableUnderline: !isEditing
              }}
              error={errors.workingArea && true}
              helperText={errors.workingArea?.message}
            />
          </Box>
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
            <Link href={user.curriculum ? user.curriculum : ''} variant="subtitle2" underline="always" download={user.curriculum && true}>
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
      <Grid item xs={12} md={6}>
        <Paper elevation={8} className={classes.infoCompPaper}>
          <Box>
            <TextField
              label="Password"
              type="password"
              defaultValue="Really? duh"
              variant="standard"
              InputProps={{
                readOnly: true,
                disableUnderline: true
              }}
            />
          </Box>
        </Paper>
      </Grid>
      {isCurrentUser && (
        <Grid item xs={12}>
          <Button
            variant="contained"
            type={isEditing ? 'submit' : 'button'}
            onClick={() => setIsEditing(!isEditing)}
          >
            {isEditing ? 'Save' : 'Change'}
          </Button>
        </Grid>
      )}
    </Grid>
  )
}

export default UserProfileInfo
