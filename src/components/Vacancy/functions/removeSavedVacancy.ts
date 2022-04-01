import { updateUser } from '../../../app/slices/user'

import { User } from '../../../app/slices/user/interfaces'
import { Vacancy } from '../../../app/slices/company/interfaces'
import { AppDispatch } from '../../../app/store'
import { AlertColor } from '@mui/material'

const removeSavedVacancy = async (user: User, vacancy: Vacancy, handleOpen: (message: string, severity: AlertColor) => void, dispatch: AppDispatch) => {
  try {
    const jwt = localStorage.getItem('jwt')
    if (jwt) {
      const response = await fetch(`https://yourjob-api.herokuapp.com/vacancies/${vacancy.id}/removeSavedVacancy`, {
        method: 'DELETE',
        headers: new Headers({
          'Content-Type': 'application/json',
          authorization: jwt
        })
      })
      const body = await response.json()
      if (response.ok) {
        const userCopy: User = JSON.parse(JSON.stringify(user))
        const vacancyIndex = userCopy.savedVacancies.findIndex(savedVacancy => savedVacancy.id === vacancy.id)
        userCopy.savedVacancies.splice(vacancyIndex, 1)
        dispatch(updateUser(userCopy))
        handleOpen(body.success, 'success')
        return
      }
      throw new Error(body.error)
    } throw new Error('No authorization to complete this action!')
  } catch (err) {
    if (err instanceof Error) {
      handleOpen(err.message, 'error')
    } else handleOpen('Unable to remove saved vacancy!', 'error')
  }
}

export default removeSavedVacancy
