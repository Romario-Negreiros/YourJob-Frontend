import { updateUser } from '../../../app/slices/user'

import { User } from '../../../app/slices/user/interfaces'
import { AppDispatch } from '../../../app/store'
import { AlertColor } from '@mui/material'

const removeSavedVacancy = async (
  user: User,
  vacancyID: Readonly<number>,
  handleOpen: (message: string, severity: AlertColor) => void,
  dispatch: AppDispatch,
  setUser?: (user: User | null) => void
) => {
  try {
    const jwt = localStorage.getItem('jwt')
    if (jwt) {
      const response = await fetch(
        `https://yourjob-api.herokuapp.com/vacancies/${vacancyID}/removeSavedVacancy`,
        {
          method: 'DELETE',
          headers: new Headers({
            'Content-Type': 'application/json',
            authorization: jwt
          })
        }
      )
      const body = await response.json()
      if (response.ok) {
        const userCopy: User = JSON.parse(JSON.stringify(user))
        userCopy.savedVacancies = userCopy.savedVacancies.filter(savedVacancy => savedVacancy.id !== vacancyID)
        dispatch(updateUser(userCopy))
        if (setUser) {
          setUser(userCopy)
        }
        handleOpen(body.success, 'success')
        return
      }
      throw new Error(body.error)
    }
    throw new Error('You need to log in to complete this action!')
  } catch (err) {
    if (err instanceof Error) {
      handleOpen(err.message, 'error')
    } else handleOpen('Unable to remove saved vacancy!', 'error')
  }
}

export default removeSavedVacancy
