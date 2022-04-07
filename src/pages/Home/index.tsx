import React from 'react'

import useStyles from '../../styles/global'
import { useAppSelector, useAppDispatch } from '../../app/hooks'
import { setUser } from '../../app/slices/user'
import { setCompany } from '../../app/slices/company'

import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Link from '@mui/material/Link'
import { Link as RouterLink } from 'react-router-dom'
import Lottie from 'lottie-react'
import { Navigation } from '../../components'

import WorkingGuy from '../../assets/animations/lottie-working-guy.json'

import toastHandler from '../../context/Toast'

const Home: React.FC = () => {
  const { company: currentCompany, user: currentUser } = useAppSelector(state => state)
  const classes = useStyles()
  const dispatch = useAppDispatch()
  const { handleOpen } = React.useContext(toastHandler)

  React.useEffect(() => {
    const jwt = localStorage.getItem('jwt')
    const type = localStorage.getItem('type')
    if (jwt && type && !currentUser.data && !currentCompany.data) {
      ;(async () => {
        try {
          const response = await fetch(
            `https://yourjob-api.herokuapp.com/${type}/authenticate/jwt`,
            {
              method: 'POST',
              headers: new Headers({
                'Content-Type': 'application/json',
                authorization: jwt
              })
            }
          )
          const body = await response.json()
          if (response.ok) {
            if (type === 'users') {
              dispatch(setUser(body.user))
            } else if (type === 'companies') {
              dispatch(setCompany(body.company))
            }
            return
          }
          throw new Error(body.error)
        } catch (err) {
          err instanceof Error ? handleOpen(err.message, 'error') : handleOpen('Failed to auto log in!', 'error')
        }
      })()
    }
  }, [])

  return (
    <Grid container columns={{ xs: 1, md: 2 }} columnSpacing={2}>
      <Grid item xs={1} md={2}>
        <Navigation />
      </Grid>
      <Grid item className={classes.grid} xs={1}>
        <Typography className={`${classes.typography} ${classes.customFont}`}>
          Here you find your dream job!
        </Typography>
      </Grid>
      <Grid item className={classes.grid} xs={1}>
        <Box sx={{ maxWidth: '470px', maxHeight: '470px' }}>
          <Lottie animationData={WorkingGuy} loop autoplay></Lottie>
        </Box>
      </Grid>

      <Grid item className={classes.grid} xs={1} sx={{ mt: 4 }}>
        <Box className={classes.box}>
          <Typography variant="h2" className={`${classes.typography} ${classes.customFont}`}>
            Start finding vacancies now!
          </Typography>
          <Typography
            variant="body1"
            className={classes.typography}
            sx={{ textAlign: 'justify !important', textJustify: 'inter-word' }}
          >
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Perferendis nam sequi ex
            blanditiis, eveniet accusamus nulla illum, fugiat aut suscipit quo neque in quis, sint
            ab dolorum delectus earum natus aliquam nostrum quae. Nam provident autem maxime
            voluptas a earum et deleniti dolores pariatur! Dolores provident perferendis enim in
            maiores?
          </Typography>
          <RouterLink className={classes.link} to="/vacancies">
            <Link underline="always" component="button" variant="h6">
              Vacancies
            </Link>
          </RouterLink>
          <RouterLink className={classes.link} to="/register">
            <Link underline="always" component="button" variant="h6">
              Start now!
            </Link>
          </RouterLink>
        </Box>
      </Grid>
      <Grid item className={classes.grid} xs={1} sx={{ mt: 4 }}>
        <Box className={classes.box}>
          <Typography variant="h2" className={`${classes.typography} ${classes.customFont}`}>
            Yourjob for companies
          </Typography>
          <Typography
            variant="body1"
            sx={{ textAlign: 'justify !important', textJustify: 'inter-word' }}
            className={classes.typography}
          >
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Esse asperiores voluptatem
            voluptates saepe repellat architecto, impedit nostrum, maiores facere in omnis minima
            magnam ullam error voluptatibus officia ad. Quisquam eaque repellendus minima magnam
            dolorum maiores saepe nam ut corrupti itaque similique nostrum rerum fugit aliquid
            soluta quidem mollitia quo voluptate neque tempore cumque commodi quod, dignissimos
            nulla. Assumenda, similique eos. Dolorem cumque corrupti quod! Nam, adipisci!
          </Typography>
          <RouterLink className={classes.link} to="/companies">
            <Link underline="always" component="button" variant="h6">
              For companies
            </Link>
          </RouterLink>
        </Box>
      </Grid>
    </Grid>
  )
}

export default Home
