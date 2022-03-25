import React from 'react'

import useStyles from './styles'
import { useForm, SubmitHandler } from 'react-hook-form'
import { useAppSelector, useAppDispatch } from '../../app/hooks'
import { updateData } from '../../app/slices/companyRegisterForm'
import { storage } from '../../lib/firebase'

import Grid from '@mui/material/Grid'
import Alert from '@mui/material/Alert'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import Autocomplete from '@mui/material/Autocomplete'
import Box from '@mui/material/Box'
import CircularProgress from '@mui/material/CircularProgress'

import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight'

import { Props, Inputs, Country } from './interfaces'

const CompanyProfileForm: React.FC<Props> = ({ handleNext }) => {
  const [countries, setCountries] = React.useState<Array<Country>>([])
  const initialState = useAppSelector(state => state.companyRegisterForm.data)
  const [error, setError] = React.useState('')
  const dispatch = useAppDispatch()
  const classes = useStyles()
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors }
  } = useForm<Inputs>({
    defaultValues: {
      contactNumber: initialState?.contactNumber,
      description: initialState?.description,
      website: initialState?.website
    }
  })

  const onSubmit: SubmitHandler<Inputs> = async data => {
    try {
      const country = countries.find(country => country.name.common === data.country)
      const clRef = storage.ref(storage.storage, `companies/${initialState?.email}/companyLogo`)
      let clUrl = ''
      if (data.companyLogo[0]) {
        await storage.uploadBytes(clRef, data.companyLogo[0])
        clUrl = await storage.getDownloadURL(clRef)
      }

      dispatch(
        updateData({
          ...data,
          alpha2Code: country?.cca2,
          companyLogo: clUrl || initialState?.companyLogo
        })
      )
      handleNext()
    } catch (err) {
      setError('Something went wrong while saving your data, please try again!')
    }
  }

  React.useEffect(() => {
    ;(async () => {
      const response = await fetch('https://restcountries.com/v3.1/all?fields=name,flags,cca2,idd')
      const countries: Array<Country> = await response.json()

      setCountries(countries)
      if (initialState?.country) {
        setValue('country', initialState.country)
      }
    })()
  }, [])

  if (!countries?.length) {
    return (
      <Grid className={classes.grid}>
        <CircularProgress color="secondary" />
      </Grid>
    )
  } else if (error) {
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
          label="Description"
          sx={{ width: '100%' }}
          {...register('description', {
            required: {
              value: true,
              message: 'Description is required!'
            }
          })}
          multiline
          rows={3}
          error={errors.description && true}
          helperText={errors.description?.message}
        />
      </Grid>
      <Grid item xs={12} lg={4} sx={{ textAlign: 'center' }}>
        <Autocomplete
          autoHighlight
          options={countries}
          getOptionLabel={(option: any) => option.name.common}
          renderOption={(props, option: any) => (
            <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
              <img loading="lazy" width="20" src={option.flags.svg} alt="" />
              {option.name.common}
            </Box>
          )}
          renderInput={params => (
            <TextField
              {...params}
              {...register('country', {
                required: {
                  value: true,
                  message: 'Country is required!'
                },
                value: initialState?.country
              })}
              label="Country"
              sx={{ width: 240 }}
              error={errors.country && true}
              helperText={errors.country?.message}
              inputProps={{
                ...params.inputProps
              }}
            />
          )}
        />
      </Grid>
      <Grid item sx={{ textAlign: 'center' }} xs={12} sm={6} lg={4}>
        <TextField
          type="number"
          {...register('contactNumber', {
            required: {
              value: true,
              message: 'Contact number is required!'
            }
          })}
          label="Contact number"
          sx={{ width: 240 }}
          error={errors.contactNumber && true}
          helperText={errors.contactNumber?.message}
        />
      </Grid>
      <Grid item sx={{ textAlign: 'center' }} xs={12} sm={6} lg={4}>
        <TextField
          label="Website"
          sx={{ width: 240 }}
          {...register('website', {
            required: {
              value: true,
              message: 'Website is required!'
            }
          })}
          error={errors.website && true}
          helperText={errors.website?.message}
        />
      </Grid>
      <Grid item sx={{ textAlign: 'center' }} xs={12}>
        <label htmlFor="company-logo" style={{ display: 'inline-block', width: 240 }}>
          <Typography variant="body2">Logo</Typography>
          <TextField
            {...register('companyLogo')}
            type="file"
            inputProps={{
              accept: 'image/*'
            }}
            id="company-logo"
            sx={{ display: 'none' }}
          />
          <Button variant="contained" color="secondary" component="span">
            Upload
          </Button>
        </label>
      </Grid>
      <Grid item sx={{ textAlign: 'center ' }} xs={12}>
        <Button variant="contained" type="submit" endIcon={<KeyboardArrowRightIcon />}>
          Next
        </Button>
      </Grid>
    </Grid>
  )
}

export default CompanyProfileForm
