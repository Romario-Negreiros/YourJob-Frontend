import React from 'react'

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
import LinkIcon from '@mui/icons-material/Link'

const Vacancy: React.FC<Props> = ({ breakpoints, company, vacancy }) => {
  const { xs, sm, md, lg } = breakpoints
  console.log(vacancy)

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
            {vacancy.description}
          </Typography>
          <Typography variant="body1" color="text.secondary">
            ${vacancy.salary.toLocaleString('en-US')}
          </Typography>
        </CardContent>
        <CardActions>
          <IconButton size="medium" edge="end">
            <BookmarkAdd />
          </IconButton>
          <IconButton size="medium" edge="end">
            <LinkIcon />
          </IconButton>
          {}
        </CardActions>
      </Card>
    </Grid>
  )
}

export default Vacancy
