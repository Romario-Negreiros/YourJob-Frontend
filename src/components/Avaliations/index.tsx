import React from 'react'

import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import CardActions from '@mui/material/CardActions'
import Typography from '@mui/material/Typography'
import Avatar from '@mui/material/Avatar'
import Rating from '@mui/material/Rating'

import { Company } from '../../app/slices/company/interfaces'

interface Props {
  company: Company
}

const Avaliations: React.FC<Props> = ({ company }) => {
  return (
    <Grid container spacing={2}>
      {new Array(10).fill(1).map((v, i) => (
        <Grid item key={i + 'ok'} xs={12} md={6} lg={4}>
          <Card>
            <CardHeader
              avatar={<Avatar aria-label="vagancy">R</Avatar>}
              title="user.name"
              subheader="avaliation.createdAt"
            />
            <CardContent>
              <Typography variant="body1" color="text.primary">
                This impressive paella is a perfect party dish and a fun meal to cook together with
                your guests. Add 1 cup of frozen peas along with the mussels, if you like.
              </Typography>
              <Typography variant="body2" component="div" sx={{ mt: 2 }}>Not recommended</Typography>
            </CardContent>
            <CardActions>
              <Rating name="half-rating" defaultValue={2.5} precision={0.5} readOnly />
            </CardActions>
          </Card>
        </Grid>
      ))}
    </Grid>
  )
}

export default Avaliations
