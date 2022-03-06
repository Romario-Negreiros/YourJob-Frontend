import React from 'react'

import useStyles from './styles'
import { useForm, SubmitHandler } from 'react-hook-form'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { updateData } from '../../app/slices/companyRegisterForm'
import { styled } from '@mui/material/styles'

import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'

import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight'

import { Props, Inputs } from './interfaces'

const CompanyProfileForm: React.FC<Props> = ({ handleNext }) => {
  const initialState = useAppSelector(state => state.companyRegisterForm.data)
  const dispatch = useAppDispatch()
  const classes = useStyles()
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<Inputs>({ defaultValues: { ...initialState } })

  const onSubmit: SubmitHandler<Inputs> = data => {
    dispatch(updateData({ ...data }))

    handleNext()
  }

  const Input = styled('input')({
    display: 'none'
  })

  return (
    <Grid
      container
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      className={classes.grid}
      rowSpacing={4}
    >
      <Grid item sx={{ textAlign: 'center' }} xs={12} sm={6} lg={4}>
        <TextField
          label="Description"
          sx={{ width: 240 }}
          {...register('description', {
            required: {
              value: true,
              message: 'Description is required!'
            }
          })}
          error={errors.description && true}
          helperText={errors.description?.message}
        />
      </Grid>
      <Grid item sx={{ textAlign: 'center' }} xs={12} sm={6} lg={4}>
        <TextField
          label="Country"
          sx={{ width: 240 }}
          {...register('country', {
            required: {
              value: true,
              message: 'Country is required!'
            }
          })}
          error={errors.country && true}
          helperText={errors.country?.message}
        />
      </Grid>
      <Grid item sx={{ textAlign: 'center' }} xs={12} sm={6} lg={4}>
        <TextField
          label="Region"
          sx={{ width: 240 }}
          {...register('region', {
            required: {
              value: true,
              message: 'Region is required!'
            }
          })}
          error={errors.region && true}
          helperText={errors.region?.message}
        />
      </Grid>
      <Grid item sx={{ textAlign: 'center' }} xs={12} sm={6} lg={4}>
        <TextField
          label="Address"
          sx={{ width: 240 }}
          {...register('address', {
            required: {
              value: true,
              message: 'Address is required!'
            }
          })}
          error={errors.address && true}
          helperText={errors.address?.message}
        />
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
            type="file"
            accept="image/*"
            id="company-logo"
            sx={{ display: 'none' }}
            {...register('companyLogo')}
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
