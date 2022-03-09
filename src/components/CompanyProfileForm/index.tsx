import React from 'react'

import useStyles from './styles'
import { useForm, SubmitHandler } from 'react-hook-form'
import { useAppSelector, useAppDispatch } from '../../app/hooks'
import { updateData } from '../../app/slices/companyRegisterForm'
import { styled } from '@mui/material/styles'
import convertFileObj from '../../utils/convertFileObj'

import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import TextField from '@mui/material/TextField'

import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight'

import { Props, Inputs, Country } from './interfaces'

const CompanyProfileForm: React.FC<Props> = ({ handleNext }) => {
  const [countries, setCountries] = React.useState<Country[]>([])
  const initialState = useAppSelector(state => state.companyRegisterForm.data)
  const dispatch = useAppDispatch()
  const classes = useStyles()
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<Inputs>({
    defaultValues: {
      contactNumber: initialState?.contactNumber,
      country: initialState?.country,
      description: initialState?.description,
      website: initialState?.website
    }
  })

  const onSubmit: SubmitHandler<Inputs> = data => {
    const stringifiedCompanyLogo = convertFileObj(data.companyLogo[0])
    dispatch(updateData({ ...data, companyLogo: stringifiedCompanyLogo }))

    handleNext()
  }

  const Input = styled('input')({
    display: 'none'
  })

  React.useEffect(() => {
    ;(async () => {
      try {
        const response = await fetch(
          'https://restcountries.com/v2/all?fields=name,alpha2Code,callingCodes,flags'
        )
        const countries = await response.json()
        setCountries(countries)
      } catch (err) {
        console.log(err)
      }
    })()
  }, [])

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
        <FormControl sx={{ width: 240 }}>
          <InputLabel id="country">Country</InputLabel>
          <Select
            labelId="country"
            {...register('country', { required: { value: true, message: 'Country is required!' } })}
            label="Country"
          >
            {countries.map(country => (
              <MenuItem key={country.name} value={country.name} defaultValue=''>
                {country.flags[0]} {country.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
      <Grid item sx={{ textAlign: 'center' }} xs={12} sm={6} lg={4}>
        <TextField
          label="Contact Number"
          sx={{ width: 240 }}
          {...register('contactNumber', {
            required: {
              value: true,
              message: 'Contact number is required!'
            }
          })}
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
        <label htmlFor="company-logo">
          <Typography variant="body2">Logo</Typography>
          <Input
            {...register('companyLogo')}
            type="file"
            accept="image/*"
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
