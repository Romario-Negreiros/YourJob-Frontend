import { updateCompany } from '../../../app/slices/company'

import { Company } from '../../../app/slices/company/interfaces'
import { AppDispatch } from '../../../app/store'
import { AlertColor } from '@mui/material'

const deleteVacancy = async (
  company: Company,
  vacancyID: Readonly<number>,
  handleOpen: (message: string, severity: AlertColor) => void,
  dispatch: AppDispatch,
  setCompany?: (company: Company | null) => void
) => {
  try {
    const jwt = localStorage.getItem('jwt')
    if (jwt) {
      const response = await fetch(
        `https://yourjob-api.herokuapp.com/vacancies/${vacancyID}/delete`,
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
        dispatch(updateCompany(body.company))
        if (setCompany) {
          setCompany(body.company)
        }
        handleOpen('Vacancy succesfully deleted!', 'success')
        return
      }
      throw new Error(body.error)
    }
    throw new Error('You need to log in to complete this action!')
  } catch (err) {
    if (err instanceof Error) {
      handleOpen(err.message, 'error')
    } else handleOpen('Unable to delete vacancy!', 'error')
  }
}

export default deleteVacancy
