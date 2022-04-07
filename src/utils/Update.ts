import { User } from '../app/slices/user/interfaces'
import { Company } from '../app/slices/company/interfaces'
import { AppDispatch } from '../app/store'
import { updateUser } from '../app/slices/user'
import { updateCompany } from '../app/slices/company'

class Update {
  public user = async (user: User, dispatch: AppDispatch) => {
    const jwt = localStorage.getItem('jwt')
    if (jwt) {
      const response = await fetch(`https://yourjob-api.herokuapp.com/users/profile/${user.id}/update`, {
        method: 'PUT',
        body: JSON.stringify(user),
        headers: new Headers({
          'Content-Type': 'application/json',
          authorization: jwt
        })
      })
      const body = await response.json()
      if (response.ok) {
        dispatch(updateUser(body.user))
        return
      }
      throw new Error(body.error)
    } else {
      throw new Error('You need to log in to complete this action!')
    }
  }

  public company = async (company: Company, dispatch: AppDispatch) => {
    const jwt = localStorage.getItem('jwt')
    if (jwt) {
      const response = await fetch(
        `https://yourjob-api.herokuapp.com/companies/profile/${company.id}/update`,
        {
          method: 'PUT',
          body: JSON.stringify(company),
          headers: new Headers({
            'Content-Type': 'application/json',
            authorization: jwt
          })
        }
      )
      const body = await response.json()
      if (response.ok) {
        dispatch(updateCompany(body.company))
        return
      }
      throw new Error(body.error)
    } else {
      throw new Error('You need to log in to complete this action!')
    }
  }
}

export default new Update()
