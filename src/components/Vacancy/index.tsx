import React from 'react'

import saveVacancy from './functions/saveVacancy'
import removeSavedVacancy from './functions/removeSavedVacancy'
import deleteVacancy from './functions/deleteVacancy'
import { useAppDispatch } from '../../app/hooks'

import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import CardActions from '@mui/material/CardActions'
import Typography from '@mui/material/Typography'
import Avatar from '@mui/material/Avatar'
import IconButton from '@mui/material/IconButton'

import { Props } from './interfaces'

import BookmarkAdd from '@mui/icons-material/BookmarkAdd'
import BookmarkRemove from '@mui/icons-material/BookmarkRemove'
import LinkIcon from '@mui/icons-material/Link'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'

import toastHandler from '../../context/Toast'

const Vacancy: React.FC<Props> = ({
  breakpoints,
  company,
  vacancy,
  currentUser,
  currentCompany,
  setUser,
  setCompany
}) => {
  const { xs, sm, md, lg } = breakpoints
  const dispatch = useAppDispatch()
  const { handleOpen } = React.useContext(toastHandler)

  return (
    <Grid item xs={xs} sm={sm} md={md} lg={lg}>
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
                  removeSavedVacancy(currentUser, vacancy.id, handleOpen, dispatch, setUser)
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
            <IconButton
              size="medium"
              edge="end"
              onClick={() =>
                deleteVacancy(currentCompany, vacancy.id, handleOpen, dispatch, setCompany)
              }
            >
              <DeleteIcon />
            </IconButton>
          )}
        </CardActions>
      </Card>
    </Grid>
  )
}

export default Vacancy
