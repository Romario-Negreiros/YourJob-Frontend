import { Feedback } from '../interfaces'

const resetPassword = async (
  email: string,
  password: string,
  token: string,
  mode: string
): Promise<Feedback> => {
  const response = await fetch(
    `https://yourjob-api.herokuapp.com/${mode}/reset_password/${token}`,
    {
      method: 'PUT',
      body: JSON.stringify({ email, password }),
      headers: new Headers({
        'Content-Type': 'application/json'
      })
    }
  )
  const body = await response.json()
  if (response.ok) {
    return {
      severity: 'success',
      message: body.success
    }
  }
  throw new Error(body.error)
}

export default resetPassword
