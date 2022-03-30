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

import BusinessIcon from '@mui/icons-material/Business'
import LinkIcon from '@mui/icons-material/Link'

const Vacancy: React.FC<Props> = ({ breakpoints }) => {
  const { xs, sm, md, lg } = breakpoints

  return (
    <Grid item xs={xs} sm={sm} md={md} lg={lg}>
      <Card>
        <CardHeader
          avatar={<Avatar aria-label="vacancy">R</Avatar>}
          title="company.name"
          subheader="vacancy.createdAt"
        />
        <CardContent>
          <Typography variant="body2" color="text.primary">
            This impressive paella is a perfect party dish and a fun meal to cook together with your
            guests. Add 1 cup of frozen peas along with the mussels, if you like.
          </Typography>
        </CardContent>
        <CardActions>
          <IconButton size="medium" edge="end">
            <LinkIcon />
          </IconButton>
          <IconButton size="medium" edge="end">
            <BusinessIcon />
          </IconButton>
        </CardActions>
      </Card>
    </Grid>
  )
}

export default Vacancy
