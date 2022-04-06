import React from 'react'

import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import CardActions from '@mui/material/CardActions'
import Typography from '@mui/material/Typography'
import Avatar from '@mui/material/Avatar'
import IconButton from '@mui/material/IconButton'
import { Link } from 'react-router-dom'

import { Props } from './interfaces'

import BusinessIcon from '@mui/icons-material/Business'

const Vacancy: React.FC<Props> = ({ breakpoints, company }) => {
  const { xs, sm, md, lg } = breakpoints

  return (
    <Grid item xs={xs} sm={sm} md={md} lg={lg}>
      <Card>
        <CardHeader
          avatar={
            <Avatar aria-label="company" src={company.companyLogo || ''}>
              {company.name.charAt(0).toUpperCase()}
            </Avatar>
          }
          title={company.name}
          subheader={company.country}
        />
        <CardContent>
          <Typography variant="body2" color="text.primary">
            {company.description}
          </Typography>
        </CardContent>
        <CardActions>
          <Link to={`/companies/profile/${company.id}`}>
            <IconButton size="medium" edge="end">
              <BusinessIcon />
            </IconButton>
          </Link>
        </CardActions>
      </Card>
    </Grid>
  )
}

export default Vacancy
