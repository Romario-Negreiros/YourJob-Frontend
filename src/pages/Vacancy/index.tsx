import React from 'react'

import fetchVacancy from './functions/fetchVacancy'
import useStyles from '../../styles/global'

import Paper from '@mui/material/Paper'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import CircularProgress from '@mui/material/CircularProgress'
import Typography from '@mui/material/Typography'
import Avatar from '@mui/material/Avatar'
import Alert from '@mui/material/Alert'
import Link from '@mui/material/Link'
import { Link as RouterLink, useParams } from 'react-router-dom'
import { VacancyPageInfo } from '../../components'

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
      spacing={4}
      sx={{ padding: { xs: '0 5px', sm: '0 25px', md: '0 45px', lg: '0 85px' } }}
    >
      <Grid item xs={12}>
        <Paper className={classes.paper} elevation={8} sx={{ paddingBottom: '0' }}>
          <Box sx={{ width: '100%', textAlign: 'center' }}>
            <Typography component="div" variant="h6">
              {company.name}
            </Typography>
            <Avatar sx={{ margin: 'auto' }} src={company.companyLogo || ''}>
              {company.name.charAt(0).toUpperCase()}
            </Avatar>
            <RouterLink className={classes.link} to={`/companies/profile/${company.id}`}>
              <Link underline="always" component="button" variant="subtitle2">
                Visit company profile
              </Link>
            </RouterLink>
          </Box>
          <Box
            sx={{
              width: '100%',
              mt: 4,
              display: 'flex',
              justifyContent: 'space-between',
              flexDirection: { xs: 'column', md: 'row' }
            }}
          >
            <Typography variant="subtitle2">
              Created at: {new Date(vacancy.createdAt).toLocaleDateString('US')}
            </Typography>
            <Typography variant="subtitle2">
              Last update at: {new Date(vacancy.createdAt).toLocaleDateString('US')}
            </Typography>
          </Box>
        </Paper>
      </Grid>
      <Grid item xs={12}>
        <VacancyPageInfo vacancy={vacancy} company={company} setVacancy={setVacancy} />
      </Grid>
    </Grid>
  )
}

export default Vacancy
