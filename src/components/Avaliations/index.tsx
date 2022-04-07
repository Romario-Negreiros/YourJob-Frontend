import React from 'react'

import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import CardActions from '@mui/material/CardActions'
import Typography from '@mui/material/Typography'
import Alert from '@mui/material/Alert'
import Rating from '@mui/material/Rating'

import { Props } from './interfaces'

const Avaliations: React.FC<Props> = ({ avaliations }) => {
  if (!avaliations.length) {
    return (
      <Grid sx={{ display: 'grid', placeItems: 'center' }}>
        <Alert severity="error">This company hasn&apos;t been avaliated yet!</Alert>
      </Grid>
    )
  }
  return (
    <Grid container spacing={2} sx={{ paddingBottom: 2 }}>
      {avaliations.map(avaliation => (
        <Grid item key={avaliation.id} xs={12} md={6} lg={4}>
          <Card>
            <CardHeader subheader={new Date(avaliation.createdAt).toLocaleDateString('US')} />
            <CardContent>
              <Typography variant="body1" color="text.primary">
                {avaliation.comment}
              </Typography>
              <Typography variant="body2" component="div" sx={{ mt: 2 }}>
                {avaliation.recommendation}
              </Typography>
            </CardContent>
            <CardActions>
              <Rating name="half-rating" defaultValue={avaliation.grade} readOnly />
            </CardActions>
          </Card>
        </Grid>
      ))}
    </Grid>
  )
}

export default Avaliations
