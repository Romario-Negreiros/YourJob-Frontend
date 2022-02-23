import React from 'react'

import useStyles from '../../../styles/global'

import Container from '@mui/material/Container'
import Box from '@mui/material/Box'
import Stepper from '@mui/material/Stepper'
import Step from '@mui/material/Step'
import StepLabel from '@mui/material/StepLabel'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Paper from '@mui/material/Paper'
import Link from '@mui/material/Link'
import { Link as RouterLink } from 'react-router-dom'
import { AuthForm, UserProfileForm } from '../../../components'

import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight'
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft'

interface IStep {
  label: string
  component: React.ReactElement
}

const steps: IStep[] = [
  {
    label: 'Authentication',
    component: <AuthForm />
  },
  {
    label: 'Profile',
    component: <UserProfileForm />
  }
]

const UserRegister: React.FC = () => {
  const [activeStep, setActiveStep] = React.useState(0)

  const handleNext = () => setActiveStep(activeStep + 1)

  const handleBack = () => setActiveStep(activeStep - 1)

  const handleReset = () => setActiveStep(0)

  const classes = useStyles()

  const handleSubmit = (data: any) => {
    return console.log(data)
  }

  return (
    <Container className={classes.container}>
      <Paper className={classes.paper}>
        <Box
          component="form"
          className={classes.form}
          noValidate
          autoComplete="off"
          onSubmit={handleSubmit}
        >
          <Box sx={{ width: '100%' }}>
            <Typography
              variant="h3"
              component="div"
              sx={{ textAlign: 'center' }}
              color="secondary.dark"
            >
              Create your new account
            </Typography>
            <Box sx={{ textAlign: 'center' }}>
              <RouterLink to="/login">
                <Link underline="always" component="button" variant="h6">
                  Login instead
                </Link>
              </RouterLink>
            </Box>
            <Stepper sx={{ mt: 2 }} activeStep={activeStep}>
              {steps.map(step => (
                <Step key={step.label}>
                  <StepLabel>{step.label}</StepLabel>
                </Step>
              ))}
            </Stepper>
          </Box>
          <Box sx={{ textAlign: 'center', width: '100%' }}>
            {activeStep === steps.length
              ? (
              <>
                <Typography variant="body1" sx={{ mt: 2, mb: 1 }}>
                  All steps completed - you&apos;re finished
                </Typography>
                <Button variant="contained" color="success" type="submit">
                  Submit
                </Button>
              </>
                )
              : (
              <>{steps[activeStep].component}</>
                )}
          </Box>
          <Box className={classes.buttonsWrapper}>
            <Button
              className={classes.button}
              variant="contained"
              disabled={activeStep === 0 ? Boolean(1) : Boolean(0)}
              startIcon={<KeyboardArrowLeftIcon />}
              type="button"
              onClick={handleBack}
            >
              Previous
            </Button>
            <Button
              className={classes.button}
              color="error"
              variant="contained"
              onClick={handleReset}
            >
              Reset
            </Button>
            <Button
              className={classes.button}
              variant="contained"
              disabled={activeStep === steps.length ? Boolean(1) : Boolean(0)}
              endIcon={<KeyboardArrowRightIcon />}
              type="button"
              onClick={handleNext}
            >
              Next
            </Button>
          </Box>
        </Box>
      </Paper>
    </Container>
  )
}

export default UserRegister
