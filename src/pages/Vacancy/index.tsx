import React from 'react'

import fetchVacancy from './functions/fetchVacancy'
import useStyles from '../../styles/global'

import Paper from '@mui/material/Paper'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import CircularProgress from '@mui/material/CircularProgress'
import Alert from '@mui/material/Alert'
import Avatar from '@mui/material/Avatar'
import Typography from '@mui/material/Typography'

import { useParams } from 'react-router-dom'

import { Vacancy as IVacancy } from '../../app/slices/company/interfaces'

const Vacancy: React.FC = () => {
  const [vacancy, setVacancy] = React.useState<IVacancy | null>(null)
  const [error, setError] = React.useState('')
  const [isLoaded, setIsLoaded] = React.useState(false)
  const params = useParams()
  const classes = useStyles()
  const controller = new AbortController()

  React.useEffect(() => {
    ;(async () => {
      try {
        if (params.id) {
          const vacancy = await fetchVacancy(params.id, controller)
          setVacancy(vacancy)
          return
        }
        throw new Error('No vacancy id!')
      } catch (err) {
        err instanceof Error ? setError(err.message) : setError('Failed to load vacancy!')
      } finally {
        setIsLoaded(true)
      }
    })()

    return () => controller.abort()
  }, [])

  console.log(vacancy)

  if (!isLoaded) {
    return (
      <Box className={classes.box2}>
        <CircularProgress color="secondary" />
      </Box>
    )
  } else if (error || !vacancy) {
    return (
      <Box className={classes.box2}>
        <Alert severity="error">{error}</Alert>
      </Box>
    )
  }
  const company = vacancy['company:vacancies']
  return (
    <Grid
      container
      spacing={2}
      sx={{ padding: { xs: '0 5px', sm: '0 25px', md: '0 45px', lg: '0 85px' } }}
    >
      <Grid item xs={12}>
        <Paper className={classes.paper} sx={{ paddingBottom: '0' }}>
          <Box sx={{ width: '100%', textAlign: 'center' }}>
            <Typography component="div" variant="h6">
              {company.name}
            </Typography>
            <Avatar sx={{ margin: 'auto' }} src={company.companyLogo || ''}>{company.name.charAt(0).toUpperCase()}</Avatar>
          </Box>
          <Box sx={{ width: '100%', mt: 4 }}>
            <Typography variant="subtitle1">
              Company created at: {new Date(company.createdAt).toLocaleDateString('US')}
            </Typography>
            <Typography variant="subtitle1">
              Vacancy created at: {new Date(vacancy.createdAt).toLocaleDateString('US')}
            </Typography>
            <Typography variant="subtitle1">
              Vacancy last update at: {new Date(vacancy.createdAt).toLocaleDateString('US')}
            </Typography>
          </Box>
        </Paper>
      </Grid>
    </Grid>
  )
}

export default Vacancy
