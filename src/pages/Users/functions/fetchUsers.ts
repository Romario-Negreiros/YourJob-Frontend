import { User } from '../../../app/slices/user/interfaces'

class UsersFetchers {
  public list = async (): Promise<User[]> => {
    const response = await fetch('https://yourjob-api.herokuapp.com/users?limit=20', {
      method: 'GET',
      headers: new Headers({
        'Content-Type': 'application/json'
      })
    })
    const body = await response.json()
    if (response.ok) {
      if (body.users.length) {
        return body.users
      }
      throw new Error('No users found!')
    }
    throw new Error(body.error)
  }

  public filter = async (url: string): Promise<User[]> => {
    console.log(url)
    const response = await fetch(url, {
      method: 'GET',
      headers: new Headers({
        'Content-Type': 'application/json'
      })
    })
    const body = await response.json()
    if (response.ok) {
      if (body.users.length) {
        return body.users
      }
      throw new Error('No users found for these filters!')
    }
    throw new Error(body.error)
  }
}

export default new UsersFetchers()
