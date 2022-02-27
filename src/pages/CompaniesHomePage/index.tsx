import React from 'react'

import useStyles from '../../styles/global'

import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Link from '@mui/material/Link'
import { Link as RouterLink } from 'react-router-dom'
import Lottie from 'lottie-react'

import Building from '../../assets/animations/building.json'

const CompaniesHomePage: React.FC = () => {
  const classes = useStyles()

  return (
    <Grid container columns={{ xs: 1, md: 2 }} columnSpacing={2}>
      <Grid item className={classes.grid} xs={1}>
        <Typography className={`${classes.typography} ${classes.customFont}`}>
          Share and enhance your company!
        </Typography>
      </Grid>
      <Grid item className={classes.grid} xs={1}>
        <Lottie animationData={Building} loop autoplay></Lottie>
      </Grid>

      <Grid item className={classes.grid} xs={1} sx={{ mt: 4 }}>
        <Box className={classes.box}>
          <Typography variant="h2" className={`${classes.typography} ${classes.customFont}`}>
            Share available vagancies in your company!
          </Typography>
          <Typography
            variant="body1"
            className={classes.typography}
            sx={{ textAlign: 'justify !important', textJustify: 'inter-word' }}
          >
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Perferendis nam sequi ex
            blanditiis, eveniet accusamus nulla illum, fugiat aut suscipit quo neque in quis, sint
            ab dolorum delectus earum natus aliquam nostrum quae.
          </Typography>
          <RouterLink className={classes.link} to="/companies/list">
            <Link underline="always" component="button" variant="h6">
              Companies
            </Link>
          </RouterLink>
          <RouterLink className={classes.link} to="/companies/register">
            <Link underline="always" component="button" variant="h6">
              Start now!
            </Link>
          </RouterLink>
        </Box>
      </Grid>

      <Grid item className={classes.grid} xs={1} sx={{ mt: 4 }}>
        <Box className={classes.box}>
          <Typography variant="h2" className={`${classes.typography} ${classes.customFont}`}>
            Find the best workers out there!
          </Typography>
          <Typography
            variant="body1"
            sx={{ textAlign: 'justify !important', textJustify: 'inter-word' }}
            className={classes.typography}
          >
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Esse asperiores voluptatem
            voluptates saepe repellat architecto, impedit nostrum, maiores facere in omnis minima
            magnam ullam error voluptatibus officia ad.
          </Typography>
          <RouterLink className={classes.link} to="/users">
            <Link underline="always" component="button" variant="h6">
              Users
            </Link>
          </RouterLink>
        </Box>
      </Grid>
    </Grid>
  )
}

export default CompaniesHomePage
