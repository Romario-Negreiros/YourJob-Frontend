import React from 'react'

import saveVacancy from './functions/saveVacancy'
import removeSavedVacancy from './functions/removeSavedVacancy'
import { useAppDispatch } from '../../app/hooks'

import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import CardActions from '@mui/material/CardActions'
import Typography from '@mui/material/Typography'
import Avatar from '@mui/material/Avatar'
import IconButton from '@mui/material/IconButton'
import Snackbar from '@mui/material/Snackbar'
import Alert from '@mui/material/Alert'

import { Props } from './interfaces'
import { AlertColor } from '@mui/material'

import BookmarkAdd from '@mui/icons-material/BookmarkAdd'
import BookmarkRemove from '@mui/icons-material/BookmarkRemove'
import LinkIcon from '@mui/icons-material/Link'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'

const Vacancy: React.FC<Props> = ({
  breakpoints,
  company,
  vacancy,
  currentUser,
  currentCompany
}) => {
  const { xs, sm, md, lg } = breakpoints
  const [isOpen, setIsOpen] = React.useState(false)
  const [message, setMessage] = React.useState('')
  const [severity, setSeverity] = React.useState<AlertColor | undefined>()
  const dispatch = useAppDispatch()

  const handleOpen = (message: string, severity: AlertColor) => {
    setIsOpen(true)
    setMessage(message)
    setSeverity(severity)
  }

  const handleClose = (event: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return
    }

    setIsOpen(false)
    setMessage('')
  }

  return (
    <Grid item xs={xs} sm={sm} md={md} lg={lg}>
      <Snackbar open={isOpen} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={severity} sx={{ width: '100%' }}>
          {message}
        </Alert>
      </Snackbar>
      <Card>
        <CardHeader
          avatar={
            <Avatar aria-label="vacancy" src={company?.companyLogo || ''}>
              {company?.companyLogo ? '' : company?.name?.charAt(0)}
            </Avatar>
          }
          title={company.name}
          subheader={new Date(vacancy.createdAt).toLocaleDateString()}
        />
        <CardContent>
          <Typography variant="body2" color="text.primary">
            {vacancy.description.slice(0, 20)}...
          </Typography>
          <Typography variant="body1" color="text.secondary">
            ${vacancy.salary.toLocaleString('en-US')}
          </Typography>
        </CardContent>
        <CardActions>
          {currentUser && (
            <IconButton
              size="medium"
              edge="end"
              onClick={() => {
                if (
                  currentUser.savedVacancies.find(savedVacancy => savedVacancy.id === vacancy.id)
                ) {
                  removeSavedVacancy(currentUser, vacancy, handleOpen, dispatch)
                } else {
                  saveVacancy(currentUser, vacancy, handleOpen, dispatch)
                }
              }}
            >
              {currentUser.savedVacancies.find(savedVacancy => savedVacancy.id === vacancy.id) ? (
                <BookmarkRemove />
              ) : (
                <BookmarkAdd />
              )}
            </IconButton>
          )}
          {currentCompany ? (
            <IconButton size="medium" edge="end">
              <EditIcon />
            </IconButton>
          ) : (
            <IconButton size="medium" edge="end">
              <LinkIcon />
            </IconButton>
          )}
          {currentCompany && (
            <IconButton size="medium" edge="end">
              <DeleteIcon />
            </IconButton>
          )}
        </CardActions>
      </Card>
    </Grid>
  )
}

export default Vacancy
