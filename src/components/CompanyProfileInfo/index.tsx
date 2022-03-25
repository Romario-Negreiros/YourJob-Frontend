import React from 'react'

import useStyles from '../../styles/global'
import { storage } from '../../lib/firebase'
import { useForm, SubmitHandler } from 'react-hook-form'

import Grid from '@mui/material/Grid'
import Alert from '@mui/material/Alert'
import Avatar from '@mui/material/Avatar'
import TextField from '@mui/material/TextField'
import Paper from '@mui/material/Paper'
import Button from '@mui/material/Button'

import UploadIcon from '@mui/icons-material/UploadFileRounded'

import { Company } from '../../app/slices/company/interfaces'
import { Props, Inputs } from './interfaces'

const CompanyProfileInfo: React.FC<Props> = ({ company, setCompany, isCurrentCompany }) => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<Inputs>({
    defaultValues: {
      description: company.description,
      contactNumber: company.contactNumber,
      website: company.website
    }
  })
  const [error, setError] = React.useState('')
  const [isEditing, setIsEditing] = React.useState(false)
  const classes = useStyles()

  const onSubmit: SubmitHandler<Inputs> = async data => {
    try {
      const companyCopy: Company = JSON.parse(JSON.stringify(company))
      if (data.companyLogo[0]) {
        const storageRef = storage.ref(storage.storage, `companies/${company.email}/companyLogo`)
        await storage.uploadBytes(storageRef, data.companyLogo[0])
        companyCopy.companyLogo = await storage.getDownloadURL(storageRef)
      }
      const dataCopy: Partial<Company> = JSON.parse(JSON.stringify(data))
      delete dataCopy.companyLogo

      setCompany({ ...companyCopy, ...dataCopy })
      setIsEditing(false)
    } catch (err) {
      setError('Unable to update information!')
    }
  }

  if (error) {
    return (
      <Grid>
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
      component={isEditing ? 'form' : 'div'}
      onSubmit={handleSubmit(onSubmit)}
      autoComplete="off"
    >
      <Grid item xs={12}>
        <label htmlFor="company-logo">
          <TextField
            {...register('companyLogo')}
            type="file"
            inputProps={{
              accept: 'image/*'
            }}
            id={isEditing ? 'company-logo' : 'inative'}
            sx={{ display: 'none' }}
          />
          {isEditing ? (
            <Avatar sx={{ margin: 'auto', cursor: 'pointer' }}>
              <UploadIcon />
            </Avatar>
          ) : (
            <Avatar sx={{ margin: 'auto' }} src={company.companyLogo || ''}>
              {company.companyLogo ? '' : company.name.charAt(0).toUpperCase()}
            </Avatar>
          )}
        </label>
      </Grid>
      <Grid item xs={12} md={6}>
        <Paper elevation={8} className={classes.infoCompPaper}>
          <TextField
            label="Name"
            variant="standard"
            defaultValue={company.name}
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
            defaultValue={company.email}
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
            label="Description"
            {...register('description', {
              required: 'Description is required!'
            })}
            variant="standard"
            fullWidth
            defaultValue={company.description}
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
            label="Contact Number"
            {...register('contactNumber', {
              required: 'Contact number is required!'
            })}
            variant="standard"
            fullWidth
            defaultValue={company.contactNumber}
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
            label="Country"
            variant="standard"
            fullWidth
            defaultValue={company.country}
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
            label="Website"
            {...register('website', {
              required: 'Website is required'
            })}
            variant="standard"
            fullWidth
            InputProps={{
              readOnly: true,
              disableUnderline: true
            }}
            error={errors.website && true}
            helperText={errors.website?.message}
          />
        </Paper>
      </Grid>
      {isCurrentCompany && (
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

export default CompanyProfileInfo
