import { Company } from '../../../app/slices/company/interfaces'

class CompaniesFetcher {
  public list = async (): Promise<Company[]> => {
    const response = await fetch('https://yourjob-api.herokuapp.com/companies?limit=20', {
      method: 'GET',
      headers: new Headers({
        'Content-Type': 'application/json'
      })
    })
    const body = await response.json()
    if (response.ok) {
      if (body.companies.length) {
        return body.companies
      }
      throw new Error('No companies found!')
    }
    throw new Error(body.error)
  }

  public filter = async (url: string): Promise<Company[]> => {
    console.log(url)
    const response = await fetch(url, {
      method: 'GET',
      headers: new Headers({
        'Content-Type': 'application/json'
      })
    })
    const body = await response.json()
    if (response.ok) {
      if (body.companies.length) {
        return body.companies
      }
      throw new Error('No companies found for these filters!')
    }
    throw new Error(body.error)
  }
}

export default new CompaniesFetcher()
