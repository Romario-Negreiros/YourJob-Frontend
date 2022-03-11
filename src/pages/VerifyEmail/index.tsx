import React from 'react'

import useStyles from '../../styles/global'
import { useParams } from 'react-router-dom'

import Container from '@mui/material/Container'
import CircularProgress from '@mui/material/CircularProgress'
import Alert from '@mui/material/Alert'

import { Response } from './interfaces'

const VerifyEmail: React.FC = () => {
  const [success, setSuccess] = React.useState('')
  const [error, setError] = React.useState('')
  const [isLoaded, setIsLoaded] = React.useState(false)
  const classes = useStyles()
  const params = useParams()

  React.useEffect(() => {
    ;(async () => {
      try {
        const response = await fetch(`https://yourjob-api.herokuapp.com/${params.mode}/verify_email/${params.id}/${params.token}`, {
          headers: {
            'Content-Type': 'application/json'
          }
        })
        if (response.ok) {
          const body: Response = await response.json()
          console.log(body)
          setSuccess(body.success)
          return
        }
        const body = await response.json()
        throw new Error(body.error)
      } catch (err) {
        err instanceof Error ? setError(err.message) : setError('Failed to verify email!')
      } finally {
        setIsLoaded(true)
      }
    })()
  }, [])

  if (!isLoaded) {
    return (
      <Container className={classes.container}>
        <CircularProgress color="secondary" />
      </Container>
    )
  } else if (error) {
    return (
      <Container className={classes.container}>
        <Alert severity="error">{error}</Alert>
      </Container>
    )
  }
  return (
    <Container className={classes.container}>
      <Alert severity="success">{success}</Alert>
    </Container>
  )
}

export default VerifyEmail
