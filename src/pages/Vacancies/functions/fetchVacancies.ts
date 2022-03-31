import { Vacancy } from '../../../app/slices/company/interfaces'

class VacanciesFetcher {
  public list = async (): Promise<Vacancy[]> => {
    const response = await fetch('https://yourjob-api.herokuapp.com/vacancies?limit=20', {
      method: 'GET',
      headers: new Headers({
        'Content-Type': 'application/json'
      })
    })
    const body = await response.json()
    if (response.ok) {
      if (body.vacancies.length) {
        return body.vacancies
      }
      throw new Error('No vacancies found!')
    }
    throw new Error(body.error)
  }

  public filter = async (url: string): Promise<Vacancy[]> => {
    const response = await fetch(url, {
      method: 'GET',
      headers: new Headers({
        'Content-Type': 'application/json'
      })
    })
    const body = await response.json()
    if (response.ok) {
      if (body.vagancies.length) {
        return body.vacancies
      }
      throw new Error('No vacancies found for these filters!')
    }
    throw new Error(body.error)
  }
}

export default new VacanciesFetcher()
