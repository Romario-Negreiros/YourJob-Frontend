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

import AccountIcon from '@mui/icons-material/AccountBox'

const User: React.FC<Props> = ({ breakpoints, user }) => {
  const { xs, sm, md, lg } = breakpoints

  return (
    <Grid item xs={xs} sm={sm} md={md} lg={lg}>
      <Card>
        <CardHeader
          avatar={
            <Avatar aria-label="user" src={user.profilePicture || ''}>
              {user.name.charAt(0).toUpperCase()}
            </Avatar>
          }
          title={user.name}
          subheader={user.age + ' years old'}
        />
        <CardContent>
          <Typography variant="body2" color="text.primary">
            {user.bio}
          </Typography>
        </CardContent>
        <CardActions>
          <Link to={`/profile/${user.id}`}>
            <IconButton size="medium" edge="end">
              <AccountIcon />
            </IconButton>
          </Link>
        </CardActions>
      </Card>
    </Grid>
  )
}

export default User
