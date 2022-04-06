import { Feedback } from '../interfaces'

const sendResetPwdLink = async (email: string, path: string): Promise<Feedback> => {
  const response = await fetch(`https://yourjob-api.herokuapp.com/${path}/forgot_password`, {
    method: 'POST',
    body: JSON.stringify({ email }),
    headers: new Headers({
      'Content-Type': 'application/json'
    })
  })
  const body = await response.json()
  if (response.ok) {
    return {
      severity: 'success',
      message: body.success
    }
  } throw new Error(body.error)
}

export default sendResetPwdLink
