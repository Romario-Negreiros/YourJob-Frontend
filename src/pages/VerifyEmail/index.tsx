import React from 'react'

import { useParams, Link as RouterLink } from 'react-router-dom'

import Container from '@mui/material/Container'
import CircularProgress from '@mui/material/CircularProgress'
import Alert from '@mui/material/Alert'
import Link from '@mui/material/Link'

const VerifyEmail: React.FC = () => {
  const [success, setSuccess] = React.useState('')
  const [error, setError] = React.useState('')
  const [isLoaded, setIsLoaded] = React.useState(false)
  const params = useParams()

  React.useEffect(() => {
    ;(async () => {
      try {
        const response = await fetch(
          `https://yourjob-api.herokuapp.com/${params.mode}/verify_email/${params.id}/${params.token}`,
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json'
            }
          }
        )
        const body = await response.json()
        if (response.ok) {
          setSuccess(body.success)
          return
        }
        if (body.error) {
          throw new Error(body.error)
        }
      } catch (err) {
        err instanceof Error ? setError(err.message) : setError('Failed to verify email!')
      } finally {
        setIsLoaded(true)
      }
    })()
  }, [])

  if (!isLoaded) {
    return (
      <Container sx={{ width: '100%', textAlign: 'center' }}>
        <CircularProgress color="secondary" />
      </Container>
    )
  } else if (error) {
    return (
      <Container sx={{ width: '100%', textAlign: 'center' }}>
        <Alert severity="error">{error}</Alert>
      </Container>
    )
  }
  return (
    <Container sx={{ width: '100%', textAlign: 'center' }}>
      <Alert severity="success">{success}</Alert>
      <RouterLink style={{ display: 'block', marginTop: '4px' }} to="/login">
        <Link underline="always" component="button" variant="h6">
          Log in
        </Link>
      </RouterLink>
    </Container>
  )
}

export default VerifyEmail
