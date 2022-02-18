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

import FavoriteIcon from '@mui/icons-material/Favorite'
import LinkIcon from '@mui/icons-material/Link'

const Vagancy: React.FC<Props> = () => {
  return (
    <Grid item xs={12} sm={6} md={4}>
      <Card>
        <CardHeader
          avatar={<Avatar aria-label="vagancy">R</Avatar>}
          title="company.name"
          subheader="vagancy.createdAt"
        />
        <CardContent>
          <Typography variant="body2" color="text.primary">
            This impressive paella is a perfect party dish and a fun meal to cook together with your
            guests. Add 1 cup of frozen peas along with the mussels, if you like.
          </Typography>
        </CardContent>
        <CardActions>
          <IconButton size="medium" edge="end">
            <FavoriteIcon />
          </IconButton>
          <IconButton size="medium" edge="end">
            <LinkIcon />
          </IconButton>
        </CardActions>
      </Card>
    </Grid>
  )
}

export default Vagancy
