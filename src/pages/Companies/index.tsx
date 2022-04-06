import React from 'react'

import { useForm, SubmitHandler } from 'react-hook-form'
import companiesFetcher from './functions/companiesFetcher'
import composeUrl from '../../utils/composeUrl'

import { Company } from '../../components'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import Alert from '@mui/material/Alert'
import CircularProgress from '@mui/material/CircularProgress'
import Stack from '@mui/material/Stack'
import IconButton from '@mui/material/IconButton'

import SearchIcon from '@mui/icons-material/Search'

import { Company as ICompany } from '../../app/slices/company/interfaces'
import { Inputs } from './interfaces'

const breakpoints = {
  xs: 12,
  sm: 6,
  md: 3
}

const Companies: React.FC = () => {
  const [error, setError] = React.useState('')
  const [isLoaded, setIsLoaded] = React.useState(false)
  const [companies, setCompanies] = React.useState<ICompany[]>([])
  const { register, handleSubmit } = useForm<Inputs>()

  const onSubmit: SubmitHandler<Inputs> = async data => {
    try {
      setIsLoaded(false)
      setError('')
      const url = composeUrl(data, 'https://yourjob-api.herokuapp.com/companies')
      const companies = await companiesFetcher.filter(url)
      setCompanies(companies)
    } catch (err) {
      err instanceof Error ? setError(err.message) : setError('Unable to search companies!')
    } finally {
      setIsLoaded(true)
    }
  }

  React.useEffect(() => {
    ;(async () => {
      try {
        setIsLoaded(false)
        const companies = await companiesFetcher.list()
        setCompanies(companies)
      } catch (err) {
        err instanceof Error ? setError(err.message) : setError('Unable to load list of companies!')
      } finally {
        setIsLoaded(true)
      }
    })()
  }, [])

  return (
    <Grid container spacing={{ xs: 1, sm: 2, md: 3 }}>
      <Grid item sx={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
        <Stack
          sx={{ width: { xs: '95%', sm: 'fit-content' } }}
          direction={{ xs: 'column', sm: 'row' }}
          spacing={1}
          component="form"
          onSubmit={handleSubmit(onSubmit)}
        >
          <TextField label="Country" fullWidth {...register('country')} variant="outlined" />
          <TextField label="Name" fullWidth {...register('name')} variant="outlined" />
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
        companies.map(company => (
          <Company key={company.id} breakpoints={breakpoints} company={company} />
        ))
      )}
    </Grid>
  )
}

export default Companies
