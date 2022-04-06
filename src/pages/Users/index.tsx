import React from 'react'

import { useForm, SubmitHandler } from 'react-hook-form'
import usersFetcher from './functions/fetchUsers'
import composeUrl from '../../utils/composeUrl'

import { User } from '../../components'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import Alert from '@mui/material/Alert'
import CircularProgress from '@mui/material/CircularProgress'
import Stack from '@mui/material/Stack'
import IconButton from '@mui/material/IconButton'

import SearchIcon from '@mui/icons-material/Search'

import { User as IUser } from '../../app/slices/user/interfaces'
import { Inputs } from './interfaces'

const breakpoints = {
  xs: 12,
  sm: 6,
  md: 3
}

const Users: React.FC = () => {
  const [error, setError] = React.useState('')
  const [isLoaded, setIsLoaded] = React.useState(false)
  const [users, setUsers] = React.useState<IUser[]>([])
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<Inputs>()

  const onSubmit: SubmitHandler<Inputs> = async data => {
    try {
      setIsLoaded(false)
      setError('')
      const url = composeUrl(data, 'https://yourjob-api.herokuapp.com/users')
      const users = await usersFetcher.filter(url)
      setUsers(users)
    } catch (err) {
      err instanceof Error ? setError(err.message) : setError('Unable to search users!')
    } finally {
      setIsLoaded(true)
    }
  }

  React.useEffect(() => {
    ;(async () => {
      try {
        setIsLoaded(false)
        const users = await usersFetcher.list()
        setUsers(users)
      } catch (err) {
        err instanceof Error ? setError(err.message) : setError('Unable to load list of users!')
      } finally {
        setIsLoaded(true)
      }
    })()
  }, [])

  return (
    <Grid container spacing={{ xs: 1, sm: 2, md: 3 }}>
      <Grid item sx={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
        <Stack
          sx={{ width: '95%' }}
          direction={{ xs: 'column', sm: 'row' }}
          spacing={1}
          component="form"
          onSubmit={handleSubmit(onSubmit)}
        >
          <TextField
            label="Working Area"
            fullWidth
            {...register('workingArea')}
            variant="outlined"
          />
          <TextField
            label="Age"
            fullWidth
            {...register('age', {
              pattern: {
                value: /^[\d]*[/]{1}[\d]*$/,
                message: 'Invalid format (ex: 20/35)'
              }
            })}
            placeholder="minAge/maxAge"
            variant="outlined"
            error={errors.age && true}
            helperText={errors.age?.message}
          />
          <Box sx={{ display: 'grid', placeItems: 'center' }}>
            <IconButton edge="end" type="submit">
              <SearchIcon />
            </IconButton>
          </Box>
        </Stack>
      </Grid>
      {!isLoaded ? (
        <Grid item sx={{ width: '100%', textAlign: 'center' }}>
          <CircularProgress color="secondary" />
        </Grid>
      ) : error ? (
        <Grid item sx={{ width: '100%', p: 10 }}>
          <Alert severity="error">{error}</Alert>
        </Grid>
      ) : (
        users.map(user => <User key={user.id} breakpoints={breakpoints} user={user} />)
      )}
    </Grid>
  )
}

export default Users
