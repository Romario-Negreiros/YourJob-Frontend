import React from 'react'

import update from '../../utils/Update'
import useStyles from '../../styles/global'
import updateData from './functions/updateData'
import { useForm, SubmitHandler } from 'react-hook-form'
import { useAppDispatch } from '../../app/hooks'

import Grid from '@mui/material/Grid'
import Alert from '@mui/material/Alert'
import CircularProgress from '@mui/material/CircularProgress'
import Avatar from '@mui/material/Avatar'
import TextField from '@mui/material/TextField'
import Paper from '@mui/material/Paper'
import Button from '@mui/material/Button'

import UploadIcon from '@mui/icons-material/UploadFileRounded'

import { Props, Inputs } from './interfaces'

const CompanyProfileInfo: React.FC<Props> = ({ company, setCompany, isCurrentCompany }) => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<Inputs>({
    defaultValues: {
      description: company.description,
      contactNumber: '+' + company.contactNumber,
      website: company.website
    }
  })
  const [error, setError] = React.useState('')
  const [isLoaded, setIsLoaded] = React.useState(true)
  const [isEditing, setIsEditing] = React.useState(false)
  const classes = useStyles()
  const dispatch = useAppDispatch()
  const controller = React.useMemo(() => new AbortController(), [])

  const onSubmit: SubmitHandler<Inputs> = async data => {
    try {
      setIsLoaded(false)
      const updatedCompany = await updateData(company, data)
      await update.company(updatedCompany, dispatch, controller)

      setCompany(updatedCompany)
      setIsEditing(false)
    } catch (err) {
      err instanceof Error ? setError(err.message) : setError('Unable to update information!')
    } finally {
      setIsLoaded(true)
    }
  }

  React.useEffect(() => {
    return () => controller.abort()
  })

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
              {company.name.charAt(0).toUpperCase()}
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
            fullWidth
            variant="standard"
            multiline
            defaultValue={company.description}
            InputProps={{
              readOnly: !isEditing,
              disableUnderline: !isEditing
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
            InputProps={{
              readOnly: !isEditing,
              disableUnderline: !isEditing
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
              readOnly: !isEditing,
              disableUnderline: !isEditing
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
