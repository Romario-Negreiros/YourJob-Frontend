import { Vacancy } from '../../../app/slices/company/interfaces'

class VacanciesFetcher {
  public list = async (): Promise<Vacancy[]> => {
    const response = await fetch('https://yourjob-api.herokuapp.com/vacancies/limit?=20', {
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

  // public filter = async (filters: string[]): Promise<void> => { // vacancies
  //   const response = await fetch('https://yourjob-api.herokuapp.com/vacancies', {
  //     method: 'GET',
  //     headers: new Headers({
  //       'Content-Type': 'application/json'
  //     })
  //   })
  // }
}

export default new VacanciesFetcher()
