import { Vacancy } from '../../../app/slices/company/interfaces'

const fetchVacancy = async (id: string): Promise<Vacancy> => {
  const response = await fetch(`https://yourjob-api.herokuapp.com/vacancies/${id}`, {
    method: 'GET',
    headers: new Headers({
      'Content-Type': 'application/json'
    })
  })
  const body = await response.json()
  if (response.ok) {
    return body.vacancy
  } throw new Error(body.error)
}

export default fetchVacancy
