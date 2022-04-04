import { updateUser } from '../../../app/slices/user'

import { User } from '../../../app/slices/user/interfaces'
import { Vacancy } from '../../../app/slices/company/interfaces'
import { AppDispatch } from '../../../app/store'
import { AlertColor } from '@mui/material'

const saveVacancy = async (
  user: User,
  vacancy: Vacancy,
  handleOpen: (message: string, severity: AlertColor) => void,
  dispatch: AppDispatch
) => {
  try {
    const jwt = localStorage.getItem('jwt')
    if (jwt) {
      const response = await fetch(
        `https://yourjob-api.herokuapp.com/vacancies/${vacancy.id}/saveVacancy`,
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
        const userCopy: User = JSON.parse(JSON.stringify(user))
        userCopy.savedVacancies.push(vacancy)
        dispatch(updateUser(userCopy))
        handleOpen(body.success, 'success')
        return
      }
      throw new Error(body.error)
    }
    throw new Error('No authorization to complete this action!')
  } catch (err) {
    if (err instanceof Error) {
      handleOpen(err.message, 'error')
    } else handleOpen('Unable to save vacancy!', 'error')
  }
}

export default saveVacancy
